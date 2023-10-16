import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./screens/Home";
import Volunteer from "./screens/Volunteer";
import Admin from "./screens/Admin";
import Camera from "./screens/Camera";
import Gamer from "./screens/Gamer";
import Colors from "./constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: Colors.ccpBlue },
          headerTintColor: Colors.white,
          contentStyle: { backgroundColor: Colors.ccpLightBlue},
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Volunteer" component={Volunteer} />
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="Gamer" component={Gamer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
