import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import UserStencil from "../contents/UserList/UserStencil";
import { useStore } from "../stores/store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserFormScreen from "./UserFormScreen";

export default observer(function UsersScreen() {
  const { userStore } = useStore();
  const {
    users,
    loadUsers,
    formOpen,
    setFormOpen,
    refresh,
    setRefresh,
  } = userStore;

  useEffect(() => {
    loadUsers();
  }, [users]);

  const renderItem = ({ item }: any) => <UserStencil user={item} />;
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.add}
            onPress={() => setFormOpen(!formOpen)}
          >
            <MaterialCommunityIcons
              name="plus-box"
              color={Colors.stackScreen.stackNavigatorColor}
              size={50}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.add}
          >
            <MaterialCommunityIcons
              name="refresh"
              color={Colors.stackScreen.stackNavigatorColor}
              size={50}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      {formOpen && (
        <View style={styles.form}>
          <UserFormScreen />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: Colors.stackScreen.stackNavigatorColor,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  list: {
    flex: 1,
    justifyContent: "flex-end",
  },
  add: {
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
