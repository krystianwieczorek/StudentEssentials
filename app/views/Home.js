import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Schedule } from "./Schedule";

export default function Home({ navigation, extraData }) {
  return (
    <View style={styles.container}>
      <Schedule />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#e3e3e3",
  },
});
