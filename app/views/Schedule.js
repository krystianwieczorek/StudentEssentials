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
import { Chip } from "react-native-paper";
import { List } from "react-native-paper";
import { useState, useEffect } from "react";
import { getShedulePerDay } from "../api/getShedulePerDay";
import { getUserProfile } from "../api/getUserProfile";
import { DayEnum } from "../common/DayEnum";
import { ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";
import { userIdSelector } from "../store/selectors/globalSelector";
import { updateGroupSelector } from "../store/selectors/globalSelector";
import { back } from "react-native/Libraries/Animated/src/Easing";

export const Schedule = ({ navigation, route }) => {
  const [subcjetsList, setSubjectList] = useState();
  const [day, setDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserHaveGroup, setIsUserHaveGroup] = useState(false);
  const [visible, setVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [itemNameToDelete, setItemNameToDelete] = useState();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const userId = useSelector(userIdSelector);
  const groupId = useSelector(updateGroupSelector);

  useEffect(() => {
    setIsLoading(true);
    groupId != null && setIsUserHaveGroup(true);
    groupId != null &&
      getShedulePerDay(groupId, day).then((response) => {
        setSubjectList(response.data);
        setIsLoading(false);
      });
  }, [groupId]);

  useEffect(() => {
    setIsLoading(true);
    getUserProfile(userId).then((response) => {
      console.log(response.data);
      response.data.groupId != null && setIsUserHaveGroup(true);
      response.data.groupId != null &&
        getShedulePerDay(response.data.groupId, day).then((response) => {
          setSubjectList(response.data);
          setIsLoading(false);
        });
    });
  }, [day, route.params]);

  return (
    <>
      {isUserHaveGroup ? (
        <>
          <Appbar.Header style={styles.appBar}>
            <Chip
              style={styles.chip}
              textStyle={{ fontSize: 10, color: "white" }}
              onPress={() => {
                setDay(1);
              }}
            >
              Monday
            </Chip>
            <Chip
              style={styles.chip}
              textStyle={{ fontSize: 10, color: "white" }}
              onPress={() => setDay(2)}
            >
              Tuesday
            </Chip>
            <Chip
              style={styles.chip}
              textStyle={{ fontSize: 10, color: "white" }}
              onPress={() => setDay(3)}
            >
              Wednesday
            </Chip>
            <Chip
              style={styles.chip}
              textStyle={{ fontSize: 10, color: "white" }}
              onPress={() => setDay(4)}
            >
              Thursday
            </Chip>
            <Chip
              style={styles.chip}
              textStyle={{ fontSize: 10, color: "white" }}
              onPress={() => setDay(5)}
            >
              Friday
            </Chip>
          </Appbar.Header>
          <Text style={styles.text}>{DayEnum[day]}</Text>
          <Button
            style={{ marginRight: -200, marginTop: -27 }}
            color="#006494"
            icon="folder-plus"
            onPress={() => {
              navigation.navigate("AddSubject", { day });
            }}
          >
            New Element
          </Button>
          {isLoading ? (
            <ActivityIndicator
              style={styles.activityIndicator}
              size={50}
              animating={isLoading}
              color="#006494"
            />
          ) : (
            <SafeAreaView style={styles.scrollConteriner}>
              <ScrollView>
                <List.Section>
                  {subcjetsList?.map((item, key) => (
                    <List.Item
                      key={key}
                      title={`${item.subject}`}
                      description={`${""} hours: ${item.startTime} - ${
                        item.endTime
                      } ${"\n"} prof: ${item.profesor} `}
                      left={(props) => (
                        <List.Icon {...props} icon="folder" color="#006494" />
                      )}
                      right={(props) => (
                        <Button
                          icon="delete"
                          color="#7d0633"
                          onPress={() => {
                            showModal(true);
                            setItemToDelete(item.subjectToSheduleId);
                            setItemNameToDelete(item.subject);
                            console.log(item);
                          }}
                        />
                      )}
                    />
                  ))}
                </List.Section>
              </ScrollView>

              <Provider>
                <Portal>
                  <Modal
                    style={styles.modal}
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.modal}
                  >
                    <Text style={styles.modalText}>Confirm deletion of:</Text>
                    <Text style={styles.modalTextItemName}>
                      {itemNameToDelete}{" "}
                    </Text>
                    <Button style={styles.buttonConfirm}>
                      <Text style={{ color: "white" }}>Delete</Text>
                    </Button>
                  </Modal>
                </Portal>
              </Provider>
            </SafeAreaView>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <Text style={styles.infoText}>
            Go to group tab and choose or create your group
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  appBar: { justifyContent: "center", backgroundColor: "white" },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
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
  infoText: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  chip: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#006494",
  },
  scrollConteriner: {
    height: "83%",
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
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
});
