import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../stores/store";

export default observer(function ProfileScreen() {
  const { authStore } = useStore();
  const { jsonWebToken, adminId, email, username } = authStore;

  return (
    <View style={styles.container}>
      <Text>JWT: {jsonWebToken}</Text>
      <Text>Admin Id: {adminId}</Text>
      <Text>email: {email}</Text>
      <Text>Name: {username}</Text>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
