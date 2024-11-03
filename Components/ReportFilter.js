import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,  StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

function ReportFilter({ onClose, setOpenReportFilterSearchText, setFilterbyDepartment, setFilterbySite, setFilterbyShift }) {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get('https://emspro-production.up.railway.app/auth/employee')
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.filterItem}>
        <TextInput
          style={styles.input}
          placeholder="Search Employee"
          onChangeText={handleFilter}
        />
      </View>
      <View style={styles.filterItem}>
        <TouchableOpacity style={styles.input} onPress={() => setShowCalendar(true)}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showCalendar && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowCalendar(false);
              setDate(selectedDate || date);
            }}
            maximumDate={new Date()}
          />
        )}
        <AntDesign name="calendar" size={24} color="black" style={styles.calendarIcon} />
      </View>
      <View style={styles.filterItem}>
        <Picker
          selectedValue=""
          style={styles.input}
          onValueChange={handleFilterbySite}
        >
          <Picker.Item label="Site" value="" />
          {employee.map((c) => (
            <Picker.Item key={c.address} label={c.address} value={c.address} />
          ))}
        </Picker>
      </View>
      <View style={styles.filterItem}>
        <Picker
          selectedValue=""
          style={styles.input}
        >
          <Picker.Item label="All" value="" />
          {employee.map((c) => (
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.filterItem}>
        <Picker
          selectedValue=""
          style={styles.input}
          onValueChange={handleFilterbyShift}
        >
          <Picker.Item label="Shift" value="" />
          {employee.map((c) => (
            <Picker.Item key={c.salary} label={c.salary.toString()} value={c.salary} />
          ))}
        </Picker>
      </View>
      <View style={styles.filterItem}>
        <Picker
          selectedValue=""
          style={styles.input}
          onValueChange={handleFilterbyDepartment}
        >
          <Picker.Item label="Department" value="" />
          {employee.map((c) => (
            <Picker.Item key={c.name} label={c.name} value={c.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.filterItem}>
        <Picker
          selectedValue=""
          style={styles.input}
        >
          <Picker.Item label="Status" value="" />
          {employee.map((c) => (
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.filterItem}>
        <Picker
          selectedValue=""
          style={styles.input}
        >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  filterItem: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
  },
  calendarIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReportFilter;
