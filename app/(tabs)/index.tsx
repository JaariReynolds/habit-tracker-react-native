import { View } from "react-native";
import React from "react";
import FullPageView from "../../components/FullPageView";
import RouterPushButton from "../../components/buttons/RouterPushButton";
import { useHabitContext } from "../../contexts/habitContext";
import FullHeightScrollView from "../../components/FullHeightScrollView";
import HabitPreview from "../../components/HabitPreview";
import IndexHeader from "../../components/IndexHeader";
import CompletionBar from "../../components/CompletionBar";

const Habits = () => {
  const { habits } = useHabitContext();

  return (
    <>
      <IndexHeader />
      <FullHeightScrollView>
        <FullPageView>
          {habits.length > 0 && <CompletionBar />}

          <View style={{ alignSelf: "stretch", gap: 15 }}>
            {habits.map((habit, index) => {
              return <HabitPreview key={index} arrayIndex={index} habit={habit} />;
            })}
          </View>
          <RouterPushButton buttonLabel="+" pageLink="./../NewHabit" />
        </FullPageView>
      </FullHeightScrollView>
    </>
  );
};

export default Habits;
