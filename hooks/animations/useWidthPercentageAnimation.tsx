import { useEffect } from "react";
import { DimensionValue } from "react-native";
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";

export function useWidthPercentageAnimation(initialWidthPercent: number, toWidthPercent: number) {
  const width = useSharedValue(initialWidthPercent);
  const animatedWidthPercentage = useAnimatedStyle(() => ({
    width: `${width.value}%` as DimensionValue,
  }));

  useEffect(() => {
    width.value = withTiming(toWidthPercent * 100, {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [toWidthPercent]);

  return { animatedWidthPercentage };
}
