import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 4; // Number of options per row

const OptionItem = ({ iconName, text, navigateTo }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(navigateTo);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.optionItem, {backgroundColor: 'lightblue'}]}>
        <FontAwesome name={iconName} style={styles.icon} />
        <Text style={styles.optionText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SelfServiceCategory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>Self Service</Text>
      <View style={styles.optionsContainer}>
        <OptionItem iconName="calendar-check-o" text="Mark Attendance" navigateTo="MarkAttendance" />
        <OptionItem iconName="calendar" text="My Attendance" navigateTo="MyAttendance" />
        <OptionItem iconName="briefcase" text="OutDoor Duty" navigateTo="OutDoorDuty" />
        <OptionItem iconName="money" text="Reimburse" navigateTo="Reimburse" />
        <OptionItem iconName="file-text" text="Apply" navigateTo="Apply" />
        <OptionItem iconName="plane" text="Holiday" navigateTo="Holiday" />
        <OptionItem iconName="calendar-times-o" text="Week Off" navigateTo="WeekOff" />
        <OptionItem iconName="money" text="Payslip" navigateTo="Payslip" />
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
    fontSize: 32,
    color: '#333',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 5, 
  },
});

export default SelfServiceCategory;
