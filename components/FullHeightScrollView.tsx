import { Dimensions, ScrollView, StyleSheet } from "react-native";
import React from "react";

export default function FullHeightScrollView(props: {
  children: React.ReactNode;
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="always"
    >
      {props.children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
});
