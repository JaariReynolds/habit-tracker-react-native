import React from "react";
import FullPageView from "../../components/FullPageView";
import { View, Text, StyleSheet } from "react-native";
import { useHabitContext } from "../../contexts/habitContext";
import { getHabitCompletionOverall } from "../../logic/reportLogic/getHabitCompletion";
import { colours, constants } from "../../styles/constants";
import FullHeightScrollView from "../../components/FullHeightScrollView";
import Header from "../../components/Header";
import getHabitStreak from "../../logic/reportLogic/getHabitStreak";
import { robotoFonts } from "../../styles/base-styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";

const HabitReports = () => {
  const { habits } = useHabitContext();
  const summaries = habits.map((habit) => {
    return {
      habitName:
        habit.habitName.length > 15 ? habit.habitName.slice(0, 10) + "..." : habit.habitName,
      frequencyName: habit.frequency.name,
      completion: getHabitCompletionOverall(habit) * 100,
      streak: getHabitStreak(habit),
    };
  });
  return (
    <>
      <Header title="Report" />
      <FullHeightScrollView>
        <FullPageView>
          <View style={styles.container}>
            {summaries.map((summary, index) => (
              <View key={index} style={[styles.card]}>
                <Text
                  style={[
                    robotoFonts.regular,
                    { textAlign: "center", height: 35, fontSize: 18, textAlignVertical: "center" },
                  ]}
                >
                  {summary.habitName}
                </Text>
                <View style={styles.grid}>
                  <View style={styles.gridChild}>
                    <Text style={robotoFonts.regular}>{summary.streak}</Text>
                    <Text style={[robotoFonts.regular, { fontSize: 13 }]}>streak</Text>
                  </View>
                  <View style={styles.gridChild}>
                    <Text style={robotoFonts.regular}>
                      {summary.completion}
                      <FontAwesomeIcon icon={faPercent} color={colours.accent} />
                    </Text>
                    <Text style={[robotoFonts.regular, { fontSize: 13 }]}>overall</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </FullPageView>
      </FullHeightScrollView>
    </>
  );
};

export default HabitReports;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    flexBasis: "48.5%",
    marginBottom: "3%",
    height: 120,
    backgroundColor: colours.activeHabitPreview,
    elevation: constants.elevation,
    borderRadius: constants.componentBorderRadius,
  },
  grid: {
    flexDirection: "row",
    flex: 1,
    textAlign: "center",
    height: "100%",
    borderTopWidth: 1,
  },

  gridChild: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
});
