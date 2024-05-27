import {
  Dimensions,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";

interface FullHeightScrollViewProps {
  children: React.ReactNode;
  onTouchStart?: (event: GestureResponderEvent) => void;
  onTouchEnd?: (event: GestureResponderEvent) => void;
}

export default function FullHeightScrollView({
  children,
  onTouchStart,
  onTouchEnd,
}: FullHeightScrollViewProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="always"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
});
