import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import AppbarBottom from "./app/components/AppbarBottom";
import AppBarTop from "./app/components/AppBarTop";
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
import { createStackNavigator } from "@react-navigation/stack";
import { Schedule } from "./app/views/Schedule";

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
const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: `Student Essential`,
          headerStyle: {
            backgroundColor: "#006494",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ReduxProvider store={configureStore}>
      <PaperProvider>
        <NavigationContainer>
          {/* <AppBarTop /> */}
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Messenger") {
                  return <Ionicons name="ios-text" size={24} color={color} />;
                } else if (route.name === "Student's Schedule") {
                  return (
                    <Ionicons name="md-calendar" size={24} color={color} />
                  );
                } else if (route.name === "Login") {
                  return <Entypo name="login" size={24} color={color} />;
                }

                // You can return any component that you like here!
              },
            })}
            tabBarOptions={{
              activeTintColor: "#006494",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Login" component={LoginStackScreen} />
            <Tab.Screen name="Student's Schedule" component={HomeStackScreen} />
            <Tab.Screen name="Messenger" component={MessengerStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </ReduxProvider>
  );
}
