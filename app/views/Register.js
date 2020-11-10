import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Portal, Provider, Snackbar } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
import { getAllGroups } from "../api/getAllGroups";
import { addNewUser } from "../api/addNewUser";

export default function Register({ navigation }) {
  const [selectedValue, setSelectedValue] = useState();
  const [visible, setVisible] = useState(false);
  const [groups, setGroups] = useState();
  const [visibleSNack, setVisibleSnack] = useState(false);
  const [inputInfo, setInputInfo] = useState();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { control, handleSubmit, errors } = useForm();

  const onDismissSnackBar = () => setVisible(false);

  const onSubmit = (data) => {
    addNewUser(data).then((response) => {
      response.status == "200" && setVisibleSnack(true);
      setTimeout(() => {
        navigation.navigate("Login");
        clearTimeout();
      }, 2000);
    });
  };

  useEffect(() => {
    getAllGroups().then((response) => setGroups(response.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Sign up <Fontisto name="unlocked" size={24} color="black" />
      </Text>
      <Snackbar
        visible={visibleSNack}
        duration={3000}
        onDismiss={onDismissSnackBar}
        style={styles.snackbar}
      >
        <Text style={styles.snackbarText}>Now u can Sign In!</Text>
      </Snackbar>
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
            label="First Name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="firstName"
        rules={{ required: true }}
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
            label="Last Name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
        rules={{ required: true }}
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

      <TextInput
        style={styles.input}
        label="Group Name"
        mode="outlined"
        disabled
        onChangeText={(value) => onChange(value)}
        value={
          inputInfo?.name == undefined
            ? "I will choose or create group later"
            : inputInfo?.name
        }
      />

      <Controller
        control={control}
        render={() => (
          <Provider>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.modal}
              >
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Picker
                      selectedValue={selectedValue}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        onChange(itemValue);
                        setSelectedValue(itemValue);
                        setInputInfo(groups[itemValue - 1]);
                      }}
                    >
                      <Picker.Item
                        label="I will choose or create group later"
                        value={null}
                      />
                      {groups?.map((item, key) => (
                        <Picker.Item
                          label={item.name}
                          value={item.groupId}
                          key={key}
                        />
                      ))}
                    </Picker>
                  )}
                  name="groupId"
                  defaultValue=""
                />
              </Modal>
            </Portal>
            <Button
              mode="contained"
              style={styles.button}
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              onPress={showModal}
            >
              <Text style={{ color: "#006494" }}>Choose Group</Text>
            </Button>
            {errors.group && (
              <Text style={styles.errorMessage}>Group is required.</Text>
            )}
            <Button
              mode="contained"
              style={styles.buttonSignUp}
              title="Submit"
              onPress={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>
          </Provider>
        )}
        name="groupId"
        // rules={{ required: true }}
        defaultValue={null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e3e3e3",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    textAlign: "center",
  },
  errorMessage: {
    marginLeft: 12,
    color: "red",
  },
  button: {
    marginTop: 15,
    backgroundColor: "white",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
  },
  buttonSignUp: {
    marginTop: 15,
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
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  disabledInput: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
  },
  modal: {
    backgroundColor: "white",
    padding: 10,
  },
  snackbar: {
    backgroundColor: "#7d0633",
  },
  snackbarText: {
    textAlign: "center",
  },
});
