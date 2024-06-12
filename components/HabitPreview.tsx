import { Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Habit } from "../interfaces/habit";
import { useHabitContext } from "../contexts/habitContext";
import { router } from "expo-router";
import SubmissionModal from "./interactive-fields/SubmissionModal";
import { useModalVisibility } from "../hooks/useModalVisibility";
import handleHabitSubmission from "../logic/habitCRUD/handleHabitSubmission";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";
import { robotoFonts } from "../styles/base-styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useHeightAnimation } from "../hooks/useHeightAnimation";

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

const MIN_HEIGHT = 70;
const MAX_HEIGHT = 160;

interface HabitCardProps {
  habit: Habit;
  modalVisibility: boolean;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const HabitCard = ({ habit, setModalVisibility }: HabitCardProps) => {
  const { openedHabit, setOpenedHabit } = useHabitContext();
  const { animatedHeight, handleOpen, handleClose } = useHeightAnimation(MIN_HEIGHT, MAX_HEIGHT);

  useEffect(() => {
    if (habit.id !== openedHabit) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [openedHabit]);

  const handlePress = () => {
    const newOpenedHabit = habit.id === openedHabit ? "" : habit.id;
    setOpenedHabit(newOpenedHabit);

    if (habit.id === newOpenedHabit) handleOpen();
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
        <Text
          style={[
            robotoFonts.regular,
            { height: MIN_HEIGHT, textAlignVertical: "center", paddingLeft: 10 },
          ]}
        >
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
            <Text style={robotoFonts.bold}>Submit</Text>
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
            <Text style={robotoFonts.light}>
              Edit <FontAwesomeIcon icon={faPen} />
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default HabitPreview;
