import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, DatePickerIOS } from "react-native";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { Button, Snackbar, Provider, Portal, Modal } from "react-native-paper";
import { authClient } from "../api/authClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DayEnum } from "../common/DayEnum";
import { Foundation } from "@expo/vector-icons";
import { addNewSubject } from "../api/addNewSubject";

export default function AddSubject({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const { control, handleSubmit, errors } = useForm();
  const [chosenStartTime, setChosenStartTime] = useState(new Date());
  const [chosenEndTime, setChosenEndTime] = useState(new Date());

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const onSubmit = (data) => {
    data.chosenEndTime;
    data.startTime = chosenStartTime.toLocaleTimeString();
    data.endTime = chosenEndTime.toLocaleTimeString();
    data.groupId = 1;
    data.sheduleDay = route.params.day;

    addNewSubject(data).then((response) => {
      response.status == "200" && setVisible(true);
      setTimeout(() => {
        navigation.navigate("Schedule", { route });
        clearTimeout();
      }, 2000);
    });
  };

  const onDismissSnackBar = () => setVisible(false);

  //   console.log(route.params.day);
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={onDismissSnackBar}
        style={styles.snackbar}
      >
        <Text style={styles.snackbarText}>Subject added correctly!</Text>
      </Snackbar>
      <Foundation
        style={styles.icon}
        name="folder-add"
        size={50}
        color="black"
      />
      <Text style={styles.text}>New {DayEnum[route.params.day]} element</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            label="Subject"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="subject"
        // rules={{ required: true}}
        defaultValue=""
      />
      {errors.subject && (
        <Text style={styles.errorMessage}>Subject is required.</Text>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            label="Profesor"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="profesor"
        // rules={{ required: true }}
        defaultValue=""
      />
      {errors.profesor && (
        <Text style={styles.errorMessage}>Profesor is required.</Text>
      )}

      <Provider>
        <Portal>
          <Modal
            visible={visibleModal}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Text style={styles.textModal}>Start Time</Text>

            <DatePickerIOS
              mode="time"
              initialDate={chosenStartTime}
              onDateChange={(startValue) => {
                setChosenStartTime(startValue);
              }}
            />

            <Text style={styles.textModal}>End Time</Text>
            <DatePickerIOS
              mode="time"
              initialDate={chosenEndTime}
              onDateChange={(startValue) => {
                setChosenEndTime(startValue);
              }}
            />
            <Button onPress={() => setVisibleModal(false)}>
              <Text style={{ color: "#006494", fontSize: 15 }}>Close</Text>
            </Button>
          </Modal>
        </Portal>
        <Button
          mode="contained"
          style={styles.button}
          title="Submit"
          onPress={showModal}
        >
          <Text style={{ color: "#006494" }}>Set Time</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.buttonAdd}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        >
          Add
        </Button>
      </Provider>
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
  textModal: {
    textAlign: "center",
    fontSize: 30,
  },
  modal: {
    backgroundColor: "white",
    padding: 10,
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
});
