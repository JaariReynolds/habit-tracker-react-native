import { Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Habit } from "../interfaces/habit";
import { useHabitContext } from "../contexts/habitContext";
import { router } from "expo-router";
import SubmissionModal from "./interactive-fields/SubmissionModal";
import { useModalVisibility } from "../hooks/useModalVisibility";
import handleHabitSubmission from "../logic/habitCRUD/handleHabitSubmission";
import Animated from "react-native-reanimated";
import { robotoFonts } from "../styles/base-styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useHeightAnimation } from "../hooks/animations/useHeightAnimation";
import { useOpacityAnimation } from "../hooks/animations/useOpacityAnimation";
import { constants } from "../styles/constants";

interface HabitPreviewProps {
  habit: Habit;
  arrayIndex: number;
}

const HabitPreview = ({ habit, arrayIndex }: HabitPreviewProps) => {
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
      <HabitCard habit={habit} arrayIndex={arrayIndex} setModalVisibility={setModalVisibility} />
    </View>
  );
};

const MIN_HEIGHT = 80;
const MAX_HEIGHT = 170;

const HabitCard = ({
  habit,
  arrayIndex,
  setModalVisibility,
}: {
  habit: Habit;
  arrayIndex: number;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { openedHabit, setOpenedHabit } = useHabitContext();
  const { animatedHeight, handleOpen, handleClose } = useHeightAnimation(MIN_HEIGHT, MAX_HEIGHT);
  const { animatedOpacity, animateIn, animateOut } = useOpacityAnimation(0, 1, 200);

  useEffect(() => {
    if (openedHabit !== arrayIndex) {
      handleClose();
      animateOut();
    }
  }, [openedHabit]);

  const handlePress = () => {
    const newOpenedHabit = openedHabit === arrayIndex ? -1 : arrayIndex;
    setOpenedHabit(newOpenedHabit);

    if (newOpenedHabit === arrayIndex) {
      handleOpen();
      animateIn();
    } else {
      handleClose();
      animateOut();
    }
  };

  return (
    <Animated.View style={[{ width: "100%", borderRadius: 5, overflow: "hidden" }, animatedHeight]}>
      <Pressable
        onPress={handlePress}
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

        <Animated.View
          style={[
            {
              height: MAX_HEIGHT - MIN_HEIGHT,
              flexDirection: "row",
              borderTopColor: "black",
              borderTopWidth: 1,
            },
            animatedOpacity,
          ]}
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
              Edit <FontAwesomeIcon icon={faPen} size={constants.iconSize} />
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default HabitPreview;
