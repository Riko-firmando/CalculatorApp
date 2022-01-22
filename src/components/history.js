import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  Text,
  Box,
  extendTheme,
  Button,
  Pressable,
  AlertDialog,
  Center,
  Icon,
  FlatList,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";

export default function History(props) {
  return (
    <AlertDialog
      leastDestructiveRef={props.cancelRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>History</AlertDialog.Header>
        <AlertDialog.Body>
          {/* {props.data.map((data, idx) => {
            return <Text key={idx}>{data}</Text>;
          })} */}
          <FlatList
            data={props.data}
            renderItem={({ item }) => (
              <Box style={style.history}>
                <Text>{item}</Text>
              </Box>
            )}
            keyExtractor={(item) => item}
          />
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button colorScheme="danger" onPress={props.delete}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

const style = StyleSheet.create({
  history: {
    alignItems: "center",
  },
});
