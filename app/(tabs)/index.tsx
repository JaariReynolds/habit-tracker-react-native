import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import FullPageView from "../../components/FullPageView";
import RouterPushButton from "../../components/buttons/RouterPushButton";
import { useHabitContext } from "../../contexts/habitContext";
import FullHeightScrollView from "../../components/FullHeightScrollView";
import Header from "../../components/Header";
import HabitPreview from "../../components/HabitPreview";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";
import getHabitsOnDate from "../../logic/getHabitsOnDate";

const numbers = [1, 2, 3, 4, 5];
const PAGE_WIDTH = Dimensions.get("window").width;

const Habits = () => {
  const { habits, filteredHabits, setFilteredHabits, dateShown, setDateShown } =
    useHabitContext();
  const ref = React.useRef<ICarouselInstance>(null);

  // filter habits by dateOffset relative to the current dateShown, else reset back to today
  function filterHabits(dateOffset?: number) {
    var newDate: Date;
    if (dateOffset) {
      newDate = new Date(dateShown);
      newDate.setDate(newDate.getDate() + dateOffset);
    } else {
      newDate = new Date();
    }

    const filteredHabits = getHabitsOnDate(newDate, habits);
    setDateShown(newDate);
    setFilteredHabits(filteredHabits);
  }

  function buttonPressNext() {
    ref.current!.next();
    filterHabits(1);
  }

  function buttonPressCurrent() {
    ref.current!.next();
    filterHabits();
  }

  function buttonPressPrev() {
    ref.current!.prev();
    filterHabits(-1);
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
      enabled={false}
      customAnimation={animationStyle}
      renderItem={() => {
        return (
          <FullHeightScrollView>
            <Header title="habits" />
            <FullPageView>
              <Text>{dateShown.toDateString()}</Text>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <Pressable
                  onPress={buttonPressPrev}
                  style={{
                    height: 30,
                    width: 40,
                    backgroundColor: "Beige",
                  }}
                >
                  <Text>Prev</Text>
                </Pressable>
                <Pressable
                  onPress={buttonPressCurrent}
                  style={{
                    height: 30,
                    width: 50,
                    backgroundColor: "Coral",
                  }}
                >
                  <Text>Current</Text>
                </Pressable>
                <Pressable
                  onPress={buttonPressNext}
                  style={{
                    height: 30,
                    width: 40,
                    backgroundColor: "Beige",
                  }}
                >
                  <Text>Next</Text>
                </Pressable>
              </View>
              <View style={styles.habitContainer}>
                {filteredHabits.map((habit, index) => (
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
