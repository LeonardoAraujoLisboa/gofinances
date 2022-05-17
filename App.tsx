import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import AuthProvider from './src/hooks/auth';
import Routes from './src/routes';
import {useAuth} from './src/hooks/auth'


export default function App() {
  const [fontsLoaded] = useFonts({Poppins_400Regular, Poppins_500Medium, Poppins_700Bold});
  const {userStorageLoading} = useAuth()
  
  if(!fontsLoaded || userStorageLoading) {
    return <AppLoading />/* vou segurar aquela tela de splashing pra ficar carregando e talls */
  } else {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    )
  }
}
