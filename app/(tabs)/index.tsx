import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import FullPageView from "../../components/FullPageView";
import RouterPushButton from "../../components/buttons/RouterPushButton";
import { useHabitContext } from "../../contexts/habitContext";
import FullHeightScrollView from "../../components/FullHeightScrollView";
import Header from "../../components/Header";
import HabitPreview from "../../components/HabitPreview";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";

const numbers = [1, 2, 3];
const PAGE_WIDTH = Dimensions.get("window").width;

const Habits = () => {
  const { habits, dateShown, handleSetDateShown } = useHabitContext();
  const ref = React.useRef<ICarouselInstance>(null);
  const lastPressRef = useRef<"prev" | "next" | "current">("current");

  function buttonPressNext() {
    ref.current!.next();
    lastPressRef.current = "next";
    handleSetDateShown(1);
  }

  function buttonPressCurrent() {
    switch (lastPressRef.current) {
      case "next":
        ref.current!.prev();
        break;
      case "prev":
        ref.current!.next();
        break;
      case "current": // do nothing if already on current
        return;
    }
    lastPressRef.current = "current";
    handleSetDateShown(0);
  }

  function buttonPressPrev() {
    ref.current!.prev();
    lastPressRef.current = "prev";
    handleSetDateShown(-1);
  }

  return (
    <Carousel
      ref={ref}
      width={PAGE_WIDTH}
      style={{ flex: 1 }}
      data={numbers}
      enabled={false}
      scrollAnimationDuration={800}
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
                {habits.map((habit, index) => (
                  <HabitPreview key={index} habit={habit} />
                ))}
              </View>
              <RouterPushButton buttonText="New Habit :3" pageLink="./../NewHabit" />
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
