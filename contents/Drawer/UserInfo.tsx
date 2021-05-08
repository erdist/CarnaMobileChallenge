import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Caption, Paragraph, Title } from "react-native-paper";

export default function UserInfo() {
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
            <Title style={styles.title}>UserName</Title>
            <Caption style={styles.caption}>UserRole</Caption>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.section}>
            <Caption style={styles.caption}>User#</Caption>
            <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
          </View>
          <View style={styles.section}>
            <Caption style={styles.caption}>Content#</Caption>
            <Paragraph style={[styles.paragraph, styles.caption]}>5</Paragraph>
          </View>
        </View>
      </View>
    </View>
  );
}
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
});
