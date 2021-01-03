import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./app/store/store";
import { getDailyreports } from "./app/api/apiTest";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./app/views/Home";
import Messenger from "./app/views/Messenger";
import Login from "./app/views/Login";
import Register from "./app/views/Register";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Menu } from "./app/views/Menu";
import { Schedule } from "./app/views/Schedule";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  isSignedInSelector,
  authSelector,
} from "./app/store/selectors/globalSelector";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserProfile from "./app/views/UserProfile";
import AddSubject from "./app/views/AddSubject";
import Group from "./app/views/Group";
import AddGroup from "./app/views/AddGroup";
import UserList from "./app/views/UserList";
import SujectDetails from "./app/views/SubjectDetails";
import EditSubject from "./app/views/EditSubject";
import EditUser from "./app/views/EditUser";
import ChangePassword from "./app/views/ChangePassword";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const LoginStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: `Student Essential`,
        headerStyle: {
          backgroundColor: "#006494",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
const MessengerStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: `Student Essential`,
        headerStyle: {
          backgroundColor: "#006494",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Messenger" component={Messenger} />
    </Stack.Navigator>
  );
};
const MenuStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: `Student Essential`,
        headerStyle: {
          backgroundColor: "#006494",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditUser" component={EditUser} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};
const ScheduleStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: `Student Essential`,
        headerStyle: {
          backgroundColor: "#006494",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="AddSubject" component={AddSubject} />
      <Stack.Screen name="SujectDetails" component={SujectDetails} />
      <Stack.Screen name="EditSubject" component={EditSubject} />
    </Stack.Navigator>
  );
};

const GroupStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: `Student Essential`,
        headerStyle: {
          backgroundColor: "#006494",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="AddGroup" component={AddGroup} />
      <Stack.Screen name="UserList" component={UserList} />
    </Stack.Navigator>
  );
};

export default function App() {
  const isSignedIn = useSelector(isSignedInSelector);
  const token = useSelector(authSelector);

  useEffect(() => {
    const setUserToken = async () => {
      token != null && (await AsyncStorage.setItem("token", token));
    };
    setUserToken();
  }, [token]);

  return (
    <PaperProvider>
      <NavigationContainer>
        {isSignedIn ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Messenger") {
                  return <Ionicons name="ios-text" size={24} color={color} />;
                } else if (route.name === "Schedule") {
                  return (
                    <Ionicons name="md-calendar" size={24} color={color} />
                  );
                } else if (route.name === "Login") {
                  return <Entypo name="login" size={24} color={color} />;
                } else if (route.name === "Menu") {
                  return (
                    <SimpleLineIcons name="menu" size={24} color={color} />
                  );
                } else if (route.name === "Group") {
                  return <FontAwesome name="group" size={24} color={color} />;
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: "#006494",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Schedule" component={ScheduleStackScreen} />
            <Tab.Screen name="Group" component={GroupStackScreen} />
            <Tab.Screen name="Messenger" component={MessengerStackScreen} />
            <Tab.Screen name="Menu" component={MenuStackScreen} />
          </Tab.Navigator>
        ) : (
          <LoginStackScreen />
        )}
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
