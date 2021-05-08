import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../stores/store";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import SplashScreen from "./SplashScreen";

const RootStack = createStackNavigator();

export default function RootStackScreen() {
  const { authStore, userStore, contentStore } = useStore();
  const { isLoggedIn, authenticate, adminId } = authStore;
  const { setAdminIdForUser } = userStore;
  const { setAdminIdForContent } = contentStore;
  useEffect(() => {
    if (isLoggedIn) {
      authenticate();
      setAdminIdForContent(adminId);
      setAdminIdForUser(adminId);
    }
  }, [isLoggedIn]);
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="Splash"
        component={SplashScreen}
      ></RootStack.Screen>
      <RootStack.Screen name="Login" component={LoginScreen}></RootStack.Screen>
      <RootStack.Screen
        name="Register"
        component={RegisterScreen}
      ></RootStack.Screen>
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});
