import { DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DrawerSection({ name, label, onPress }: any) {
  return (
    <DrawerItem
      icon={({ size, color }) => {
        return <MaterialCommunityIcons name={name} color={color} size={size} />;
      }}
      label={label}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({});
