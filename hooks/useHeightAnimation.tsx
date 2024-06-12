import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";

const habitPreviewSpringConfig: SpringConfig = {
  stiffness: 400,
  damping: 25,
};

export function useHeightAnimation(initialHeight: number, toHeight: number) {
  const height = useSharedValue(initialHeight);
  const animatedHeight = useAnimatedStyle(() => ({ height: height.value }));

  function handleOpen() {
    height.value = withSpring(toHeight, habitPreviewSpringConfig);
  }

  function handleClose() {
    height.value = withSpring(initialHeight, habitPreviewSpringConfig);
  }

  return { animatedHeight, handleOpen, handleClose };
}
