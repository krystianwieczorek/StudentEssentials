import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { List, Button } from "react-native-paper";

export default function UserList({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Users assigned to</Text>
      <Text style={styles.textGroup}>{route.params.groupProfile.name}</Text>
      <SafeAreaView style={styles.scrollConteriner}>
        <ScrollView>
          <List.Section>
            {route.params.groupProfile.userList?.map((item, key) => (
              <List.Item
                key={key}
                title={`${item.email}`}
                description={`${item.firstName} ${item.lastName}`}
                left={(props) => (
                  <List.Icon {...props} icon="account" color="#006494" />
                )}
              />
            ))}
          </List.Section>
        </ScrollView>
      </SafeAreaView>
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
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 30,
  },
  textGroup: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 15,
  },
  scrollConteriner: {
    marginTop: 30,
    height: "80%",
  },
  activityIndicator: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
  },
});
