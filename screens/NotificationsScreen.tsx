import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useStore } from "../stores/store";

const renderItem = (item: any) => <Text>{item}</Text>;

export default observer(function NotificationsScreen({ navigation }: any) {
  const { userStore, contentStore } = useStore();
  useEffect(() => {}, [userStore.notifications, contentStore.notifications]);
  return (
    <View style={styles.container}>
      <Text style={{marginBottom:20}}>Your notifications will appear here after you execute CRUD operations.</Text>
      <FlatList
        data={userStore.notifications}
        renderItem={({ item }) => renderItem(item.notification)}
        keyExtractor={(item) => item.id}
      />
      <FlatList
        data={contentStore.notifications}
        renderItem={({ item }) => renderItem(item.notification)}
        keyExtractor={(item) => item.id}
      />
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
