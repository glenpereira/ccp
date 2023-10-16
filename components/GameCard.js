import { View, StyleSheet, Text } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";

import Colors from "../constants/colors";
import SmallText from "./SmallText";
import SwitchToggle from "./SwitchToggle";



function GameCard({ children, data, id, playerId }) {
  

  
  

  

  useLayoutEffect(() => {
    console.log("value if fifa toggle: ", data)
  }, [])

  return (
    <View style={styles.gameContainer}>
      <View style={styles.textContainer}>
        <SmallText>{children}</SmallText>
      </View>
      <SmallText>{toggleValue.toString()}</SmallText>
      <SwitchToggle value={handleToggle} toggleValue={selectToggleData}></SwitchToggle>
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    margin: 40,
    borderColor: Colors.ccpBlue,
    borderWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  textContainer: {
    justifyContent: "center",
  },
  toggleContainer: {
    justifyContent: "flex-end",
  },
  text: {
    margin: 20,
    alignItems: "center",
  },
});

export default GameCard;
