import { useEffect, useRef } from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function useOpacityAnimation(initialOpacity: number, msIn: number, msOut: number) {
  const opacity = useSharedValue(initialOpacity);
  // const display = useSharedValue(initialOpacity === 1 ? "flex" : "none");
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
    // display: display.value as "flex" | "none" | undefined,
  }));

  function animateIn() {
    // display.value = "flex";
    opacity.value = withTiming(1, { duration: msIn });
  }

  function animateOut() {
    opacity.value = withTiming(0, { duration: msOut });
  }

  return { animatedOpacity, animateIn, animateOut };
}
