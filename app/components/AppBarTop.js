import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { testSelector } from "../store/selectors/testSelector";

const AppBarTop = ({ navigation }) => {
  const testText = useSelector(testSelector);

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <Appbar.Header style={styles.top}>
      <Appbar.Content title={"Student Essential"} subtitle="v1" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default AppBarTop;

const styles = StyleSheet.create({
  top: {
    backgroundColor: "#006494",
  },
});
