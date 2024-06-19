import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { constants } from "../../styles/constants";
import { robotoFonts } from "../../styles/base-styles";

interface SubmitButtonProps {
  title: string;
  handleSubmit: () => void;
}

export default function HabitSubmitButton({ title, handleSubmit }: SubmitButtonProps) {
  return (
    <TouchableOpacity style={styles.backButton} onPress={handleSubmit}>
      <Text style={robotoFonts.regular}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: constants.buttonHeight,
    borderRadius: constants.componentBorderRadius,
    flexShrink: 1,
    flexBasis: 0,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
});
