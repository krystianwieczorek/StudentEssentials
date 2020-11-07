import * as React from "react";
import { Appbar, Button, Provider, Portal, Modal } from "react-native-paper";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Picker,
} from "react-native";
import { Chip, Snackbar, List } from "react-native-paper";
import { useState, useEffect } from "react";
import { getShedulePerDay } from "../api/getShedulePerDay";
import { DayEnum } from "../common/DayEnum";
import {
  ActivityIndicator,
  Card,
  Avatar,
  Title,
  Paragraph,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { getAllGroups } from "../api/getAllGroups";
import { userIdSelector } from "../store/selectors/authSelector";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../api/getUserProfile";
import { getGroup } from "../api/getGroup";
import { updateUser } from "../api/updateUser";

export default function Group() {
  const { control, handleSubmit, errors } = useForm();
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [selectedValue, setSelectedValue] = useState();
  const [groups, setGroups] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [groupProfile, setGroupProfile] = useState();
  const userId = useSelector(userIdSelector);
  const [visibleSNack, setVisibleSnack] = useState(false);

  const onSubmit = (data) => {
    data.groupId = selectedValue;
    data.userId = userId;
    updateUser(data).then((response) => {
      response.status == "200" && setVisibleSnack(true);
    });
    console.log(data);
  };

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    setIsLoading(true);
    getUserProfile(userId).then(
      (response) =>
        response.data.groupId != null &&
        getGroup(response.data.groupId).then((response) => {
          console.log(response.data);
          setGroupProfile(response.data);
        })
    );
    setIsLoading(false);
  }, [userId, selectedValue]);

  useEffect(() => {
    getAllGroups().then((response) => setGroups(response.data));
  }, []);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visibleSNack}
        duration={3000}
        onDismiss={onDismissSnackBar}
        style={styles.snackbar}
      >
        <Text style={styles.snackbarText}>Now u can Sign In!</Text>
      </Snackbar>
      {isLoading ? (
        <ActivityIndicator size={50} animating={isLoading} color="#006494" />
      ) : (
        <Card style={styles.card}>
          <Card.Content style={styles.card}>
            <Avatar.Icon
              style={styles.avatar}
              size={100}
              icon="account-group-outline"
            />
            <Title style={styles.title}>Group Profile</Title>
            <Paragraph>
              <Text style={styles.textBold}>Group name: </Text>
              {groupProfile?.name}
            </Paragraph>
            <Paragraph>
              <Text style={styles.textBold}>Group ID: </Text>
              {groupProfile?.groupId}
            </Paragraph>
          </Card.Content>
          <Button style={styles.buttonSignUp} color="#006494" uppercase={false}>
            <Text style={{ color: "white" }}>Create Group</Text>
          </Button>

          <Button
            color="#006494"
            uppercase={false}
            title="Submit"
            style={styles.buttonSignUp}
            onPress={handleSubmit(onSubmit)}
            onPress={showModal}
          >
            <Text style={{ color: "white" }}>Choose Group</Text>
          </Button>
          <Provider>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.modal}
              >
                <Picker
                  selectedValue={selectedValue}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                  }}
                >
                  {groups?.map((item, key) => (
                    <Picker.Item
                      label={item.name}
                      value={item.groupId}
                      key={key}
                    />
                  ))}
                </Picker>
                <Button
                  mode="contained"
                  style={styles.buttonSignUp}
                  title="Submit"
                  onPress={handleSubmit(onSubmit)}
                >
                  Choose
                </Button>
              </Modal>
            </Portal>
          </Provider>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e3e3e3",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  textBold: {
    fontWeight: "bold",
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 50,
    backgroundColor: "black",
  },
  card: {
    paddingTop: 50,
    paddingBottom: 50,
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
    height: 400,
  },
  snackbar: {
    backgroundColor: "#7d0633",
  },
  snackbarText: {
    textAlign: "center",
  },
});
