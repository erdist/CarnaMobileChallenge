import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";

export default function MenuButton({ navigation }: any) {
  return (
    <Icon.Button
      name="ios-menu"
      size={25}
      backgroundColor={Colors.stackScreen.stackNavigatorColor}
      onPress={() => {
        navigation.openDrawer();
      }}
    ></Icon.Button>
  );
}

const styles = StyleSheet.create({});
