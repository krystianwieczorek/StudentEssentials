import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./app/store/store";
import { Text, AppRegistry } from "react-native";
import { registerRootComponent } from "expo";
import React from "react";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";

export const AppWrapper = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ReduxProvider>
  );
};
registerRootComponent(AppWrapper);
