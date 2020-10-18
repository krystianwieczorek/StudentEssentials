import * as React from "react";
import { Appbar } from "react-native-paper";
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
import { getSubjectList } from "../api/getSubjectList";

export const Schedule = () => {
  const [subcjetsList, setSubjectList] = useState();
  const [day, setDay] = useState("Monday");

  useEffect(() => {
    getSubjectList(day).then((response) => {
      setSubjectList(response);
      console.log(response);
    });
  }, [day]);

  return (
    <>
      <Appbar.Header style={styles.appBar}>
        <Chip
          style={styles.chip}
          textStyle={{ fontSize: 10, color: "white" }}
          onPress={() => {
            setDay("Monday");
          }}
        >
          Monday
        </Chip>
        <Chip
          style={styles.chip}
          textStyle={{ fontSize: 10, color: "white" }}
          onPress={() => setDay("Tuesday")}
        >
          Tuesday
        </Chip>
        <Chip
          style={styles.chip}
          textStyle={{ fontSize: 10, color: "white" }}
          onPress={() => setDay("Wednesday")}
        >
          Wednesday
        </Chip>
        <Chip
          style={styles.chip}
          textStyle={{ fontSize: 10, color: "white" }}
          onPress={() => console.log("Thursday")}
        >
          Thursday
        </Chip>
        <Chip
          style={styles.chip}
          textStyle={{ fontSize: 10, color: "white" }}
          onPress={() => console.log("Friday")}
        >
          Friday
        </Chip>
      </Appbar.Header>
      <Text style={styles.text}>{day}</Text>
      <SafeAreaView style={styles.scrollConteriner}>
        <ScrollView>
          <List.Section>
            {subcjetsList?.map((item, key) => (
              <List.Item
                key={key}
                title={`${item.title}`}
                description={`hours: ${item.startTime} - ${
                  item.endTime
                } ${"\n"} prof: ${item.prof} `}
                left={(props) => <List.Icon {...props} icon="folder" />}
              />
            ))}
          </List.Section>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  appBar: { justifyContent: "center", backgroundColor: "white" },
  chip: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#006494",
  },
  scrollConteriner: {
    height: "100%",
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
  },
});
