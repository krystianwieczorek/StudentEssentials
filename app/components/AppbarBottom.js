import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { testAction } from "../store/actions/testAction";
import { useDispatch } from "react-redux";

const AppbarBottom = () => {
  const dispatch = useDispatch();

  return (
    <Appbar style={styles.bottom}>
      <Appbar.Action
        style={styles.appBarIcons}
        icon="message-bulleted"
        onPress={() => dispatch(testAction("Messenger"))}
      />
      <Appbar.Action
        style={styles.appBarIcons}
        icon="calendar-month-outline"
        onPress={() => dispatch(testAction("Schedule"))}
      />
      <Appbar.Action
        style={styles.appBarIcons}
        icon="file-upload"
        onPress={() => dispatch(testAction("Files"))}
      />
    </Appbar>
  );
};

export default AppbarBottom;

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  appBarIcons: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});
