import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import CredentialView from "../contents/Credentials/CredentialView";
import CredentialButton from "../contents/Credentials/CredentialButton";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginScreen({ navigation }: any) {
  const { authStore } = useStore();
  const { setIsLoggedIn, login, message } = authStore;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome</Text>
      </View>
      <View style={styles.footer}>
        <Text>{message}</Text>
        <CredentialView navigation={navigation} />
        <CredentialButton
          title="Login"
          onPress={() => {
            login();
          }}
        />

        <CredentialButton
          title="Register"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.stackScreen.stackNavigatorColor,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  textFooter: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
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
