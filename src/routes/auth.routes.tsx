import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from "../screens/SignIn";
import Splash from "../screens/Splash";

const {Navigator, Screen} = createStackNavigator();

const AuthRoutes = () => {
    return (
    <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Splash" component={Splash} />
        <Screen name="SignIn" component={SignIn} />
    </Navigator>
    )
}

export default AuthRoutes;