import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import agent from "../api/agent";
import FileSystem from "expo-file-system";

export default function DownloadsScreen() {
  const [file, setFile] = useState<string | Blob>("");
  const [fileName, setFileName] = useState("");

  const saveFile = (e: any) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append("formFile", file);
    formData.append("fileName", fileName);
    try {
      const res = await agent.ImportExport.import(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Import" onPress={uploadFile} />
      <Button
        title="Export"
        onPress={async () => {
          console.log(await agent.ImportExport.export());
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
