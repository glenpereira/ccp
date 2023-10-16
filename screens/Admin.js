import { View, StyleSheet, Text, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import CustomButton2 from "../components/CustomButton2";
import SmallText from "../components/SmallText";
import Colors from "../constants/colors";
import IncrementButton from "../components/IncrementButton";

import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase/firebase_config";

const addIcon = require("../assets/addBlue.png");
const subtractIcon = require("../assets/subtractBlue.png");

function Admin({ route, navigation }) {
  const isAdmin = route.params.isAdmin;
  const [playerId, setPlayerId] = useState("None");
  const [csgoCount, setCsgoCount] = useState("");
  const [crabCount, setCrabCount] = useState("");
  const [compCount, setCompCount] = useState("");
  const [fifaCount, setFifaCount] = useState("");
  const [audience, setAudience] = useState({});

  function cameraButtonHandler() {
    console.log("pressed camera button");
    navigation.navigate("Camera", {
      isAdmin: isAdmin,
    });
  }

  useEffect(() => {
    const numAudience = onSnapshot(doc(db, "funzone", "stats"), (doc) => {
      // console.log("Current data: ", doc.data());
      setAudience(doc.data());
      // setIsLoading(false);
    });
    // console.log("data in state: ", audience);
    console.log("fifa: ", audience.audience);
    if (audience === undefined) {
      this.forceUpdate();
    }
  }, []);

  async function addAudienceMember() {
    const statRef = doc(db, "funzone", "stats");
    await updateDoc(statRef, {
      audience: increment(1),
    });
    const newObj = audience;
    newObj.audience = audience.audience + 1;
    setAudience(newObj);
  }

  async function subtractAudienceMember() {
    const statRef = doc(db, "funzone", "stats");
    await updateDoc(statRef, {
      audience: increment(-1),
    });
    const newObj = audience;
    newObj.audience = audience.audience - 1;
    setAudience(newObj);
  }

  async function getCsgoStats() {
    const playerRef = collection(db, "players");
    const q = query(playerRef, where("csgo", "==", "Yes"));
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      array.push(doc.data());
    });
    console.log("pushed array: ", array);
    console.log("pushed array length", array.length);
    setCsgoCount(array.length);
  }

  async function getCrabStats() {
    const playerRef = collection(db, "players");
    const q = query(playerRef, where("crab", "==", "Yes"));
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      array.push(doc.data());
    });
    console.log("pushed array: ", array);
    console.log("pushed array length", array.length);
    setCrabCount(array.length);
  }

  async function getFifaStats() {
    const playerRef = collection(db, "players");
    const q = query(playerRef, where("fifa", "==", "Yes"));
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      array.push(doc.data());
    });
    console.log("pushed array: ", array);
    console.log("pushed array length", array.length);
    setFifaCount(array.length);
  }

  async function getCompStats() {
    const playerRef = collection(db, "players");
    const q = query(playerRef, where("comp", "==", "Yes"));
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      array.push(doc.data());
    });
    console.log("pushed array: ", array);
    console.log("pushed array length", array.length);
    setCompCount(array.length);
  }

  useFocusEffect(
    useCallback(() => {
      getCsgoStats();
      getCrabStats();
      getCompStats();
      getFifaStats();
    }, [csgoCount, crabCount, compCount, fifaCount, audience])
  );

  return (
    <View>
      <CustomButton2 onPress={cameraButtonHandler}>Open Camera</CustomButton2>

      <View style={styles.gameContainer}>
        <View style={styles.textContainer}>
          <SmallText>Audience: </SmallText>
        </View>
        {audience && audience.audience ? (
          <SmallText>{audience.audience}</SmallText>
        ) : (
          <SmallText>Not loaded</SmallText>
        )}
        <IncrementButton
          onPress={addAudienceMember}
          icon={addIcon}
        ></IncrementButton>
        <IncrementButton
          onPress={subtractAudienceMember}
          icon={subtractIcon}
        ></IncrementButton>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.text}>
          <SmallText>No. of CSGO Players:   {csgoCount}/8   (Max 16)</SmallText>
        </View>
        <View style={styles.text}>
          <SmallText>
            No. of Crab Game Players:   {crabCount}/8   (Max 16)
          </SmallText>
        </View>
        <View style={styles.text}>
          <SmallText>No. of FIFA 23 Players:  {fifaCount}/2    (Max 6)</SmallText>
        </View>
        <View style={styles.text}>
          <SmallText>
            No. of Competition Players:   {compCount}/5   (Max 10)
          </SmallText>
        </View>
        <View style={styles.text}>
          <SmallText>No. of Audience:   {audience.audience}/5   (Max 10)</SmallText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 20,
    justifyContent: "center",
  },
  gameContainer: {
    margin: 20,
    borderColor: Colors.ccpBlue,
    borderWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  text: {
    marginVertical: 10,
  },
});

export default Admin;
