import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { useHabitContext } from "../contexts/habitContext";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { robotoFonts } from "../styles/base-styles";
import Animated from "react-native-reanimated";
import useTranslateReturnAnimation from "../hooks/animations/useTranslateAnimation";

interface IndexHeaderProps {
  carouselRef: React.RefObject<ICarouselInstance>;
}

const IndexHeader = ({ carouselRef }: IndexHeaderProps) => {
  const { dateShown, handleSetDateShown } = useHabitContext();
  const lastPressRef = useRef<"prev" | "next" | "current">("current");
  const { animatedTranslation: leftAnimationStyle, handleAnimation: handleLeftAnimation } =
    useTranslateReturnAnimation(7, 75, "X");
  const { animatedTranslation: rightAnimationStyle, handleAnimation: handleRightAnimation } =
    useTranslateReturnAnimation(7, 75, "X");

  function buttonPressNext() {
    handleRightAnimation();
    handleSetDateShown(1);
  }

  function buttonPressCurrent() {
    lastPressRef.current = "current";
    handleSetDateShown(0);
  }

  function buttonPressPrev() {
    handleLeftAnimation();
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
        <Text style={[robotoFonts.regular, { flexWrap: "wrap", textAlign: "center" }]}>
          {dateShown.toLocaleDateString("en-GB", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
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
    height: 65,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 25,
  },
});
