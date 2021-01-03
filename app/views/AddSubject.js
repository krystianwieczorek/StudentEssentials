import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { Button, Snackbar, Provider, Portal, Modal } from "react-native-paper";
import { authClient } from "../api/authClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DayEnum } from "../common/DayEnum";
import { Foundation } from "@expo/vector-icons";
import { addNewSubject } from "../api/addNewSubject";
import { useSelector } from "react-redux";
import { updateGroupSelector } from "../store/selectors/globalSelector";
import { ActivityIndicator } from "react-native-paper";

export default function AddSubject({ navigation, route }) {
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModal2, setVisibleModal2] = useState(false);
  const { control, handleSubmit, errors } = useForm();
  const [chosenStartTime, setChosenStartTime] = useState(new Date());
  const [chosenEndTime, setChosenEndTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [startTimeInput, setStartTimeInput] = useState();
  const [endTimeInput, setEndTimeInput] = useState();

  const groupId = useSelector(updateGroupSelector);

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);
  const showModal2 = () => setVisibleModal2(true);
  const hideModal2 = () => setVisibleModal2(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    data.chosenEndTime;
    data.startTime = chosenStartTime.toLocaleTimeString();
    data.endTime = chosenEndTime.toLocaleTimeString();
    data.groupId = groupId;
    data.sheduleDay = route.params.day;

    addNewSubject(data).then((response) => {
      response.status == "200" && setVisibleSnack(true);
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
            <Text style={styles.snackbarText}>Subject added correctly!</Text>
          </Snackbar>
        </View>
      ) : (
        <View>
          <Foundation
            style={styles.icon}
            name="folder-add"
            size={50}
            color="#006494"
          />
          <Text style={styles.text}>
            New {DayEnum[route.params.day]} element
          </Text>
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
            rules={{ required: true }}
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
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.profesor && (
            <Text style={styles.errorMessage}>Profesor is required.</Text>
          )}
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                label="Classroom"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="classroom"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.classroom && (
            <Text style={styles.errorMessage}>Classroom is required.</Text>
          )}
          <TextInput
            style={styles.input}
            label="Start Time"
            mode="outlined"
            disabled
            onChangeText={(value) => onChange(value)}
            value={startTimeInput?.substring(0, 5)}
          />
          <TextInput
            style={styles.input}
            label="End Time"
            mode="outlined"
            disabled
            onChangeText={(value) => onChange(value)}
            value={endTimeInput?.substring(0, 5)}
          />
          <Button
            mode="contained"
            style={styles.button}
            title="Submit"
            onPress={showModal}
          >
            <Text style={{ color: "#006494" }}>Set Start Time</Text>
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            title="Submit"
            onPress={showModal2}
          >
            <Text style={{ color: "#006494" }}>Set End Time</Text>
          </Button>
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
      <Provider>
        <Portal>
          <Modal
            visible={visibleModal}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Text style={styles.textModal}>Start Time</Text>

            <DateTimePicker
              mode="time"
              display="default"
              value={chosenStartTime}
              onChange={(event, selectedDate) => {
                setChosenStartTime(selectedDate);
                setStartTimeInput(selectedDate.toLocaleTimeString());
              }}
            />
          </Modal>

          <Modal
            visible={visibleModal2}
            onDismiss={hideModal2}
            contentContainerStyle={styles.modal}
          >
            <Text style={styles.textModal}>End Time</Text>
            <DateTimePicker
              mode="time"
              display="default"
              value={chosenEndTime}
              onChange={(event, selectedDate) => {
                setChosenEndTime(selectedDate);
                setEndTimeInput(selectedDate.toLocaleTimeString());
              }}
            />
          </Modal>
        </Portal>
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
    height: "60%",
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
