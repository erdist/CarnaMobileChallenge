import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";

export default function CredentialButton({ title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={[
          Colors.stackScreen.stackNavigatorColor,
          Colors.stackScreen.stackNavigatorColor,
        ]}
        style={styles.login}
      >
        <Text style={styles.textLogin}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },
  login: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textLogin: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
