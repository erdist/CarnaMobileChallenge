import { DrawerContentScrollView } from "@react-navigation/drawer";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Drawer } from "react-native-paper";
import { useStore } from "../../stores/store";
import DrawerSection from "./DrawerSection";

import UserInfo from "./UserInfo";

export default observer(function MainDrawerContainer(props: any) {
  const { authStore } = useStore();
  const { setIsLoggedIn, setLoginForm, logout } = authStore;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <UserInfo />
        <Drawer.Section style={styles.topDrawerSection}>
          <DrawerSection
            name="home"
            label="Home"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <DrawerSection
            name="account"
            label="Profile"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          />
          <DrawerSection
            name="cog"
            label="Settings"
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
          />
          <DrawerSection
            name="download"
            label="Downloads"
            onPress={() => {
              props.navigation.navigate("Downloads");
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerSection
          name="logout"
          label="Logout"
          onPress={() => {
            props.navigation.closeDrawer();
            setLoginForm({ email: "", password: "" });
            logout();
            setIsLoggedIn(false);
          }}
        />
      </Drawer.Section>
    </View>
  );
});

const styles = StyleSheet.create({
  topDrawerSection: {
    marginTop: 20,
  },
  bottomDrawerSection: {
    marginBottom: 20,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
