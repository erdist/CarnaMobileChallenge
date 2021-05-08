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
import { Content } from "../model/Admin";
import { useStore } from "../stores/store";
import uuid from "react-native-uuid";
import { observer } from "mobx-react-lite";

export default observer(function ContentFormScreen() {
  const { contentStore } = useStore();
  const {
    adminId,
    createContent,
    formOpen,
    setFormOpen,
    isUpdate,
    setIsUpdate,
    selectedContent,
    setSelectedContent,
    updateContent,
    refresh,
    setRefresh,
    appendNotifications,
  } = contentStore;
  const [contentForm, setContentForm] = useState<Content>({
    id: isUpdate ? selectedContent.id : uuid.v4().toString(),
    title: isUpdate ? selectedContent.title : "",
    contentBody: isUpdate ? selectedContent.contentBody : "",
    adminId: adminId,
  });
  const handleTitle = (e: any) => {
    setContentForm({ ...contentForm, title: e });
  };
  const handleBody = (e: any) => {
    setContentForm({ ...contentForm, contentBody: e });
  };

  return (
    <View>
      <View style={styles.action}>
        <TextInput
          placeholder="Title"
          style={styles.textInput}
          autoCapitalize="words"
          keyboardType="default"
          value={contentForm.title}
          onChangeText={(e) => {
            handleTitle(e);
          }}
        ></TextInput>
        <TextInput
          placeholder="Body"
          style={styles.textInput}
          autoCapitalize="words"
          keyboardType="default"
          value={contentForm.contentBody}
          onChangeText={(e) => {
            handleBody(e);
          }}
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (isUpdate) {
            updateContent(contentForm);
            appendNotifications({
              id: uuid.v4().toString(),
              notification: "You updated a Content: " + contentForm.title,
            });
            setRefresh(!refresh);
            setIsUpdate(false);
            setFormOpen(false);
          } else {
            createContent(contentForm);
            appendNotifications({
              id: uuid.v4().toString(),
              notification: "You created a Content: " + contentForm.title,
            });
            setRefresh(!refresh);
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
