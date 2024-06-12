import { View } from "react-native";
import React from "react";
import FullPageView from "../../components/FullPageView";
import RouterPushButton from "../../components/buttons/RouterPushButton";
import { useHabitContext } from "../../contexts/habitContext";
import FullHeightScrollView from "../../components/FullHeightScrollView";
import HabitPreview from "../../components/HabitPreview";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import IndexHeader from "../../components/IndexHeader";

const Habits = () => {
  const { habits } = useHabitContext();
  const carouselRef = React.useRef<ICarouselInstance>(null);

  return (
    <>
      <IndexHeader carouselRef={carouselRef} />
      <FullHeightScrollView>
        <FullPageView>
          <View style={{ alignSelf: "stretch", gap: 15 }}>
            {habits.map((habit, index) => (
              <HabitPreview key={index} arrayIndex={index} habit={habit} />
            ))}
          </View>
          <RouterPushButton buttonLabel="+" pageLink="./../NewHabit" />
        </FullPageView>
      </FullHeightScrollView>
    </>
  );
};

export default Habits;
