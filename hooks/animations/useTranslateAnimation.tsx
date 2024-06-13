import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function useTranslateReturnAnimation(
  translateAmount: number,
  duration: number,
  translateDirection: "X" | "Y"
) {
  const translation = useSharedValue(0);
  const animatedTranslation = useAnimatedStyle(() =>
    translateDirection == "X"
      ? { transform: [{ translateX: translation.value }] }
      : { transform: [{ translateY: translation.value }] }
  );

  function handleAnimation() {
    translation.value = withSequence(
      withTiming(translateAmount, { duration: duration }),
      withTiming(0, { duration: duration })
    );
  }

  return { animatedTranslation, handleAnimation };
}
