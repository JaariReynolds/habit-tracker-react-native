import { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function useTranslateAnimation(translatePercentage: number) {
  const bezier = Easing.bezier(0.25, 0.1, 0.25, 1);
  const translation = useSharedValue(0);
  const animatedTranslation = useAnimatedStyle(() => ({
    transform: [{ translateX: translation.value }],
  }));

  function translateLeft() {
    translation.value = withTiming(0, { duration: 200, easing: bezier });
  }

  function translateRight() {
    translation.value = withTiming(translatePercentage, { duration: 200, easing: bezier });
  }

  return { animatedTranslation, translateLeft, translateRight };
}
