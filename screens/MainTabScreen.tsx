import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import HomeScreen from "./HomeScreen";
import MenuButton from "../buttons/MenuButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileScreen from "./ProfileScreen";
import ExploreScreen from "./ExploreScreen";
import NotificationsScreen from "./NotificationsScreen";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{ backgroundColor: Colors.stackScreen.stackNavigatorColor }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarColor: Colors.bottomTabNavigator.exploreColor,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="compass" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }: any) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.stackScreen.stackNavigatorColor,
        },
        headerTintColor: Colors.stackScreen.headerTintColor,
        headerTitleStyle: { fontWeight: "bold" },
        headerLeft: () => <MenuButton navigation={navigation} />,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

const NotificationsStackScreen = ({ navigation }: any) => {
  return (
    <DetailsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.stackScreen.stackNavigatorColor,
        },
        headerTintColor: Colors.stackScreen.headerTintColor,
        headerTitleStyle: { fontWeight: "bold" },
        headerLeft: () => <MenuButton navigation={navigation} />,
      }}
    >
      <DetailsStack.Screen name="Notifications" component={NotificationsScreen} />
    </DetailsStack.Navigator>
  );
};

const styles = StyleSheet.create({});
