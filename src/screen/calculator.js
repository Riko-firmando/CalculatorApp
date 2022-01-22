import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
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
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import History from "../components/history";

const buttons = [
  ["CLEAR", "DEL", "%"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "x"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

export default function Calculator() {
  // console.log(eval("8-2"));
  const [displayValue, setDisplayValue] = useState("0");
  const [nextValue, setNextValue] = useState(false);
  const [operator, setOperator] = useState("");
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [value, setValue] = useState(false);

  const [history, setHistory] = useState([]);
  const deleteHistory = () => {
    setHistory([]);
  };

  const handleInput = (input) => {
    switch (input) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        if (!value) {
          if (secondValue == "" || ".") {
            setDisplayValue(displayValue != "0" ? displayValue + input : input);
            if (!nextValue) {
              setFirstValue(displayValue != "0" ? displayValue + input : input);
            } else {
              if (secondValue == "0") {
                setSecondValue(input);
                setDisplayValue(
                  displayValue.substr(0, displayValue.length - 1) + input
                );
              } else {
                setSecondValue(
                  secondValue == "." ? "0" + input : secondValue + input
                );
              }
            }
          } else if (secondValue != "" && secondValue != ".") {
            setDisplayValue(input);
            setFirstValue(input);
            setOperator(operator);
            setSecondValue("");
          }
        } else {
          if (secondValue == "") {
            setDisplayValue(input);
            if (!nextValue) {
              setFirstValue(input);
            } else {
              setSecondValue(secondValue + input);
            }
          } else {
            // if(secondValue ==  )
            setDisplayValue(input);
            setFirstValue(input);
            setOperator(operator);
            setSecondValue("");
          }
          setValue(false);
        }
        break;
      case "+":
      case "-":
      case "x":
      case "/":
      case "%":
        if (firstValue == "") {
          setFirstValue("0");
        }
        if (secondValue == "") {
          setOperator(input == "x" ? "*" : input);
          setDisplayValue(
            nextValue == false
              ? displayValue + input
              : displayValue.substr(0, displayValue.length - 1) + input
          );
          setValue(false);
        } else {
          let result = eval(firstValue + operator + secondValue);
          setHistory([
            ...history,
            firstValue + operator + secondValue + "=" + result,
          ]);
          setDisplayValue(
            (result % 1 === 0 ? result : result.toFixed(3)) + input
          );
          setFirstValue(result % 1 === 0 ? result : result.toFixed(3));
          setOperator(input == "x" ? "*" : input);
          setSecondValue("");
          setValue(true);
        }
        setNextValue(true);
        break;
      case "=":
        if (firstValue != "" && operator != "" && secondValue == "") {
          setDisplayValue(firstValue);
          setNextValue(false);
          setOperator("");
          break;
        } else if (displayValue == "0" || value == true) {
          break;
        }
        let result = eval(firstValue + operator + secondValue);
        setHistory([
          ...history,
          firstValue + operator + secondValue + "=" + result,
        ]);
        if (result % 1 != 0) {
          var arrResult = result.toString().split(".");
        }
        setFirstValue(
          result % 1 === 0
            ? result
            : arrResult[1].length < 3
            ? result
            : result.toFixed(3)
        );
        setDisplayValue(
          !nextValue
            ? displayValue
            : secondValue == ""
            ? firstValue
            : result % 1 === 0
            ? result
            : arrResult[1].length < 3
            ? result
            : result.toFixed(3)
        );
        setSecondValue("");
        setOperator("");
        setValue(true);
        setNextValue(false);
        break;
      case "CLEAR":
        setDisplayValue("0");
        setNextValue(false);
        setValue(false);
        setOperator("");
        setFirstValue("");
        setSecondValue("");
        break;
      case ".":
        if (firstValue.toString().indexOf(".") == -1 && nextValue == false) {
          setDisplayValue(displayValue + input);
          if (!nextValue) {
            setFirstValue(firstValue == "" ? "0" + input : firstValue + input);
          } else {
            setSecondValue(
              secondValue == "" ? "0" + input : secondValue + input
            );
          }
        } else if (
          secondValue.toString().indexOf(".") == -1 &&
          nextValue == true &&
          operator != ""
        ) {
          if (secondValue == "") {
            setSecondValue("0" + input);
            setDisplayValue(displayValue + "0" + input);
          } else {
            setDisplayValue(displayValue + input);
            setSecondValue(secondValue + input);
          }
        }
        setValue(false);
        break;
      case "DEL":
        setDisplayValue(
          displayValue.length == 1
            ? "0"
            : displayValue.substr(0, displayValue.length - 1)
        );
        if (!nextValue) {
          setFirstValue(firstValue.substr(0, firstValue.length - 1));
        } else {
          secondValue == ""
            ? setOperator("")
            : setSecondValue(firstValue.substr(0, firstValue.length - 1));
        }
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  return (
    <Box style={style.container}>
      <Box style={style.historyContainer}>
        <TouchableOpacity
          style={style.historyBtn}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Icon
            as={FontAwesome}
            name="history"
            _dark={{
              color: "warmGray.50",
            }}
            style={style.icon}
          />
        </TouchableOpacity>
      </Box>
      <Box style={style.resultContainer}>
        <History
          isOpen={isOpen}
          onClose={onClose}
          cancelRef={cancelRef}
          data={history}
          delete={deleteHistory}
        />
        <Box bg="primary.800" style={style.result}>
          {/* {"nextValue : " + nextValue}
          {"value : " + value}
          {"first : " + firstValue}
          {"operator : " + operator}
          {"second : " + secondValue} */}
          {firstValue + operator + secondValue}
          <Text fontFamily="Inter_900Black," fontSize={50} color="#fff">
            {displayValue}
          </Text>
        </Box>
      </Box>
      <Box style={style.inputContainer}>
        {buttons.map((buttonRows, idx) => (
          <Box style={style.inputRow} key={idx}>
            {buttonRows.map((buttonitem, idx) => (
              <Pressable
                onPress={() => handleInput(buttonitem)}
                style={style.button}
                key={idx}
              >
                {({ isHovered, isFocused, isPressed }) => {
                  return (
                    <Box
                      bg={
                        buttonitem == "CLEAR" ||
                        buttonitem == "DEL" ||
                        buttonitem == "+" ||
                        buttonitem == "-" ||
                        buttonitem == "x" ||
                        buttonitem == "/" ||
                        buttonitem == "%"
                          ? isPressed
                            ? "primary.700"
                            : "primary.500"
                          : isPressed
                          ? "primary.700"
                          : "primary.600"
                      }
                      p={4}
                      rounded={15}
                      style={{
                        transform: [
                          {
                            scale: isPressed ? 0.93 : 1,
                          },
                        ],
                      }}
                    >
                      <Text color="#fff">{buttonitem}</Text>
                    </Box>
                  );
                }}
              </Pressable>
            ))}
            <br />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const style = StyleSheet.create({
  container: {
    minHeight: "90vh",
    padding: 6,
    backgroundColor: "#2C3E50",
  },
  resultContainer: {
    // height: "35vh",
    // flex: 4.5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    flexDirection: "row",
  },
  result: {
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    textAlign: "end",
    marginBottom: 20,
  },
  inputContainer: {
    // height: "65vh",
    // flex: 5.5,
  },
  inputRow: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    display: "block",
    alignItems: "center",
    textAlign: "center",
    margin: 2,
    marginBottom: 8,
    fontFamily: "BalsamiqSans_400Regular",
  },
  text: {
    color: "#fff",
  },
  historyContainer: {
    alignItems: "flex-end",
    marginBottom: 65,
    marginTop: 10,
  },
  historyBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    color: "#F39C12",
  },
});
