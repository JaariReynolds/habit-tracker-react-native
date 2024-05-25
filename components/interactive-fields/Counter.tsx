import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

interface CounterProps {
  title: string;
  number: number;
  setNumber: (number: number) => void;
}

const Counter = ({ title, number, setNumber }: CounterProps) => {
  const handleSetNumber = (changedAmount: number) => {
    Keyboard.dismiss();
    var newNumber = number + changedAmount;
    setNumber(newNumber < 0 ? 0 : newNumber);
  };

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSetNumber(-5)}
        >
          <Text>--</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSetNumber(-1)}
        >
          <Text>-</Text>
        </TouchableOpacity>

        <Text style={styles.displayedNumber}>{number}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSetNumber(1)}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSetNumber(5)}
        >
          <Text>++</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  viewContainer: {
    alignSelf: "stretch",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    paddingBottom: 3,
    textAlign: "center",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 60,
    gap: 25,
    width: "100%",
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  displayedNumber: {
    width: 70,
    flexDirection: "column",
    textAlignVertical: "center",
    alignSelf: "stretch",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 2,
  },
});
