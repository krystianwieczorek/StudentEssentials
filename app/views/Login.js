import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-paper";

export default function Login({ navigation }) {
  const onSubmit = (data) => console.log(data);
  const { control, handleSubmit, errors } = useForm();

  return (
    <View style={styles.container}>
      <FontAwesome style={styles.icon} name="lock" size={50} color="black" />
      <Text style={styles.text}>Sign in</Text>
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
        rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
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
        rules={{ required: true }}
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
          Don't have an account?{" "}
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
});
