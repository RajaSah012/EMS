import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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

  const handleDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || (type === 'from' ? leave.leaveFrom : leave.leaveTo);
    if (type === 'from') {
      setShowFromPicker(Platform.OS === 'ios');
      setLeave({ ...leave, leaveFrom: currentDate });
    } else {
      setShowToPicker(Platform.OS === 'ios');
      setLeave({ ...leave, leaveTo: currentDate });
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('leaveType', leave.leaveType);
    formData.append('remark', leave.remark);
    formData.append('leaveFrom', leave.leaveFrom.toISOString().split('T')[0]);
    formData.append('leaveTo', leave.leaveTo.toISOString().split('T')[0]);

    const token = 'your_token_here'; // Replace with your token logic

    axios.post('https://emsproject-production.up.railway.app/api/leave/', formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(result => {
        if (result.data) {
          Alert.alert('Success', 'Leave request submitted successfully');
          navigation.navigate('EmpDashboard');
        } else {
          Alert.alert('Error', result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const leaveTypes = [
    { leaveName: 'Sick leave (SL)' },
    { leaveName: 'Casual Leave (CL)' },
    { leaveName: 'Privilege Leave/Earned Leave/Annual Leave' },
    { leaveName: 'Paternity leaves' },
    { leaveName: 'Marriage leave' },
    { leaveName: 'Sabbatical Leave' },
    { leaveName: 'Bereavement leave' },
    { leaveName: 'Half-day leave' },
    { leaveName: 'Maternity leave' },
    { leaveName: 'Compensatory Off' },
    { leaveName: 'Public holidays' },
    { leaveName: 'Menstruation Leave' },
    { leaveName: 'Loss of Pay Leave' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Leave</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Leave Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={leave.leaveType}
            style={styles.picker}
            onValueChange={(itemValue) =>
              setLeave({ ...leave, leaveType: itemValue })
            }>
            <Picker.Item label="Select Leave Type" value="" />
            {leaveTypes.map((e, index) => (
              <Picker.Item key={index} label={e.leaveName} value={e.leaveName} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Remark</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter your Remark"
          multiline
          numberOfLines={4}
          onChangeText={(text) =>
            setLeave({ ...leave, remark: text })
          }
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Leave From</Text>
        <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>{leave.leaveFrom.toDateString()}</Text>
        </TouchableOpacity>
        {showFromPicker && (
          <DateTimePicker
            value={leave.leaveFrom}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'from')}
          />
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Leave To</Text>
        <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>{leave.leaveTo.toDateString()}</Text>
        </TouchableOpacity>
        {showToPicker && (
          <DateTimePicker
            value={leave.leaveTo}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'to')}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Apply for Leave</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2B6CB0', // Updated color
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#4A5568', // Updated color
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0', // Updated color
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#2D3748',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E2E8F0', // Updated color
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    color: '#2D3748',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0', // Updated color
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  dateText: {
    color: '#2D3748',
  },
  submitButton: {
    backgroundColor: '#2B6CB0', // Updated color
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default RequestLeave;
