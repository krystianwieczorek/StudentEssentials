import * as React from "react";
import { Appbar, Button, Provider, Portal, Modal } from "react-native-paper";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-community/picker";
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
import { userIdSelector } from "../store/selectors/globalSelector";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../api/getUserProfile";
import { getGroup } from "../api/getGroup";
import { updateUser } from "../api/updateUser";
import { updateGroupAction } from "../store/actions/updateGroupAction";
import { updateGroupSelector } from "../store/selectors/globalSelector";
import { refreshSelector } from "../store/selectors/globalSelector";

export default function Group({ navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [selectedValue, setSelectedValue] = useState();
  const [groups, setGroups] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [groupProfile, setGroupProfile] = useState();
  const [visibleSNack, setVisibleSnack] = useState(false);
  const userId = useSelector(userIdSelector);
  const groupId = useSelector(updateGroupSelector);
  const flag = useSelector(refreshSelector);

  const dispatch = useDispatch();

  const onDismissSnackBar = () => setVisible(false);

  const onSubmit = (data) => {
    setVisible(false);
    setIsLoading(true);
    data.groupId = selectedValue;
    data.userId = userId;
    updateUser(data).then((response) => {
      response.status == "200" && setVisibleSnack(true);
      dispatch(updateGroupAction(selectedValue));
    });
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted && groupId != null) {
      getGroup(groupId).then((response) => {
        setGroupProfile(response.data);
        setIsLoading(false);
      });
    }
    return () => {
      unmounted = true;
    };
  }, [groupId, userId, flag]);

  useEffect(() => {
    getAllGroups().then((response) => setGroups(response.data));
    setIsLoading(false);
  }, [visible]);

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
            visible={visibleSNack}
            duration={3000}
            onDismiss={onDismissSnackBar}
            style={styles.snackbar}
          >
            <Text style={styles.snackbarText}>Group changed correctly!</Text>
          </Snackbar>
        </View>
      ) : (
        <Card style={styles.card}>
          <Card.Content style={styles.card}>
            <Avatar.Icon
              style={styles.avatar}
              size={100}
              icon="account-group-outline"
            />
            <Title style={styles.title}>Group Profile</Title>
            {groupProfile != null && (
              <>
                <Paragraph>
                  <Text style={styles.textBold}>Group name: </Text>
                  {groupProfile?.name}
                </Paragraph>
                <Paragraph>
                  <Text style={styles.textBold}>Group ID: </Text>
                  {groupProfile?.groupId}
                </Paragraph>
                <Paragraph>
                  <Text style={styles.textBold}>Created by: </Text>
                  {groupProfile?.owner?.firstName}{" "}
                  {groupProfile?.owner?.lastName}
                </Paragraph>
              </>
            )}

            <Button
              onPress={() => navigation.navigate("AddGroup")}
              style={styles.buttonCreate}
              color="#006494"
              uppercase={false}
            >
              <Text style={{ color: "white" }}>Create Group</Text>
            </Button>
            <Button
              color="#006494"
              uppercase={false}
              title="Submit"
              style={styles.buttonChoose}
              onPress={handleSubmit(onSubmit)}
              onPress={showModal}
            >
              <Text style={{ color: "white" }}>Choose Group</Text>
            </Button>
            <Button
              color="#006494"
              uppercase={false}
              title="Submit"
              style={styles.buttonChoose}
              onPress={() => navigation.navigate("UserList", { groupProfile })}
            >
              <Text style={{ color: "white" }}>Assigned User</Text>
            </Button>
          </Card.Content>

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
                  style={styles.buttonChoose}
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
    backgroundColor: "#006494",
  },
  card: {
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
    width: "100%",
    height: "100%",
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
  buttonCreate: {
    marginTop: 15,
    backgroundColor: "#006494",
    width: "100%",
  },
  buttonChoose: {
    marginTop: 15,
    backgroundColor: "#006494",
    width: "100%",
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
    height: "70%",
  },
  snackbar: {
    backgroundColor: "#7d0633",
  },
  snackbarText: {
    textAlign: "center",
  },
  activityIndicator: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
