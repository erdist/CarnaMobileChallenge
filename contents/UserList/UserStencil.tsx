import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Caption, Paragraph, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useStore } from "../../stores/store";
import uuid from "react-native-uuid";

export default observer(function UserStencil({ user }: any) {
  const { userStore } = useStore();
  const {
    selectedUser,
    setSelectedUser,
    isUpdate,
    setIsUpdate,
    formOpen,
    setFormOpen,
    deleteUser,
    refresh,
    setRefresh,
    appendNotifications,
  } = userStore;
  return (
    <View style={styles.drawerContent}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://www.w3schools.com/howto/img_avatar.png",
            }}
            size={50}
          />
          <View style={{ flexDirection: "column", marginLeft: 15 }}>
            <Title style={styles.title}>
              {user.firstName} {user.surname}
            </Title>
            <Caption style={styles.caption}>{user.city}</Caption>
            <Caption style={styles.caption}>{user.country}</Caption>
          </View>
          <TouchableOpacity
            style={styles.update}
            onPress={() => {
              setSelectedUser(user);
              setIsUpdate(true);
              setFormOpen(true);
            }}
          >
            <MaterialCommunityIcons name="file-edit" color="blue" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              deleteUser(user.id);
              appendNotifications({
                id: uuid.v4().toString(),
                notification:
                  "You deleted a User: " + user.firstName + " " + user.surname,
              });
            }}
          >
            <MaterialCommunityIcons name="delete" color="red" size={40} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.row}>
          <View style={styles.section}>
            <Caption style={styles.caption}>User#</Caption>
            <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
          </View>
          <View style={styles.section}>
            <Caption style={styles.caption}>Content#</Caption>
            <Paragraph style={[styles.paragraph, styles.caption]}>5</Paragraph>
          </View>
        </View> */}
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  update: {
    marginLeft: 40,
  },
  delete: {
    marginLeft: 10,
  },
});
