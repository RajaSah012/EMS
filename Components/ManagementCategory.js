import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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
        <View style={styles.optionsRow}>
          <OptionItem iconName="tasks" text="Task Management" />
          <OptionItem iconName="user" text="Request For Me" />
          <OptionItem iconName="users" text="My Team" />
          <OptionItem iconName="money" text="Loan" />
        </View>
        <View style={styles.optionsRow}>
          <OptionItem iconName="money" text="Advance" />
          <OptionItem iconName="users" text="Recruitment" />
          <OptionItem iconName="money" text="My Taxation" />
          <OptionItem iconName="money" text="Your Option Here" />
        </View>
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
    flexDirection: 'column',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionItem: {
    alignItems: 'center',
    width: '25%', // Four options per row
    maxWidth: width / 4 - 20, // Adjust as needed for proper spacing
  },
  icon: {
    fontSize: 24,
    marginBottom: 10,
    color: '#333',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ManagementCategory;
