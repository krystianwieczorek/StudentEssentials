import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toogleUser = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  console.log(isLoggedIn);
  const { message } = props;
  const display = `User ${message}  ${isLoggedIn}`;

  return (
    <View>
      <Text onPress={toogleUser}>{display}</Text>
    </View>
  );
}
