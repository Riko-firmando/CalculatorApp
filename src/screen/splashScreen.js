import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Center, Text, Image, Box } from "native-base";
import { StackActions } from "@react-navigation/native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace("Calculator"));
    }, 3000);
  }, []);

  return (
    <Box style={style.container}>
      <Center flex={1} px="3">
        <Image
          size={150}
          resizeMode={"contain"}
          borderRadius={100}
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          alt="Alternate Text"
        />
        <Text style={{ fontFamily: "Inter_900Black", fontSize: 20 }}>
          Calculator App/.
        </Text>
      </Center>
    </Box>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#BDC3C7",
  },
});
