import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Icon } from 'react-native-elements';

const AttendanceFilter = ({ onClose, setOpenReportFilterSearchText, setFilterbyDepartment, setFilterbySite, setFilterbyShift }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get('https://mohitbyproject-production.up.railway.app/api/employee/')
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          setRecords(result.data.Result);
        } else {
          Alert.alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (text) => {
    setOpenReportFilterSearchText(text);
  };

  const handleFilterbyDepartment = (value) => {
    setFilterbyDepartment(value);
  };

  const handleFilterbySite = (value) => {
    setFilterbySite(value);
  };

  const handleFilterbyShift = (value) => {
    setFilterbyShift(value);
  };

  return (
    <View style={styles.dropDownReportFilter}>
      <View style={styles.ReportFilterHeader}>
        <Text style={styles.ReportFilterTitle}>Filter</Text>
        <Icon name="close" onPress={onClose} />
      </View>
      <ScrollView style={styles.ReportFilterContent}>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.textInput}
            placeholder="Search Employee"
            onChangeText={handleFilter}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
            <Text>{date.toLocaleDateString()}</Text>
            <Icon name="calendar" type="font-awesome" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
              maximumDate={new Date()}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text>Site</Text>
          <Picker selectedValue="" onValueChange={handleFilterbySite} style={styles.picker}>
            <Picker.Item label="Site" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.address} value={c.address} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text>Emp Type</Text>
          <Picker selectedValue="" style={styles.picker}>
            <Picker.Item label="All" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text>Shift</Text>
          <Picker selectedValue="" onValueChange={handleFilterbyShift} style={styles.picker}>
            <Picker.Item label="Shift" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.salary} value={c.salary} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text>Department</Text>
          <Picker selectedValue="" onValueChange={handleFilterbyDepartment} style={styles.picker}>
            <Picker.Item label="Department" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.name} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text>Status</Text>
          <Picker selectedValue="" style={styles.picker}>
            <Picker.Item label="Status" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text>Attendance Status</Text>
          <Picker selectedValue="" style={styles.picker}>
            <Picker.Item label="Attendance Status" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownReportFilter: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  ReportFilterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ReportFilterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ReportFilterContent: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AttendanceFilter;
