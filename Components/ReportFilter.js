import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from '@react-native-community/datetimepicker'; // Updated import

function ReportFilter({ onClose, setOpenReportFilterSearchText, setFilterbyDepartment, setFilterbySite, setFilterbyShift }) {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility
  const handleDate = (event, selectedDate) => {
    setShowCalendar(false); // Close calendar after selecting a date
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch employee data from API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/employee');
        const result = await response.json();
        if (result.Status) {
          setEmployee(result.Result);
          setRecords(result.Result);
        } else {
          alert(result.Error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowCalendar(true)} // Show calendar on press
        >
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showCalendar && (
          <DatePicker
            style={styles.datePicker}
            value={date}
            mode="date"
            display="default"
            onChange={handleDate}
            maximumDate={new Date()}
          />
        )}
        <AntDesign name="calendar" size={24} color="black" style={styles.calendarIcon} />
      </View>
      <View style={styles.filterItem}>
        <TextInput style={styles.input} placeholder="Site" />
      </View>
      <View style={styles.filterItem}>
        <TextInput style={styles.input} placeholder="Emp Type" />
      </View>
      <View style={styles.filterItem}>
        <TextInput style={styles.input} placeholder="Shift" />
      </View>
      <View style={styles.filterItem}>
        <TextInput style={styles.input} placeholder="Department" />
      </View>
      <View style={styles.filterItem}>
        <TextInput style={styles.input} placeholder="Status" />
      </View>
      <View style={styles.filterItem}>
        <TextInput style={styles.input} placeholder="Attendance Status" />
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
  datePicker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    paddingRight: 32,
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
