import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const BusinessContracts = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#FFDEE9", "#B5FFFC"]}
      style={styles.container}
    >
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>📋 Business Directory</Text>
        <Text style={styles.subHeader}>
          Manage and explore all business-related features
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Add Business */}
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate("AddBusiness")}
        >
          <FontAwesome5 name="folder-plus" size={28} style={styles.icon} />
          <Text style={styles.itemText}>Add Business</Text>
          <Ionicons name="chevron-forward" size={24} style={styles.arrow} />
        </TouchableOpacity>

        {/* Business Directory */}
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate("BusinessDirectory")}
        >
          <MaterialIcons name="business-center" size={28} style={styles.icon} />
          <Text style={styles.itemText}>Business Directory</Text>
          <Ionicons name="chevron-forward" size={24} style={styles.arrow} />
        </TouchableOpacity>

        {/* Notes Report */}
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate("NotesReport")}
        >
          <FontAwesome5 name="chart-bar" size={28} style={styles.icon} />
          <Text style={styles.itemText}>Business Notes Report</Text>
          <Ionicons name="chevron-forward" size={24} style={styles.arrow} />
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    borderRadius: 12,
    margin: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  subHeader: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 6,
  },
  icon: {
    marginRight: 15,
    color: "#4A90E2",
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  arrow: {
    color: "#4A90E2",
  },
});

export default BusinessContracts;
