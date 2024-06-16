import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function useOpacityAnimation(initialOpacity: number, msIn: number, msOut: number) {
  const opacity = useSharedValue(initialOpacity);
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  function animateIn() {
    opacity.value = withTiming(1, { duration: msIn });
  }

  function animateOut() {
    opacity.value = withTiming(0, { duration: msOut });
  }

  return { animatedOpacity, animateIn, animateOut };
}
