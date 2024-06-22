import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  IconDefinition,
  faBook,
  faClipboard,
  faGamepad,
  faHouse,
  faStopwatch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { colours } from "../../styles/constants";

const TabIcon = ({ icon, color, name }: { icon: IconDefinition; color: string; name: string }) => {
  return (
    <View style={styles.TabIcon}>
      <FontAwesomeIcon icon={icon} color={color} />
      <Text style={{ color: color }}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colours.primary,
        tabBarInactiveTintColor: colours.accent,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          tabBarIcon: ({ color }) => <TabIcon icon={faGamepad} color={color} name="habits" />,
        }}
      />
      <Tabs.Screen
        name="Report"
        options={{
          title: "report",
          tabBarIcon: ({ color }) => <TabIcon icon={faClipboard} color={color} name="report" />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  TabIcon: {
    alignItems: "center",
    gap: 2,
  },
});
