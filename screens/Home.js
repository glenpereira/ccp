import { View, StyleSheet, Text } from "react-native";

import CustomButton2 from "../components/CustomButton2";

function Home({ navigation }) {
  function adminButtonHandler() {
    console.log("pressed admin button");
    navigation.navigate("Admin", {
      isAdmin: true,
    });
  }

  function volunteerButtonHandler() {
    console.log("pressed volunteer button");
    navigation.navigate("Volunteer", {
      isAdmin: false,
    });
  }

  return (
    <View>
      {/* <Text>Hi!</Text> */}
      <CustomButton2 onPress={adminButtonHandler}>Admin</CustomButton2>
      {/* <CustomButton2 onPress={volunteerButtonHandler}>Volunteer</CustomButton2> */}
    </View>
  );
}

export default Home;
