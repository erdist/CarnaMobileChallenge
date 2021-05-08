import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function CredentialView({}: any) {
  const [secure, setSecure] = useState(true);
  const { authStore } = useStore();
  const { handleLoginEmail, handleLoginPassword } = authStore;
  return (
    <View>
      <Text style={styles.text}>Email</Text>
      <View style={styles.action}>
        <FontAwesome
          name="user-o"
          color={Colors.stackScreen.stackNavigatorColor}
          size={20}
        />
        <TextInput
          placeholder="Your Email"
          autoCompleteType="email"
          style={styles.textInput}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(e) => {
            handleLoginEmail(e);
          }}
        ></TextInput>
      </View>
      <Text style={[styles.text, { marginTop: 20 }]}>Password</Text>
      <View style={styles.action}>
        <FontAwesome
          name="lock"
          color={Colors.stackScreen.stackNavigatorColor}
          size={20}
        />
        <TextInput
          placeholder="Your Password"
          style={styles.textInput}
          secureTextEntry={secure}
          autoCompleteType="password"
          autoCorrect={false}
          passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
          onChangeText={(e) => {
            handleLoginPassword(e);
          }}
        ></TextInput>
        <TouchableOpacity
          onPress={() => {
            setSecure(!secure);
          }}
        >
          <Feather
            name="eye-off"
            color={Colors.stackScreen.stackNavigatorColor}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  text: {
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
