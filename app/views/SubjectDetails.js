import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Appbar,
  Provider,
  Portal,
  Modal,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import { DayEnum } from "../common/DayEnum";
import { FontAwesome } from "@expo/vector-icons";
import { deleteSheduleElement } from "../api/deleteSheduleElement";

export default function SujectDetails({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSnack, setVisibleSnack] = useState(false);

  const { item } = route.params;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const onDismissSnackBar = () => setVisibleSnack(false);

  const handleDelete = () => {
    setIsLoading(true);
    const data = { subjectToSheduleId: item.subjectToSheduleId };
    deleteSheduleElement(data).then((response) => {
      hideModal();
      response.status == "200" && setVisibleSnack(true);
      setTimeout(() => {
        navigation.navigate("Schedule", { route });
        clearTimeout();
      }, 2000);
    });
  };

  return (
    <>
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
            <Text style={styles.snackbarText}>
              Shedule item deleted successfully!
            </Text>
          </Snackbar>
        </View>
      ) : (
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content style={styles.card}>
              <FontAwesome name="book" style={styles.icon} size={100} />
              <Title style={styles.title}>Subject Details</Title>
              <Paragraph>
                <Text style={styles.textBold}>Subject name: </Text>
                {item.subject}
              </Paragraph>
              <Paragraph>
                <Text style={styles.textBold}>Profesor name: </Text>
                {item.profesor}
              </Paragraph>
              <Paragraph>
                <Text style={styles.textBold}>Classroom: </Text>
                {item.classroom}
              </Paragraph>
              <Paragraph>
                <Text style={styles.textBold}>Start Time: </Text>
                {item.startTime.substring(0, 5)}
              </Paragraph>
              <Paragraph>
                <Text style={styles.textBold}>End Time: </Text>
                {item.endTime.substring(0, 5)}
              </Paragraph>
              <Paragraph>
                <Text style={styles.textBold}>Day: </Text>
                {DayEnum[item.sheduleDay]}
              </Paragraph>
              <Button
                onPress={() => navigation.navigate("EditSubject", { item })}
                style={styles.buttonEdit}
              >
                <Text style={{ color: "white" }}>Edit</Text>
              </Button>
              <Button onPress={() => showModal()} style={styles.buttonConfirm}>
                <Text style={{ color: "white" }}>Delete</Text>
              </Button>
              <Provider>
                <Portal>
                  <Modal
                    style={styles.modal}
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.modal}
                  >
                    <Text style={styles.modalText}>Confirm deletion of:</Text>
                    <Text style={styles.modalTextItemName}>{item.subject}</Text>
                    <Button
                      onPress={() => handleDelete()}
                      style={styles.buttonConfirm}
                    >
                      <Text style={{ color: "white" }}>COnfirm</Text>
                    </Button>
                  </Modal>
                </Portal>
              </Provider>
            </Card.Content>
          </Card>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
  },
  icon: {
    color: "#006494",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 50,
    marginTop: 50,
  },
  card: {
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "100%",
    backgroundColor: "#e3e3e3",
  },
  modal: {
    backgroundColor: "white",
    padding: 10,
    height: "50%",
  },
  modalText: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 20,
  },
  modalTextItemName: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    color: "#7d0633",
    fontSize: 35,
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  textBold: {
    fontWeight: "bold",
  },
  chip: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#006494",
  },
  activityIndicator: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
  },
  buttonConfirm: {
    marginTop: 15,
    backgroundColor: "#7d0633",
    width: "100%",
  },
  buttonEdit: {
    marginTop: 15,
    backgroundColor: "#006494",
    width: "100%",
  },
  snackbar: {
    backgroundColor: "#7d0633",
  },
});
