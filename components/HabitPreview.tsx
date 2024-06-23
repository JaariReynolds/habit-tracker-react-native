import { Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Habit } from "../interfaces/habit";
import { useHabitContext } from "../contexts/habitContext";
import { router } from "expo-router";
import { useModalVisibility } from "../hooks/useModalVisibility";
import handleHabitSubmission from "../logic/habitCRUD/handleHabitSubmission";
import Animated from "react-native-reanimated";
import { robotoFonts } from "../styles/base-styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faCircleCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useHeightAnimation } from "../hooks/animations/useHeightAnimation";
import { useOpacityAnimation } from "../hooks/animations/useOpacityAnimation";
import { colours, constants } from "../styles/constants";
import { getNextSubmissionDate } from "../logic/getHabitsOnDate";
import getHabitStreak from "../logic/reportLogic/getHabitStreak";
import { getHabitCompletionOnDay } from "../logic/reportLogic/getHabitCompletion";
import CustomModal from "./interactive-fields/CustomModal";

interface HabitPreviewProps {
  habit: Habit;
  arrayIndex: number;
}

const HabitPreview = ({ habit, arrayIndex }: HabitPreviewProps) => {
  const { habits, setHabits, dateShown } = useHabitContext();
  const { modalVisibility, setModalVisibility } = useModalVisibility();

  return (
    <View>
      <CustomModal
        modalText={"submission for " + habit.habitName}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        leftButton={{
          JSXElement: <FontAwesomeIcon icon={faCheck} size={constants.iconSize} />,
          action: () => setHabits(handleHabitSubmission(habit.id, 1, dateShown, habits)),
          backgroundColour: colours.primary,
        }}
        rightButton={{
          JSXElement: <FontAwesomeIcon icon={faXmark} size={constants.iconSize} />,
          action: () => setHabits(handleHabitSubmission(habit.id, 0, dateShown, habits)),
          backgroundColour: colours.primary,
        }}
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
  const { dateShown, openedHabit, setOpenedHabit } = useHabitContext();
  const { animatedHeight, handleOpen, handleClose } = useHeightAnimation(MIN_HEIGHT, MAX_HEIGHT);
  const { animatedOpacity, animateIn, animateOut } = useOpacityAnimation(0, 1, 200);
  const [nextDueFormatted, setNextDueFormatted] = useState<string[]>([]);
  const [completion, setCompletion] = useState<number>(0);

  useEffect(() => {
    if (openedHabit !== arrayIndex) {
      handleClose();
      animateOut();
    }
  }, [openedHabit]);

  useEffect(() => {}, [habit.submissions]);

  useEffect(() => {
    setCompletion(getHabitCompletionOnDay(habit, dateShown));

    setNextDueFormatted(
      getNextSubmissionDate(habit, dateShown, "Forwards")
        .toLocaleDateString("en-GB", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
        .split(", ")
    );
  }, [dateShown, habit.submissions]);

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
    <Animated.View
      style={[
        {
          width: "100%",
          borderRadius: constants.componentBorderRadius,
          overflow: "hidden",
          elevation: constants.elevation,
        },
        animatedHeight,
      ]}
    >
      <Pressable
        onPress={handlePress}
        style={{
          height: "100%",
          backgroundColor: habit.isOnDateShown ? colours.activeHabitPreview : colours.neutralGrey,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: MIN_HEIGHT,
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={robotoFonts.regular}>{habit.habitName}</Text>
          <Text style={robotoFonts.regular}></Text>
          {completion === 1 ? <FontAwesomeIcon icon={faCircleCheck} /> : ""}
        </View>

        <Animated.View
          style={[
            {
              height: MAX_HEIGHT - MIN_HEIGHT,
              flexDirection: "row",
              borderTopColor: colours.border,
              borderTopWidth: 1,
            },
            animatedOpacity,
          ]}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              minWidth: "65%",
              borderRightColor: colours.border,
              borderRightWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={habit.isOnDateShown ? () => setModalVisibility(true) : undefined}
          >
            {habit.isOnDateShown ? (
              <Text style={robotoFonts.regular}>Submit</Text>
            ) : (
              <Text style={robotoFonts.regular}>{nextDueFormatted[1]}</Text>
            )}
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
