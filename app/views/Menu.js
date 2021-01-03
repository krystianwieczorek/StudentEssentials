import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../store/actions/logoutAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

export const Menu = ({ navigation }) => {
  const dispatch = useDispatch();

  const logoutUser = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(logoutAction());
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 50,
          fontSize: 30,
        }}
      >
        Menu
      </Text>
      <Button
        color="white"
        uppercase={false}
        title=""
        onPress={() => navigation.navigate("UserProfile")}
        style={styles.button}
      >
        User Profile
      </Button>
      <Button
        color="white"
        uppercase={false}
        title=""
        onPress={() => navigation.navigate("ChangePassword")}
        style={styles.button}
      >
        Change Password
      </Button>
      <Button
        color="white"
        uppercase={false}
        title=""
        onPress={() => logoutUser()}
        style={styles.button}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
  },
  button: {
    margin: 10,
    backgroundColor: "#006494",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
  },
});
