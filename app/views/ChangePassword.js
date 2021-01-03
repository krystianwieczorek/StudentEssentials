import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { Button, Snackbar } from "react-native-paper";
import { authClient } from "../api/authClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import {
  isSignedInSelector,
  authSelector,
} from "../store/selectors/globalSelector";
import { loginAction } from "../store/actions/loginAction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { userIdSelector } from "../store/selectors/globalSelector";
import { changePassword } from "../api/changePassword";

export default function ChangePassword({ navigation }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { control, handleSubmit, errors } = useForm();
  const onDismissSnackBar = () => setVisible(false);
  const userId = useSelector(userIdSelector);

  const onSubmit = (data) => {
    data.userId = userId;
    changePassword(data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTimeout(() => {
            navigation.navigate("Menu");
            clearTimeout();
          }, 2000);
        }
      })
      .catch(() => setVisible(true));
  };

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={onDismissSnackBar}
        style={styles.snackbar}
      >
        <Text style={styles.snackbarText}>Password not match!</Text>
      </Snackbar>
      <MaterialCommunityIcons
        style={styles.icon}
        name="key-change"
        size={50}
        color="black"
      />
      <Text style={styles.text}>Change Password</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            label="Old Password"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password0"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password0 && (
        <Text style={styles.errorMessage}>Email is required.</Text>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            label="New Password"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password1"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password1 && (
        <Text style={styles.errorMessage}>Password is required.</Text>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            label="New Password Again"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password2"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password2 && (
        <Text style={styles.errorMessage}>Password is required.</Text>
      )}

      <Button
        mode="contained"
        style={styles.button}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      >
        Change
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 25,
  },
  icon: {
    textAlign: "center",
  },
  errorMessage: {
    marginLeft: 12,
    color: "red",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#006494",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
  },
  signUp: {
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  snackbar: {
    backgroundColor: "#7d0633",
  },
  snackbarText: {
    textAlign: "center",
  },
});
