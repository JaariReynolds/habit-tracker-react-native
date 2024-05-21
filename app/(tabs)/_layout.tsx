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

const TabIcon = ({
  icon,
  color,
  name,
}: {
  icon: IconDefinition;
  color: string;
  name: string;
}) => {
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
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "purple",
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          tabBarIcon: ({ color }) => (
            <TabIcon icon={faGamepad} color={color} name="habits" />
          ),
        }}
      />
      <Tabs.Screen
        name="FocusTimer"
        options={{
          title: "Timer",
          tabBarIcon: ({ color }) => (
            <TabIcon icon={faStopwatch} color={color} name="timer" />
          ),
        }}
      />
      <Tabs.Screen
        name="Journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => (
            <TabIcon icon={faBook} color={color} name="journal" />
          ),
        }}
      />
      <Tabs.Screen
        name="Report"
        options={{
          title: "report",
          tabBarIcon: ({ color }) => (
            <TabIcon icon={faClipboard} color={color} name="report" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabIcon icon={faUser} color={color} name="profile" />
          ),
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
