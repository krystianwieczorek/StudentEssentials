import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Header from "../sections/Header";

export default function Messenger() {
  return (
    <View style={styles.container}>
      <Text>Messenger Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
  },
});
