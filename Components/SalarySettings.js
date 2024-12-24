import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Icons from Material Design

export default function SalarySettings() {
  const [selected, setSelected] = useState("Calendar Month");

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Select period type</Text>

      {/* Period Selector */}
      <View style={styles.selectorContainer}>
        {/* Calendar Month Option */}
        <TouchableOpacity
          style={[
            styles.option,
            selected === "Calendar Month" && styles.selectedOption,
          ]}
          onPress={() => setSelected("Calendar Month")}
        >
          <Text style={styles.optionTitle}>Calendar Month</Text>
          <Text style={styles.optionSubtitle}>eg. Jan - 31 days {"\n"}feb - 28 days</Text>
          {selected === "Calendar Month" && (
            <MaterialIcons
              name="check-circle"
              size={18}
              color="#00C853"
              style={styles.checkIcon}
            />
          )}
        </TouchableOpacity>

        {/* Fixed Days Month Option */}
        <TouchableOpacity
          style={[
            styles.option,
            selected === "Fixed Days Month" && styles.selectedOption,
          ]}
          onPress={() => setSelected("Fixed Days Month")}
        >
          <Text style={styles.optionTitle}>Fixed Days Month</Text>
          <Text style={styles.optionSubtitle}>30 days month {"\n"}26 days month</Text>
          {selected === "Fixed Days Month" && (
            <MaterialIcons
              name="check-circle"
              size={18}
              color="#00C853"
              style={styles.checkIcon}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* List Items */}
      <TouchableOpacity style={styles.listItem}>
        <MaterialIcons name="calendar-today" size={20} color="#333" />
        <Text style={styles.listText}>Attendance Cycle</Text>
        <MaterialIcons name="chevron-right" size={20} color="#C0C0C0" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <MaterialIcons name="attach-money" size={20} color="#333" />
        <Text style={styles.listText}>Manage Salary (CTC Template)</Text>
        <MaterialIcons name="chevron-right" size={20} color="#C0C0C0" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  option: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9F9F9",
    position: "relative",
  },
  selectedOption: {
    borderColor: "#00C853",
    backgroundColor: "#E8F5E9",
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  optionSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  checkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
});