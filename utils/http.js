import { db } from "../firebase/firebase_config";
import { doc, onSnapshot } from "firebase/firestore";

export async function getToggleData(id) {
  let toggleData = [];
  let toggleArray = [];
  const toggle = await onSnapshot(doc(db, "players", id), (doc) => {
    console.log("Current Data: ", doc.data());
    toggleData = Object.values(doc.data());
    console.log("toggle array: ", toggleArray);
    // toggleData = toggleArray.concat(toggleData);
    console.log("toggledata array: ", toggleData);
  });
  console.log(toggle);
  console.log("data in array = ", toggleData);
  return toggleData;
}
