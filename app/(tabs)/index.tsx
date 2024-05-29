import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FullPageView from "../../components/FullPageView";
import RouterPushButton from "../../components/buttons/RouterPushButton";
import { Habit } from "../../interfaces/habit";
import { useHabitContext } from "../../contexts/habitContext";
import FullHeightScrollView from "../../components/FullHeightScrollView";
import Header from "../../components/Header";
import HabitPreview from "../../components/HabitPreview";
import { useSwipe } from "../../hooks/useSwipe";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";

const numbers = [1, 2, 3, 4, 5];
const PAGE_WIDTH = Dimensions.get("window").width;

const Habits = () => {
  const { habits } = useHabitContext();
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight);
  const [date, setDate] = useState<Date>(new Date());

  const ref = React.useRef<ICarouselInstance>(null);

  function onSwipeLeft() {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  }

  function onSwipeRight() {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
    console.log("test");
  }

  function buttonPress() {
    ref.current!.prev();
  }

  const animationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-PAGE_WIDTH, 0, PAGE_WIDTH]
    );

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);

  return (
    <Carousel
      ref={ref}
      width={PAGE_WIDTH}
      style={{ flex: 1 }}
      data={numbers}
      customAnimation={animationStyle}
      enabled={false}
      renderItem={() => {
        return (
          <FullHeightScrollView
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Header title="habits" />
            <FullPageView>
              <Text>{date.toDateString()}</Text>
              <View>
                <Pressable
                  onPress={buttonPress}
                  style={{ height: 30, width: 40, backgroundColor: "blue" }}
                >
                  <Text>Next</Text>
                </Pressable>
              </View>
              <View style={styles.habitContainer}>
                {habits.map((habit, index) => (
                  <HabitPreview key={index} arrayIndex={index} habit={habit} />
                ))}
              </View>
              <RouterPushButton
                buttonText="New Habit :3"
                pageLink="./../NewHabit"
              />
            </FullPageView>
          </FullHeightScrollView>
        );
      }}
    />
  );
};

export default Habits;

const styles = StyleSheet.create({
  habitContainer: {
    alignSelf: "stretch",
    gap: 15,
  },
});
