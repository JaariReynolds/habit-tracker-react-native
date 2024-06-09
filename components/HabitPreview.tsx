import { Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Habit } from "../interfaces/habit";
import { useHabitContext } from "../contexts/habitContext";
import { router } from "expo-router";
import SubmissionModal from "./interactive-fields/SubmissionModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useModalVisibility } from "../hooks/useModalVisibility";
import handleHabitSubmission from "../logic/habitCRUD/handleHabitSubmission";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";

interface HabitPreviewProps {
  habit: Habit;
}

const HabitPreview = ({ habit }: HabitPreviewProps) => {
  const { habits, setHabits, dateShown } = useHabitContext();
  const { modalVisibility, setModalVisibility } = useModalVisibility();

  return (
    <View>
      <SubmissionModal
        modalText={"submission for " + habit.habitName}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        leftButtonAction={() => setHabits(handleHabitSubmission(habit.id, 1, dateShown, habits))}
        rightButtonAction={() => setHabits(handleHabitSubmission(habit.id, 0, dateShown, habits))}
      />
      <HabitCard
        habit={habit}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      />
    </View>
  );
};

const habitPreviewSpringConfig: SpringConfig = {
  stiffness: 400,
  damping: 25,
};

const MIN_HEIGHT = 70;
const MAX_HEIGHT = 160;

interface HabitCardProps {
  habit: Habit;
  modalVisibility: boolean;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const HabitCard = ({ habit, setModalVisibility }: HabitCardProps) => {
  const { openedHabit, setOpenedHabit } = useHabitContext();
  const height = useSharedValue(MIN_HEIGHT);
  const animatedHeight = useAnimatedStyle(() => ({ height: height.value }));

  useEffect(() => {
    if (habit.id !== openedHabit) {
      height.value = withSpring(MIN_HEIGHT, habitPreviewSpringConfig);
    } else height.value = withSpring(MAX_HEIGHT, habitPreviewSpringConfig);
  }, [openedHabit]);

  const handlePress = () => {
    const newOpenedHabit = habit.id === openedHabit ? "" : habit.id;
    setOpenedHabit((prev) => (prev === habit.id ? "" : habit.id));
    if (habit.id === newOpenedHabit)
      height.value = withSpring(MAX_HEIGHT, habitPreviewSpringConfig);
  };

  return (
    <Animated.View style={[{ width: "100%", borderRadius: 5, overflow: "hidden" }, animatedHeight]}>
      <Pressable
        onPressIn={handlePress}
        style={{
          height: "100%",
          backgroundColor: "grey",
        }}
      >
        <Text style={{ height: MIN_HEIGHT, textAlignVertical: "center", paddingLeft: 10 }}>
          {habit.habitName}
        </Text>
        <View
          style={{
            height: MAX_HEIGHT - MIN_HEIGHT,
            flexDirection: "row",
            borderTopColor: "black",
            borderTopWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              flexGrow: 2,
              borderRightColor: "black",
              borderRightWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setModalVisibility(true)}
          >
            <Text>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: "100%",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.push("./EditHabit")}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default HabitPreview;
