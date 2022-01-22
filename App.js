// import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import {
  NativeBaseProvider,
  Text,
  Box,
  extendTheme,
  Button,
  Pressable,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Orbitron_400Regular } from "@expo-google-fonts/orbitron";
import { BalsamiqSans_400Regular } from "@expo-google-fonts/balsamiq-sans";
import AppLoading from "expo-app-loading";
import Calculator from "./src/screen/calculator";
import SplashScreen from "./src/screen/splashScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Orbitron_400Regular,
    BalsamiqSans_400Regular,
  });

  const theme = extendTheme({
    // Add new color
    primary: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E",
    },
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: "#d97706",
    },
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SplashCreen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Calculator"
              component={Calculator}
              options={{
                title: "Calculator",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#2C3E50",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
}
