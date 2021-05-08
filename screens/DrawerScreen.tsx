import "react-native-gesture-handler";
import React, { useEffect, useLayoutEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainDrawerContainer from "../contents/Drawer/MainDrawerContainer";
import MainTabScreen from "./MainTabScreen";
import SettingsScreen from "./SettingsScreen";
import DownloadsScreen from "./DownloadsScreen";
import { StyleSheet } from "react-native";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const Drawer = createDrawerNavigator();
export default function DrawerScreen() {
  const { authStore, userStore, contentStore } = useStore();
  const { isLoggedIn, authenticate, adminId } = authStore;
  const { setAdminIdForUser } = userStore;
  const { setAdminIdForContent } = contentStore;
  useLayoutEffect(() => {
    if (isLoggedIn) {
      authenticate();
      setAdminIdForContent(adminId);
      setAdminIdForUser(adminId);
    }
  }, [isLoggedIn]);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <MainDrawerContainer {...props} />}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={MainTabScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Downloads" component={DownloadsScreen} />
    </Drawer.Navigator>
  );
}
