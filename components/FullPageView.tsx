import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";

export default function FullPageView(props: { children: React.ReactNode }) {
  return <View style={styles.view}>{props.children}</View>;
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
  },
});
