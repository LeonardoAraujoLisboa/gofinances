import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import {CLIENT_ID, REDIRECT_URI} from 'react-native-dotenv'
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface UserGoogle extends User {
    given_name: string;
    picture?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    SingOut(): Promise<void>;
    userStorageLoading: boolean;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider ({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const userStorageKey = '@gofinances:user';
    const [userStorageLoading, setUserStorageLoading] = useState(false)

    const signInWithGoogle = async () => {
       try {
           const RESPONSE_TYPE = 'token';/* é o que que a gente quer obter dessas informações redirecionamento... é o token */
           const SCOPE = encodeURI('profile email');/* esse encode troca o espaço q tem ai por um caracter que o browser entende */
           const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
           const {type, params} = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;
           if (type === 'success') {
               const response  = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
               const userInfo: UserGoogle = await response.json();
               const userLogged = {
                   id: String(userInfo.id), 
                   name: userInfo.given_name, 
                   email: userInfo.email, 
                   photo: userInfo.picture
                }
               setUser(userLogged)
               await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
           } 
       } catch (error) {
           throw new Error(error)
       }
   }

   const signInWithApple = async () => {
        try {
        const credential = await AppleAuthentication.signInAsync({requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL]})
        console.log(credential)
        if (credential) {
            const userLogged = {
                id: credential.user!, 
                name: credential.fullName!.givenName!, 
                email: credential.email!,
                photo: `https://ui-avatars.com/api/?name=${credential.fullName!.givenName!}&length=1`
            }
            setUser(userLogged)
            await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
        }
        } catch (error) {
        throw new Error(error);
        }
    }

    const SingOut = async () => {
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    }

    const loadUserStorage = async () => {
        setUserStorageLoading(true);
        const userStorage = await AsyncStorage.getItem(userStorageKey)
        if (userStorage) {
            const userLogged = JSON.parse(userStorage) as User
            setUser(userLogged)
        } else {
            setUserStorageLoading(false)
        }
    }//isso é pra quando o usuario der um reload na pagina nao perder as informações dele e ja logar

    useEffect(() => {
        loadUserStorage();
    }, [])


    return (
    <AuthContext.Provider value={{user, signInWithGoogle, signInWithApple, SingOut, userStorageLoading}}>
        {children}
    </AuthContext.Provider>
    )
}

export function useAuth () {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
}