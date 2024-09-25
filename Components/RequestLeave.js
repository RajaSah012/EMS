import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

const RequestLeave = () => {
  const [leave, setLeave] = useState({
    leaveType: '',
    remark: '',
    leaveFrom: new Date(),
    leaveTo: new Date(),
  });

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const navigation = useNavigation();

  // Function to reset leave state
  const resetForm = () => {
    setLeave({
      leaveType: '',
      remark: '',
      leaveFrom: new Date(),
      leaveTo: new Date(),
    });
  };

  // Clear form on screen focus
  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, [])
  );

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    const employeeId = 2;

    axios
      .post(
        `https://mohitbyproject-production.up.railway.app/api/leave/${employeeId}`,
        leave,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(result => {
        if (result.data) {
          Alert.alert('Success', 'Leave request added successfully!');
          navigation.navigate('EmpDashboard', { screen: 'RequestLeave' });
        } else {
          Alert.alert('Error', result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleDateChange = (event, selectedDate, field) => {
    if (field === 'from') {
      setShowFromPicker(Platform.OS === 'ios');
      if (selectedDate) {
        setLeave({ ...leave, leaveFrom: selectedDate });
      }
    } else {
      setShowToPicker(Platform.OS === 'ios');
      if (selectedDate) {
        setLeave({ ...leave, leaveTo: selectedDate });
      }
    }
  };

  const leaveTypes = [
    'Sick leave (SL)',
    'Casual Leave (CL)',
    'Privilege Leave/Earned Leave/Annual Leave',
    'Maternity leaves',
    'Marriage leave',
    'Sabbatical Leave',
    'Bereavement leave',
    'Half-day leave',
    'Maternity leave',
    'Compensatory Off',
    'Public holidays',
    'Menstruation Leave',
    'Loss of Pay Leave',
  ];

  return (
    <LinearGradient
      colors={['#FFDEE9', '#B5FFFC']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Leave Request</Text>

        <Text style={styles.label}>Leave Type</Text>
        <Picker
          selectedValue={leave.leaveType}
          style={styles.picker}
          onValueChange={(itemValue) => setLeave({ ...leave, leaveType: itemValue })}
        >
          <Picker.Item label="Select Leave Type" value="" />
          {leaveTypes.map((leaveType, index) => (
            <Picker.Item label={leaveType} value={leaveType} key={index} />
          ))}
        </Picker>

        <Text style={styles.label}>Remark</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Enter your remarks"
          value={leave.remark}
          onChangeText={(text) => setLeave({ ...leave, remark: text })}
        />

        <Text style={styles.label}>Leave From</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={leave.leaveFrom.toISOString().split('T')[0]} // Display selected date
          onFocus={() => setShowFromPicker(true)}
        />
        {showFromPicker && (
          <DateTimePicker
            value={leave.leaveFrom}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'from')}
          />
        )}

        <Text style={styles.label}>Leave To</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={leave.leaveTo.toISOString().split('T')[0]} // Display selected date
          onFocus={() => setShowToPicker(true)}
        />
        {showToPicker && (
          <DateTimePicker
            value={leave.leaveTo}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'to')}
          />
        )}

        <View style={styles.buttonContainer}>
          <Button title="Apply for Leave" onPress={handleSubmit} color="#5DA3FA" />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  textArea: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  picker: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default RequestLeave;
