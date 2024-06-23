import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";

const heavySpring: SpringConfig = {
  stiffness: 480,
  damping: 33,
};

export function useHeightAnimation(initialHeight: number, toHeight: number) {
  const height = useSharedValue(initialHeight);
  const animatedHeight = useAnimatedStyle(() => ({ height: height.value }));

  function handleOpen() {
    height.value = withSpring(toHeight, heavySpring);
  }

  function handleClose() {
    height.value = withSpring(initialHeight, heavySpring);
  }

  return { animatedHeight, handleOpen, handleClose };
}
