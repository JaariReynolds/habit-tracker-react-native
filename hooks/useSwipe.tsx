import { Dimensions } from "react-native";

export function useSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  rangeOffset = 4
) {
  let firstTouch = 0;

  function onTouchStart(e: any) {
    firstTouch = e.nativeEvent.pageX;
  }

  function onTouchEnd(e: any) {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX;
    const range = Dimensions.get("window").width / rangeOffset;

    // check if position is growing positively and has reached specified range
    if (positionX - firstTouch > range) {
      onSwipeRight && onSwipeRight();
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionX > range) {
      onSwipeLeft && onSwipeLeft();
    }
  }

  return { onTouchStart, onTouchEnd };
}
