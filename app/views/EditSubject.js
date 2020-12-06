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
import { Entypo } from "@expo/vector-icons";
import { editSubject } from "../api/editSubject";

export default function EditSubject({ navigation, route }) {
  const { item } = route.params;
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModal2, setVisibleModal2] = useState(false);
  const [startTime, setChosenStartTime] = useState(new Date());
  const [startTimeInput, setStartTimeInput] = useState(item.startTime);
  const [endTime, setChosenEndTime] = useState(new Date());
  const [endTimeInput, setEndTimeInput] = useState(item.endTime);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);
  const showModal2 = () => setVisibleModal2(true);
  const hideModal2 = () => setVisibleModal2(false);
  const onDismissSnackBar = () => setVisibleSnack(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    data.startTime = startTime.toLocaleTimeString();
    data.endTime = endTime.toLocaleTimeString();
    data.subjectToSheduleId = item.subjectToSheduleId;
    editSubject(data).then((response) => {
      response.status == "200" && setVisibleSnack(true);
      setTimeout(() => {
        navigation.navigate("Schedule", { route });
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
            <Text style={styles.snackbarText}>Subject edited correctly!</Text>
          </Snackbar>
        </View>
      ) : (
        <>
          <Entypo style={styles.icon} name="pencil" size={50} color="#006494" />
          <Text style={styles.text}>Edit {item.subject}</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                label="Profesor Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="profesor"
            // rules={{ required: true }}
            defaultValue={item?.profesor}
          />
          {errors.profesor && (
            <Text style={styles.errorMessage}>Profesor is required.</Text>
          )}
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
            // rules={{ required: true }}
            defaultValue={item?.subject}
          />
          {errors.subject && (
            <Text style={styles.errorMessage}>Subject is required.</Text>
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
            // rules={{ required: true }}
            defaultValue={item?.classroom}
          />
          {errors.classroom && (
            <Text style={styles.errorMessage}>Classroom is required.</Text>
          )}
          <TextInput
            style={styles.input}
            label="Start Time"
            mode="outlined"
            disabled
            onTouchStart={() => setVisibleModal(true)}
            onChangeText={(value) => onChange(value)}
            value={startTimeInput}
          />
          <TextInput
            style={styles.input}
            label="End Time"
            mode="outlined"
            disabled
            onChangeText={(value) => onChange(value)}
            value={endTimeInput}
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
            style={styles.buttonEdit}
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          >
            Edit
          </Button>
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
                  value={startTime}
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
                  value={endTime}
                  onChange={(event, selectedDate) => {
                    setChosenEndTime(selectedDate);
                    setEndTimeInput(selectedDate.toLocaleTimeString());
                  }}
                />
              </Modal>
            </Portal>
          </Provider>
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
  textModal: {
    textAlign: "center",
    fontSize: 30,
  },
  button: {
    marginTop: 15,
    backgroundColor: "white",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
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
