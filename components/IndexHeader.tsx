import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useHabitContext } from "../contexts/habitContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { robotoFonts } from "../styles/base-styles";
import Animated from "react-native-reanimated";
import useTranslateReturnAnimation from "../hooks/animations/useTranslateReturnAnimation";
import { useFontSizePulseAnimation } from "../hooks/animations/useFontSizePulseAnimation";
import { colours, constants } from "../styles/constants";

const IndexHeader = () => {
  const { formattedDateArray, handleSetDateShown } = useHabitContext();
  const { animatedTranslation: leftAnimationStyle, handleAnimation: handleLeftAnimation } =
    useTranslateReturnAnimation(7, 75, "X");
  const { animatedTranslation: rightAnimationStyle, handleAnimation: handleRightAnimation } =
    useTranslateReturnAnimation(7, 75, "X");
  const { animatedFontSize, handleAnimation: handleFontPulse } = useFontSizePulseAnimation(
    constants.headerFontSize
  );

  function buttonPressNext() {
    handleRightAnimation();
    handleFontPulse();
    handleSetDateShown(1);
  }

  function buttonPressCurrent() {
    handleFontPulse();
    handleSetDateShown(0);
  }

  function buttonPressPrev() {
    handleLeftAnimation();
    handleFontPulse();
    handleSetDateShown(-1);
  }

  return (
    <View>
      <View style={styles.container}>
        <Animated.View style={[leftAnimationStyle, { justifyContent: "center", width: "20%" }]}>
          <TouchableOpacity onPressIn={buttonPressPrev} style={styles.button}>
            <FontAwesomeIcon icon={faChevronLeft} size={30} />
          </TouchableOpacity>
        </Animated.View>
        <Pressable onPressIn={buttonPressCurrent} style={[styles.button, { width: "60%" }]}>
          <Animated.Text
            style={[
              robotoFonts.regular,
              animatedFontSize,
              { flexWrap: "wrap", textAlign: "center" },
            ]}
          >
            {formattedDateArray[0]}
            {"\n"}
            {formattedDateArray[1]}
          </Animated.Text>
        </Pressable>
        <Animated.View style={[rightAnimationStyle, { justifyContent: "center", width: "20%" }]}>
          <TouchableOpacity onPressIn={buttonPressNext} style={styles.button}>
            <FontAwesomeIcon icon={faChevronRight} size={30} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default IndexHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colours.primary,
    height: constants.headerHeight,
    elevation: constants.headerElevation,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 25,
  },
});
