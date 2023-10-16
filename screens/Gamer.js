import { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Text, DevSettings, Switch } from "react-native";

import SmallText from "../components/SmallText";
import SwitchToggle from "../components/SwitchToggle";
import Colors from "../constants/colors";
import GameCard from "../components/GameCard";
import CustomButton2 from "../components/CustomButton2";
import { getToggleData } from "../utils/http";
import CustomButton1 from "../components/CustomButton1";

import { db } from "../firebase/firebase_config";
import { doc, onSnapshot, setDoc, updateDoc, increment } from "firebase/firestore";

function Gamer({ route, navigation }) {
  const playerId = route.params.gamerId;
  const isAdmin = route.params.isAdmin;

  const [toggleValue, setToggleValue] = useState(false);
  const [playerData, setPlayerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const toggle = onSnapshot(doc(db, "players", playerId), (doc) => {
      console.log("Current data: ", doc.data());
      setPlayerData(doc.data());
      setIsLoading(false);
    });
    console.log("data in state: ", playerData);
    console.log("fifa: ", playerData.fifa);
    if (playerData === undefined) {
      this.forceUpdate();
    }
  }, []);

  function acceptButtonHandler() {
    navigation.navigate("Admin", {
      isAdmin: isAdmin,
    });
    console.log("Data in state: ", playerData);
  }

  async function changeGameText0() {
    if (playerData["crab"] === "Yes") {
      const newObj = playerData;
      newObj.crab = "No";
      setPlayerData(newObj);
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        crab: "No",
      });
    } else {
      const newObj = playerData;
      newObj.crab = "Yes";
      setPlayerData(newObj);
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        crab: "Yes",
      });
      const statRef = doc(db, "funzone", "stats")
      await updateDoc(statRef, {
        numCrabPlayed: increment(1),
        numGamesPlayed: increment(1)
      })
    }
  }

  async function changeGameText1() {
    if (playerData["csgo"] === "Yes") {
      const newObj = playerData;
      newObj.csgo = "No";
      setPlayerData(newObj);
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        csgo: "No",
      });
    } else {
      const newObj = playerData;
      newObj.csgo = "Yes";
      setPlayerData(newObj);
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        csgo: "Yes",
      });
      const statRef = doc(db, "funzone", "stats")
      await updateDoc(statRef, {
        numCsgoPlayed: increment(1),
        numGamesPlayed: increment(1)
      })
    }
  }

  async function changeGameText2() {
    if (playerData["fifa"] === "Yes") {
      const newObj = playerData;
      newObj.fifa = "No";
      setPlayerData(newObj);
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        fifa: "No",
      });
    } else {
      const newObj = playerData;
      newObj.fifa = "Yes";
      setPlayerData(newObj);
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        fifa: "Yes",
      });
      const statRef = doc(db, "funzone", "stats")
      await updateDoc(statRef, {
        numFifaPlayed: increment(1),
        numGamesPlayed: increment(1)
      })
    }
  }

  async function changeGameText3() {
    if (playerData["comp"] === "Yes") {
      const newObj = playerData;
      newObj.comp = "No";
      setPlayerData(newObj);
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        comp: "No",
      });
    } else {
      const newObj = playerData;
      newObj.comp = "Yes";
      setPlayerData(newObj);
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        comp: "Yes",
      });
      const statRef = doc(db, "funzone", "stats")
      await updateDoc(statRef, {
        numCompPlayed: increment(1),
        numGamesPlayed: increment(1)
      })
    }
  }

  function buttonPressHandler() {
    console.log("pressed");
  }

  if (isLoading) {
    <View>
      <SmallText>Loading.</SmallText>
    </View>;
  }

  if (playerData === undefined) {
    <View>
      <SmallText>still loading.</SmallText>
    </View>;
  }

  return (
    <View>
      <View style={styles.text}>
        <Text>Gamer ID: {playerId}</Text>
      </View>

      <View style={styles.gameContainer}>
        <View style={styles.textContainer}>
          <SmallText>Squid Game: </SmallText>
        </View>
        {playerData && playerData.crab ? (
          <SmallText>{playerData.crab}</SmallText>
        ) : (
          <SmallText>Not loaded</SmallText>
        )}
        <CustomButton1 onPress={changeGameText0}>Change</CustomButton1>
      </View>

      <View style={styles.gameContainer}>
        <View style={styles.textContainer}>
          <SmallText>CSGO: </SmallText>
        </View>
        {playerData && playerData.csgo ? (
          <SmallText>{playerData.csgo}</SmallText>
        ) : (
          <SmallText>Not loaded</SmallText>
        )}
        <CustomButton1 onPress={changeGameText1}>Change</CustomButton1>
      </View>

      <View style={styles.gameContainer}>
        <View style={styles.textContainer}>
          <SmallText>FIFA 23: </SmallText>
        </View>
        {playerData && playerData.fifa ? (
          <SmallText>{playerData.fifa}</SmallText>
        ) : (
          <SmallText>Not loaded</SmallText>
        )}
        <CustomButton1 onPress={changeGameText2}>Change</CustomButton1>
      </View>

      <View style={styles.gameContainer}>
        <View style={styles.textContainer}>
          <SmallText>Competitions: </SmallText>
        </View>
        {playerData && playerData.comp ? (
          <SmallText>{playerData.comp}</SmallText>
        ) : (
          <SmallText>Not loaded</SmallText>
        )}
        <CustomButton1 onPress={changeGameText3}>Change</CustomButton1>
      </View>

      <CustomButton2 onPress={acceptButtonHandler}>Accept</CustomButton2>
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    margin: 10,
    marginHorizontal: 20,
    borderColor: Colors.ccpBlue,
    borderWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
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

export default Gamer;
