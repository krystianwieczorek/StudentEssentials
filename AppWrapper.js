import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./app/store/store";
import { Text, AppRegistry } from "react-native";
import { registerRootComponent } from "expo";
import React from "react";
import App from "./App";

export const AppWrapper = () => {
  return (
    <ReduxProvider store={configureStore}>
      <App />
    </ReduxProvider>
  );
};
registerRootComponent(AppWrapper);
