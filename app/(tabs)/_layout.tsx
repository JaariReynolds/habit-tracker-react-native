import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartSimple, faHouse } from "@fortawesome/free-solid-svg-icons";
import { colours } from "../../styles/constants";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import Habits from ".";
import HabitReports from "./Report";
import { robotoFonts } from "../../styles/base-styles";
import { StatusBar } from "expo-status-bar";

const icons = [faHouse, faChartSimple];

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderTopWidth: 1,
        height: 43,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={{ flexGrow: 1, height: "100%", justifyContent: "center" }}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{
                backgroundColor: colours.light,
                height: "100%",
                alignItems: "center",
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: "auto" }}>
                <FontAwesomeIcon
                  icon={icons[index]}
                  size={30}
                  color={isFocused ? colours.accent : colours.dark}
                />
                {/* <Text style={[robotoFonts.regular, { fontSize: 15 }]}>{route.name}</Text> */}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Habits" component={Habits} />
      <Tab.Screen name="Report" component={HabitReports} />
    </Tab.Navigator>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  TabIcon: {
    alignItems: "center",
    gap: 2,
  },
});
