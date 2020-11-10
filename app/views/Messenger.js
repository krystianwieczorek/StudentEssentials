import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { List } from "react-native-paper";
import { getShedulePerDay } from "../api/getShedulePerDay";

export default function Messenger() {
  const [subcjetsList, setSubjectList] = useState();

  useEffect(() => {
    getShedulePerDay(1, 1).then((response) => {
      setSubjectList(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <Text>Messenger Page</Text>
      <>
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
                    <List.Icon {...props} icon="folder" color="#006494" />
                  )}
                />
              ))}
            </List.Section>
          </ScrollView>
        </SafeAreaView>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
  },
  scrollConteriner: {
    height: "83%",
  },
});
