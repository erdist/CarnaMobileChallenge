import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";

export default function SplashScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="fadeInDownBig"
          duration={2000}
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={2000}
        style={styles.footer}
      >
        <Text style={styles.title}>Welcome!</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <LinearGradient
              colors={[
                Colors.stackScreen.stackNavigatorColor,
                Colors.stackScreen.stackNavigatorColor,
              ]}
              style={styles.login}
            >
              <Text style={styles.loginText}>Get Started</Text>
              <MaterialCommunityIcons
                name="login-variant"
                color="white"
                size={15}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const { height } = Dimensions.get("screen");
const logoSize = height * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.stackScreen.stackNavigatorColor,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: logoSize,
    height: logoSize,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  login: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
