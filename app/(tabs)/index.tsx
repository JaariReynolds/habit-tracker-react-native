import { Dimensions, View } from "react-native";
import React from "react";
import FullPageView from "../../components/FullPageView";
import RouterPushButton from "../../components/buttons/RouterPushButton";
import { useHabitContext } from "../../contexts/habitContext";
import FullHeightScrollView from "../../components/FullHeightScrollView";
import HabitPreview from "../../components/HabitPreview";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import IndexHeader from "../../components/IndexHeader";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Easing } from "react-native-reanimated";

const numbers = [1];
const PAGE_WIDTH = Dimensions.get("window").width;

const Habits = () => {
  const { habits } = useHabitContext();
  const carouselRef = React.useRef<ICarouselInstance>(null);

  return (
    <FullHeightScrollView>
      <IndexHeader carouselRef={carouselRef} />
      <Carousel
        ref={carouselRef}
        width={PAGE_WIDTH}
        style={{ flex: 1 }}
        data={numbers}
        enabled={false}
        withAnimation={{
          type: "timing",
          config: { duration: 300, easing: Easing.bezier(0.4, 0, 0.2, 1) },
        }}
        renderItem={() => {
          return (
            <FullPageView>
              <View style={{ alignSelf: "stretch", gap: 15 }}>
                {habits.map((habit, index) => (
                  <HabitPreview key={index} habit={habit} />
                ))}
              </View>
              <RouterPushButton
                buttonLabel={<FontAwesomeIcon icon={faPlus} />}
                pageLink="./../NewHabit"
              />
            </FullPageView>
          );
        }}
      />
    </FullHeightScrollView>
  );
};

export default Habits;
