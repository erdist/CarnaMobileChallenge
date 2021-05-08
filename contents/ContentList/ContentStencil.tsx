import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Caption, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import uuid from "react-native-uuid";
import { useStore } from "../../stores/store";

export default observer(function ContentStencil({ content }: any) {
  const { contentStore } = useStore();
  const {
    setSelectedContent,
    setIsUpdate,
    setFormOpen,
    deleteContent,
    appendNotifications,
  } = contentStore;
  return (
    <View style={styles.drawerContent}>
      <View style={styles.contentInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://www.w3schools.com/howto/img_avatar.png",
            }}
            size={50}
          />
          <View style={{ flexDirection: "column", marginLeft: 15 }}>
            <Title style={styles.title}>{content.title}</Title>
            <Caption style={styles.caption}>{content.contentBody}</Caption>
          </View>
          <TouchableOpacity
            style={styles.update}
            onPress={() => {
              setSelectedContent(content);
              setIsUpdate(true);
              setFormOpen(true);
            }}
          >
            <MaterialCommunityIcons name="file-edit" color="blue" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              deleteContent(content.id);
              appendNotifications({
                id: uuid.v4().toString(),
                notification: "You deleted a Content: " + content.title,
              });
            }}
          >
            <MaterialCommunityIcons name="delete" color="red" size={40} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.row}>
          <View style={styles.section}>
            <Caption style={styles.caption}>Content#</Caption>
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
  contentInfoSection: {
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
