import React, { useEffect, useState, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { List, Avatar, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { getMessages } from "../api/getMessages";
import { sendMessage } from "../api/sendMessage";
import { userIdSelector } from "../store/selectors/globalSelector";
import { useSelector } from "react-redux";
import { updateGroupSelector } from "../store/selectors/globalSelector";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as signalR from "@aspnet/signalr";

export default function Messenger() {
  const [messages, setMessages] = useState();
  const { control, handleSubmit, errors, reset } = useForm();
  const [clear, setClear] = useState("");
  const [conn, setConn] = useState(null);

  const scrollView = useRef();

  const userId = useSelector(userIdSelector);
  const groupId = useSelector(updateGroupSelector);

  const hubUrl = "https://253145aa5e9b.ngrok.io/chathub";

  const connectionHub = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  const onSubmit = (data) => {
    reset({ content: "" });
    data.userId = userId;
    data.groupId = groupId;
    data.date = new Date();
    // sendMessage(data).then((response) => {
    //   setClear(response);
    // });
    conn.invoke("SendMessage", groupId, data).catch(function (err) {
      setMessages(response.rootElement);
    });
  };

  useEffect(() => {
    getMessages(groupId).then((response) => {
      setMessages(response.data);
    });
    setTimeout(() => {
      scrollView.current.scrollToEnd();
      clearTimeout();
    }, 1000);
  }, [clear]);

  useEffect(() => {
    connectionHub.on("ReceiveMessage", (response) => {
      setMessages(response.rootElement);
      setTimeout(() => {
        scrollView.current.scrollToEnd();
        clearTimeout();
      }, 1000);
    });
    connectionHub
      .start()
      .then(() => {
        // connectionHub.invoke("SendMessage", 1).catch(function (err) {
        //   return console.error(err.toString());
        // });

        console.log("polaczone");
      })
      .catch((err) => this.logError(err));

    setConn(connectionHub);
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={60}
      contentContainerStyle={{ marginTop: 2 }}
      behavior={Platform.OS == "ios" ? "position" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.scrollConteriner}>
        <ScrollView ref={scrollView}>
          <List.Section>
            {messages?.map((item, key) =>
              item.user.userId == userId ? (
                <List.Item
                  key={key}
                  titleStyle={{ textAlign: "right", marginRight: 10 }}
                  descriptionStyle={styles.descriptionLoggedUser}
                  descriptionNumberOfLines={100}
                  title={`${item.user.firstName} ${item.user.lastName}`}
                  description={item.content}
                  right={(props) => (
                    <Avatar.Icon
                      style={styles.avatarLoggedUser}
                      size={30}
                      icon="account"
                    />
                  )}
                />
              ) : (
                <List.Item
                  key={key}
                  descriptionStyle={styles.description}
                  descriptionNumberOfLines={100}
                  key={key}
                  title={`${item.user.firstName} ${item.user.lastName}`}
                  description={item.content}
                  left={(props) => (
                    <Avatar.Icon
                      style={styles.avatar}
                      size={30}
                      icon="account"
                    />
                  )}
                />
              )
            )}
          </List.Section>
        </ScrollView>
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.textInput}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="content"
            rules={{ required: true }}
            defaultValue=""
          />
          <MaterialCommunityIcons
            onPress={handleSubmit(onSubmit)}
            // onPress={() => scrollView.current.scrollToEnd()}
            name="send"
            style={styles.button}
            size={40}
            color="#006494"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3",
  },
  inner: {
    padding: 24,
    flex: 1,
    flexDirection: "row",
  },
  textInput: {
    backgroundColor: "white",
    height: 50,
    padding: 10,
    width: 285,
    borderRadius: 10,
  },
  button: {
    width: 70,
    marginTop: 5,
    height: 40,
    textAlign: "center",
  },
  scrollConteriner: {
    height: "87%",
    backgroundColor: "#e3e3e3",
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  avatar: {
    backgroundColor: "#006494",
  },
  avatarLoggedUser: {
    backgroundColor: "#7d0633",
  },
  avatar: {
    backgroundColor: "#006494",
  },
  description: {
    marginTop: 16,
    textAlign: "center",
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#006494",
    borderRadius: 18,
    color: "#20232a",
  },
  descriptionLoggedUser: {
    marginTop: 16,
    textAlign: "center",
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#7d0633",
    borderRadius: 18,
    color: "#20232a",
  },
});
