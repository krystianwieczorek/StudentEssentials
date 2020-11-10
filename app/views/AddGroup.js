import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, DatePickerIOS } from "react-native";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { Button, Snackbar, Provider, Portal, Card } from "react-native-paper";
import { authClient } from "../api/authClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DayEnum } from "../common/DayEnum";
import { MaterialIcons } from "@expo/vector-icons";
import { addNewSubject } from "../api/addNewSubject";
import { useSelector } from "react-redux";
import { userIdSelector } from "../store/selectors/globalSelector";
import { addNewGroup } from "../api/addNewGroup";
import { ActivityIndicator } from "react-native-paper";

export default function AddGroup({ navigation }) {
  const [visible, setVisible] = useState(false);
  const { control, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector(userIdSelector);

  const onSubmit = (data) => {
    setIsLoading(true);
    data.userId = userId;
    addNewGroup(data).then((response) => {
      response.status == "200" && setVisible(true);
      setIsLoading(false);
      setTimeout(() => {
        navigation.navigate("Group");
        clearTimeout();
      }, 2000);
    });
  };

  const onDismissSnackBar = () => setVisible(false);

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
            visible={visible}
            duration={3000}
            onDismiss={onDismissSnackBar}
            style={styles.snackbar}
          >
            <Text style={styles.snackbarText}>Group added correctly!</Text>
          </Snackbar>
        </View>
      ) : (
        <View style={styles.card}>
          <MaterialIcons
            style={styles.icon}
            name="group-add"
            size={50}
            color="#006494"
          />
          <Text style={styles.text}>New Group</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                label="Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="name"
            // rules={{ required: true}}
            defaultValue=""
          />
          {errors.name && (
            <Text style={styles.errorMessage}>Name is required.</Text>
          )}
          <Button
            mode="contained"
            style={styles.buttonAdd}
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          >
            Add
          </Button>
        </View>
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
  card: {
    paddingTop: 50,
    paddingBottom: 50,
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
  buttonAdd: {
    marginTop: 15,
    backgroundColor: "#006494",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
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
  button: {
    marginTop: 15,
    backgroundColor: "white",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
  },
  activityIndicator: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
  },
});
