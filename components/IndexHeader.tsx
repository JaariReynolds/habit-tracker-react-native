import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { useHabitContext } from "../contexts/habitContext";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { robotoFonts } from "../styles/base-styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface IndexHeaderProps {
  carouselRef: React.RefObject<ICarouselInstance>;
}

const IndexHeader = ({ carouselRef }: IndexHeaderProps) => {
  const { dateShown, handleSetDateShown } = useHabitContext();

  const lastPressRef = useRef<"prev" | "next" | "current">("current");

  const translationLeft = useSharedValue(0);
  const animatedTranslationLeft = useAnimatedStyle(() => ({
    transform: [{ translateX: translationLeft.value }],
  }));

  const translationRight = useSharedValue(0);
  const animatedTranslationRight = useAnimatedStyle(() => ({
    transform: [{ translateX: translationRight.value }],
  }));

  function buttonPressNext() {
    translationRight.value = withSequence(
      withTiming(7, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );

    carouselRef.current!.next();
    lastPressRef.current = "next";
    handleSetDateShown(1);
  }

  function buttonPressCurrent() {
    switch (lastPressRef.current) {
      case "next":
        carouselRef.current!.prev();
        break;
      case "prev":
        carouselRef.current!.next();
        break;
      case "current":
        return;
    }
    lastPressRef.current = "current";
    handleSetDateShown(0);
  }

  function buttonPressPrev() {
    translationLeft.value = withSequence(
      withTiming(-7, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );

    carouselRef.current!.prev();
    lastPressRef.current = "prev";
    handleSetDateShown(-1);
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedTranslationLeft, { justifyContent: "center", width: "20%" }]}>
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
      <Animated.View style={[animatedTranslationRight, { justifyContent: "center", width: "20%" }]}>
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
    // borderColor: "black",
    // borderWidth: 1,
  },
});
