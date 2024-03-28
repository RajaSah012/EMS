import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 4; // Number of options per row

const OptionItem = ({ iconName, text }) => {
  return (
    <View style={styles.optionItem}>
      <FontAwesome name={iconName} style={styles.icon} />
      <Text style={styles.optionText}>{text}</Text>
    </View>
  );
};

const ManagementCategory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>Management</Text>
      <View style={styles.optionsContainer}>
        <OptionItem iconName="tasks" text="Task Management" />
        <OptionItem iconName="user" text="Request For Me" />
        <OptionItem iconName="users" text="My Team" />
        <OptionItem iconName="money" text="Loan" />
        <OptionItem iconName="money" text="Advance" />
        <OptionItem iconName="users" text="Recruitment" />
        <OptionItem iconName="money" text="My Taxation" />
        <OptionItem iconName="money" text="Your Option Here" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: width - 20,
  },
  optionItem: {
    alignItems: 'center',
    marginBottom: 10,
    width: (width - 40) / NUM_COLUMNS,
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    borderRadius: 10,
  },
  icon: {
    fontSize: 24, // Adjust icon size as needed
    color: '#333',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 5,
  },
});

export default ManagementCategory;
