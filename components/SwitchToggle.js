import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

import Colors from "../constants/colors";
import SmallText from "./SmallText";

const SwitchToggle = ({ value, toggleValue }) => {
  const [isEnabled, setIsEnabled] = useState(toggleValue);
  const [isLoading, setIsLoading] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    value((previousState) => !previousState);
    console.log("in toggle: ", toggleValue);
    setIsLoading(false);
  };

  if (isLoading) {
    <View>
      <SmallText>Loading.</SmallText>
    </View>;
  }

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "flex-end",
    // justifyContent: "center"
  },
});

export default SwitchToggle;
