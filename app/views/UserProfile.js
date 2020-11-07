import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { userIdSelector } from "../store/selectors/authSelector";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../api/getUserProfile";
import { Avatar } from "react-native-paper";
import { Card, Title, Paragraph } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";

export default function UserProfile({ navigation }) {
  const userId = useSelector(userIdSelector);
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserProfile(userId).then((response) => {
      setUserProfile(response.data);
      setIsLoading(false);
    });
  }, [userId]);
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
              {userProfile?.group.name}
            </Paragraph>
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
    padding: 15,
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
  },
});
