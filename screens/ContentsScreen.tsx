import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import ContentStencil from "../contents/ContentList/ContentStencil";
import { useStore } from "../stores/store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ContentFormScreen from "./ContentFormScreen";

export default observer(function ContentsScreen() {
  const { contentStore } = useStore();
  const { contents, loadContents, formOpen, setFormOpen } = contentStore;

  useEffect(() => {
    loadContents();
  }, [contents]);

  const renderItem = ({ item }: any) => <ContentStencil content={item} />;
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
          <TouchableOpacity style={styles.add}>
            <MaterialCommunityIcons
              name="refresh"
              color={Colors.stackScreen.stackNavigatorColor}
              size={50}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={contents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      {formOpen && (
        <View style={styles.form}>
          <ContentFormScreen />
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
