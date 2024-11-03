import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

function TaskListFilter({ onClose, setOpenReportFilterSearchText, setFilterbyDepartment, setFilterbySite, setFilterbyShift }) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("https://emspro-production.up.railway.app/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          setRecords(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (text) => {
    setOpenReportFilterSearchText(text);
  };

  const handleFilterbyDepartment = (itemValue) => {
    setFilterbyDepartment(itemValue);
  };

  const handleFilterbySite = (itemValue) => {
    setFilterbySite(itemValue);
  };

  const handleFilterbyShift = (itemValue) => {
    setFilterbyShift(itemValue);
  };

  return (
    <ScrollView style={styles.dropDownReportFilter}>
      <View style={styles.reportFilterHeader}>
        <Text style={styles.reportFilterTitle}>Filter</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.reportFilterBody}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.textField}
            placeholder="Search Employee"
            onChangeText={handleFilter}
          />
        </View>

        <View style={styles.fieldContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerContainer}>
            <Text style={styles.dateText}>{date.toDateString()}</Text>
            <Ionicons name="calendar" size={24} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
              maximumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Picker
            selectedValue=""
            style={styles.picker}
            onValueChange={handleFilterbySite}
          >
            <Picker.Item label="Site" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.address} label={c.address} value={c.address} />
            ))}
          </Picker>
        </View>

        <View style={styles.fieldContainer}>
          <Picker
            selectedValue=""
            style={styles.picker}
            onValueChange={handleFilterbyDepartment}
          >
            <Picker.Item label="Department" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.name} label={c.name} value={c.name} />
            ))}
          </Picker>
        </View>

        <View style={styles.fieldContainer}>
          <Picker
            selectedValue=""
            style={styles.picker}
            onValueChange={handleFilterbyShift}
          >
            <Picker.Item label="Shift" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.salary} label={c.salary} value={c.salary} />
            ))}
          </Picker>
        </View>

        <View style={styles.fieldContainer}>
          <Picker selectedValue="" style={styles.picker}>
            <Picker.Item label="Emp Type" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.fieldContainer}>
          <Picker selectedValue="" style={styles.picker}>
            <Picker.Item label="Status" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.fieldContainer}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropDownReportFilter: {
    padding: 16,
    backgroundColor: 'white',
  },
  reportFilterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reportFilterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportFilterBody: {
    flexDirection: 'column',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  textField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  dateText: {
    fontSize: 16,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 8,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  submitButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TaskListFilter;
