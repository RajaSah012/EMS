import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const LeaveList = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [filterbySite, setFilterbySite] = useState('');
  const [status, setStatus] = useState('');
  const [leaveType, setLeaveType] = useState('');

  useEffect(() => {
    axios
      .get("https://emspro-production.up.railway.app/api/employee/")
      .then((result) => {
        if (result.data) {
          setEmployee(result.data);
          setRecords(result.data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (text) => {
    setRecords(employee.filter(f => f.name.toLowerCase().includes(text.toLowerCase())));
  };

  const siteFilter = (selectedSite) => {
    setFilterbySite(selectedSite);
    setRecords(employee.filter(f => f.site === selectedSite));
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false); // Close the picker after selecting the date
    setDate(currentDate); // Update the state with the selected date
  };

  // Format the date to a readable format like MM/DD/YYYY
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Leave Requests</Text>
      
      <View style={styles.filterSection}>
        {/* Export Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Leave Export</Text>
        </TouchableOpacity>

        {/* Date Picker */}
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        {/* Status Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Select Status</Text>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select Status" value="" />
            {employee.map((e) => (
              <Picker.Item label={e.site} value={e.employeeId} key={e.employeeId} />
            ))}
          </Picker>
        </View>

        {/* Leave Type Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Leave Type</Text>
          <Picker
            selectedValue={leaveType}
            onValueChange={(itemValue) => setLeaveType(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Leave Type" value="" />
            {employee.map((c) => (
              <Picker.Item label={c.name} value={c.employeeId} key={c.employeeId} />
            ))}
          </Picker>
        </View>

        {/* Site Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Select Site</Text>
          <Picker
            selectedValue={filterbySite}
            onValueChange={(itemValue) => siteFilter(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select Site" value="" />
            {employee.map((c) => (
              <Picker.Item label={c.site} value={c.site} key={c.site} />
            ))}
          </Picker>
        </View>

        {/* Search by Name */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search by Name"
            onChangeText={handleFilter}
          />
        </View>
      </View>

      {/* Table */}
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Code</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Name</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Dept</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Next Approver</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Site</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Created On</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>From</Text>
          </View>
          {records.map((e) => (
            <View key={e.employeeId} style={styles.tableRow}>
              <Text style={styles.tableCell}>{e.employeeId}</Text>
              <Text style={styles.tableCell}>{e.name}</Text>
              <Text style={styles.tableCell}>{e.department}</Text>
              <Text style={styles.tableCell}>{e.nextApprover}</Text>
              <Text style={styles.tableCell}>{e.site}</Text>
              <Text style={styles.tableCell}>{e.createdOn}</Text>
              <Text style={styles.tableCell}>{e.from}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E3F2FD', // Light blue background
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#0d47a1', // Dark blue color
    textAlign: 'center',
  },
  filterSection: {
    marginVertical: 15,
    backgroundColor: '#ffffff', // White background for filter section
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#0d47a1',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateContainer: {
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#81D4FA', // Light blue for date button
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    color: '#0d47a1',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#81D4FA', // Light blue border for pickers
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#0d47a1',
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff', // White background for input
  },
  table: {
    flex: 1,
    backgroundColor: '#ffffff', // White background for the table
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#BBDEFB', // Slightly darker light blue
    padding: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#0d47a1',
    width: 120,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 14,
    width: 120,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
});



export default LeaveList;
