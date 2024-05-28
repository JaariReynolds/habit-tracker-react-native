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

const numbers = [1, 2, 3, 4, 5];

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

  return (
    <FullHeightScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Carousel
        ref={ref}
        width={Dimensions.get("window").width}
        style={{ flex: 1 }}
        data={numbers}
        renderItem={() => {
          return (
            <>
              <Header title="habits" />
              <FullPageView>
                <Text>{date.toDateString()}</Text>
                <View style={styles.habitContainer}>
                  {habits.map((habit, index) => (
                    <HabitPreview
                      key={index}
                      arrayIndex={index}
                      habit={habit}
                    />
                  ))}
                </View>
                <RouterPushButton
                  buttonText="New Habit :3"
                  pageLink="./../NewHabit"
                />
              </FullPageView>
            </>
          );
        }}
      />
    </FullHeightScrollView>
  );
};

export default Habits;

const styles = StyleSheet.create({
  habitContainer: {
    alignSelf: "stretch",
    gap: 15,
  },
});
