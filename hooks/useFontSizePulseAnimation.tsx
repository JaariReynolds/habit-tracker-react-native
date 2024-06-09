import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function useFontSizePulseAnimation(
  initialFontSize: number,
  duration?: number,
  fontSizePulseAmount?: number
) {
  const fontSize = useSharedValue(initialFontSize);
  const animatedFontSize = useAnimatedStyle(() => ({ fontSize: fontSize.value }));

  function handleAnimation() {
    fontSize.value = withSequence(
      withTiming(initialFontSize + (fontSizePulseAmount ?? 5), { duration: duration ?? 50 }),
      withTiming(initialFontSize, { duration: duration ?? 50 })
    );
  }

  return { animatedFontSize, handleAnimation };
}
