import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Button,
  Provider,
  Portal,
  Modal,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateUser } from "../api/updateUser";
import { FontAwesome5 } from "@expo/vector-icons";

export default function EditUser({ navigation, route }) {
  const { params } = route;
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  const onDismissSnackBar = () => setVisibleSnack(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    data.userId = params.userId;
    data.groupId = params.groupId;
    updateUser(data).then((response) => {
      response.status == "200" && setVisibleSnack(true);
      setTimeout(() => {
        navigation.navigate("UserProfile", { route });
        clearTimeout();
      }, 2000);
    });
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator
            style={styles.activityIndicator}
            size={50}
            animating={isLoading}
            color="#006494"
          />
          <Snackbar
            visible={visibleSnack}
            duration={3000}
            onDismiss={onDismissSnackBar}
            style={styles.snackbar}
          >
            <Text style={styles.snackbarText}>Profile edited correctly!</Text>
          </Snackbar>
        </View>
      ) : (
        <>
          <FontAwesome5
            style={styles.icon}
            name="user-edit"
            size={50}
            color="#006494"
          />
          <Text style={styles.text}>Edit profile</Text>

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                label="First Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="firstName"
            // rules={{ required: true }}
            defaultValue={params.firstName}
          />
          {errors.firstName && (
            <Text style={styles.errorMessage}>First Name is required.</Text>
          )}
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                label="Last Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="lastName"
            // rules={{ required: true }}
            defaultValue={params.lastName}
          />
          {errors.lastName && (
            <Text style={styles.errorMessage}>Last Name is required.</Text>
          )}
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
            name="profesor"
            // rules={{ required: true }}
            defaultValue={params.email}
          />
          {errors.email && (
            <Text style={styles.errorMessage}> Valid email is required.</Text>
          )}

          <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
            <Text style={{ color: "white" }}>Edit</Text>
          </Button>
        </>
      )}
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
  button: {
    marginTop: 10,
    backgroundColor: "#006494",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
  },
  textModal: {
    textAlign: "center",
    fontSize: 30,
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
  buttonEdit: {
    marginTop: 10,
    backgroundColor: "#006494",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
  },
  modal: {
    backgroundColor: "white",
    padding: 10,
    height: "60%",
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
