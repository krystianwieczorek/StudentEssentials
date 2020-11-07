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
import { getShedulePerDay } from "../api/getShedulePerDay";
import { DayEnum } from "../common/DayEnum";
import { ActivityIndicator } from "react-native-paper";

export const Schedule = () => {
  const [subcjetsList, setSubjectList] = useState();
  const [day, setDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getShedulePerDay(1, day).then((response) => {
      setSubjectList(response.data);
      setIsLoading(false);
    });
  }, [day]);

  return (
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
                  title={`${item.subject.name}`}
                  description={`${""} hours: ${item.startTime} - ${
                    item.endTime
                  } ${"\n"} prof: ${item.subject.profesor} `}
                  left={(props) => <List.Icon {...props} icon="folder" />}
                />
              ))}
            </List.Section>
          </ScrollView>
        </SafeAreaView>
      )}
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
  activityIndicator: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
  },
});
