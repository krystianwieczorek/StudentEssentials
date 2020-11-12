import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { userIdSelector } from "../store/selectors/globalSelector";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../api/getUserProfile";
import { Avatar } from "react-native-paper";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";

export default function UserProfile({ navigation, route }) {
  const userId = useSelector(userIdSelector);
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserProfile(userId).then((response) => {
      setUserProfile(response.data);
      setIsLoading(false);
    });
  }, [userId, route]);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={50} animating={isLoading} color="#006494" />
      ) : (
        <Card style={styles.card}>
          <Card.Content style={styles.card}>
            <Avatar.Icon
              style={styles.avatar}
              size={100}
              icon="account-card-details"
            />
            <Title style={styles.title}>User Profile</Title>
            <Paragraph>
              <Text style={styles.textBold}>First name: </Text>
              {userProfile?.firstName}
            </Paragraph>
            <Paragraph>
              <Text style={styles.textBold}>Last name: </Text>
              {userProfile?.lastName}
            </Paragraph>
            <Paragraph>
              <Text style={styles.textBold}>Email adress: </Text>
              {userProfile?.email}
            </Paragraph>
            <Paragraph>
              <Text style={styles.textBold}>Assigned to group: </Text>
              {userProfile?.group != null ? userProfile?.group?.name : "null"}
            </Paragraph>
            <Button
              onPress={() => navigation.navigate("EditUser", userProfile)}
              style={styles.button}
            >
              <Text style={{ color: "white" }}>Edit</Text>
            </Button>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#006494",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
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
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "100%",
    backgroundColor: "#e3e3e3",
  },
});
