import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UsersScreen from "./UsersScreen";
import ContentsScreen from "./ContentsScreen";

const Tab = createMaterialTopTabNavigator();

function ExploreScreen() {
  return (
    <Tab.Navigator style={styles.container}>
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Contents" component={ContentsScreen} />
    </Tab.Navigator>
  );
}

export default ExploreScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:20
  },
});
