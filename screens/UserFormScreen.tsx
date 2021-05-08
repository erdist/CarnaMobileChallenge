import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import { User } from "../model/Admin";
import { useStore } from "../stores/store";
import uuid from "react-native-uuid";
import { observer } from "mobx-react-lite";

export default observer(function UserFormScreen() {
  const { userStore } = useStore();
  const {
    adminId,
    createUser,
    formOpen,
    setFormOpen,
    isUpdate,
    setIsUpdate,
    selectedUser,
    setSelectedUser,
    updateUser,
    refresh,
    setRefresh,
    appendNotifications,
  } = userStore;
  const [userForm, setUserForm] = useState<User>({
    id: isUpdate ? selectedUser.id : uuid.v4().toString(),
    firstName: isUpdate ? selectedUser.firstName : "",
    surname: isUpdate ? selectedUser.surname : "",
    city: isUpdate ? selectedUser.city : "",
    country: isUpdate ? selectedUser.country : "",
    adminId: adminId,
  });
  const handleFirstName = (e: any) => {
    setUserForm({ ...userForm, firstName: e });
  };
  const handleSurname = (e: any) => {
    setUserForm({ ...userForm, surname: e });
  };
  const handleCity = (e: any) => {
    setUserForm({ ...userForm, city: e });
  };
  const handleCountry = (e: any) => {
    setUserForm({ ...userForm, country: e });
  };
  return (
    <View>
      <View style={styles.action}>
        <TextInput
          placeholder="First Name"
          style={styles.textInput}
          autoCapitalize="words"
          keyboardType="default"
          value={userForm.firstName}
          onChangeText={(e) => {
            handleFirstName(e);
          }}
        ></TextInput>
        <TextInput
          placeholder="Surname"
          style={styles.textInput}
          autoCapitalize="words"
          keyboardType="default"
          value={userForm.surname}
          onChangeText={(e) => {
            handleSurname(e);
          }}
        ></TextInput>
      </View>
      <View>
        <TextInput
          placeholder="City"
          style={styles.textInput}
          autoCapitalize="words"
          value={userForm.city}
          keyboardType="default"
          onChangeText={(e) => {
            handleCity(e);
          }}
        ></TextInput>
      </View>
      <View>
        <TextInput
          placeholder="Country"
          style={styles.textInput}
          value={userForm.country}
          autoCapitalize="words"
          keyboardType="default"
          onChangeText={(e) => {
            handleCountry(e);
          }}
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (isUpdate) {
            updateUser(userForm);
            appendNotifications({
              id: uuid.v4().toString(),
              notification:
                "You updated a User: " +
                userForm.firstName +
                " " +
                userForm.surname,
            });

            setIsUpdate(false);
            setFormOpen(false);
          } else {
            createUser(userForm);
            appendNotifications({
              id: uuid.v4().toString(),
              notification:
                "You created a User: " +
                userForm.firstName +
                " " +
                userForm.surname,
            });

            setFormOpen(false);
          }
        }}
      >
        <LinearGradient
          style={styles.create}
          colors={[
            Colors.stackScreen.stackNavigatorColor,
            Colors.stackScreen.stackNavigatorColor,
          ]}
        >
          {isUpdate && (
            <Text style={{ fontSize: 20, color: "white" }}>Update</Text>
          )}
          {!isUpdate && (
            <Text style={{ fontSize: 20, color: "white" }}>Create</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingTop: 20 }}
        onPress={() => {
          setIsUpdate(false);
          setFormOpen(false);
        }}
      >
        <LinearGradient
          style={styles.create}
          colors={[
            Colors.stackScreen.stackNavigatorColor,
            Colors.stackScreen.stackNavigatorColor,
          ]}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Close</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  textInput: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 20,
    paddingBottom: 30,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  create: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
