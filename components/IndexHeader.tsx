import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { useHabitContext } from "../contexts/habitContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { robotoFonts } from "../styles/base-styles";
import Animated from "react-native-reanimated";
import useTranslateReturnAnimation from "../hooks/animations/useTranslateAnimation";
import { useFontSizePulseAnimation } from "../hooks/animations/useFontSizePulseAnimation";
import { constants } from "../styles/constants";

const IndexHeader = () => {
  const { formattedDateArray, handleSetDateShown } = useHabitContext();
  const lastPressRef = useRef<"prev" | "next" | "current">("current");
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
    lastPressRef.current = "current";
    handleFontPulse();
    handleSetDateShown(0);
  }

  function buttonPressPrev() {
    handleLeftAnimation();
    handleFontPulse();
    handleSetDateShown(-1);
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[leftAnimationStyle, { justifyContent: "center", width: "20%" }]}>
        <TouchableOpacity onPressIn={buttonPressPrev} style={styles.button}>
          <FontAwesomeIcon icon={faChevronLeft} size={30} />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPressIn={buttonPressCurrent} style={[styles.button, { width: "60%" }]}>
        <Animated.Text
          style={[robotoFonts.regular, animatedFontSize, { flexWrap: "wrap", textAlign: "center" }]}
        >
          {formattedDateArray[0]}
          {"\n"}
          {formattedDateArray[1]}
        </Animated.Text>
      </TouchableOpacity>
      <Animated.View style={[rightAnimationStyle, { justifyContent: "center", width: "20%" }]}>
        <TouchableOpacity onPressIn={buttonPressNext} style={styles.button}>
          <FontAwesomeIcon icon={faChevronRight} size={30} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default IndexHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "orange",
    height: constants.headerHeight,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 25,
  },
});
