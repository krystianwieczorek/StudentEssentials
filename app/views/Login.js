import React, { useEffect } from "react";
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
} from "../store/selectors/authSelector";
import { loginAction } from "../store/actions/loginAction";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const { control, handleSubmit, errors } = useForm();
  const onDismissSnackBar = () => setVisible(false);

  const onSubmit = (data) => {
    authClient(data)
      .then((response) => {
        dispatch(loginAction(response.data.token, response.data.id));
        console.log(response.data);
      })
      .catch(() => setVisible(true));
  };

  const test = async () => {
    console.log(navigation);
  };

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={onDismissSnackBar}
        style={styles.snackbar}
      >
        <Text style={styles.snackbarText}>
          Username or password is incorect!
        </Text>
      </Snackbar>
      <FontAwesome style={styles.icon} name="lock" size={50} color="black" />
      <Text style={styles.text}>Sign in</Text>
      <Button onPress={test}>Test</Button>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            label="Email"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="email"
        // rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.errorMessage}>Email is required.</Text>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            label="Password"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password"
        // rules={{ required: true }}
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.errorMessage}>Password is required.</Text>
      )}

      <Button
        mode="contained"
        style={styles.button}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      >
        Sign in
      </Button>
      <Button
        color="black"
        style={styles.signUp}
        uppercase={false}
        onPress={() => navigation.navigate("Register")}
      >
        <Text>
          Don't have an account?
          <Text style={{ color: "#006494", fontWeight: "bold" }}>Sign Up</Text>
        </Text>
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
