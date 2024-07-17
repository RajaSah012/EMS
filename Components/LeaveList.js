import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LeaveList = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [filterbySite, setFilterbySite] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const result = await axios.get("https://emsproject-production.up.railway.app/api/employee/", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (result.data) {
            setEmployee(result.data);
            setRecords(result.data);
          } else {
            alert(result.data.Error);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (text) => {
    setRecords(employee.filter(f =>
      f.name.toLowerCase().includes(text.toLowerCase()) &&
      (filterbySite === '' || f.address === filterbySite)
    ));
  };

  useEffect(() => {
    setRecords(employee.filter(f => f.address === filterbySite));
  }, [filterbySite]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // Perform any additional actions based on status selection
  };

  const handleLeaveTypeChange = (leaveType) => {
    setSelectedLeaveType(leaveType);
    // Perform any additional actions based on leave type selection
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    handleFilter(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leave Requests</Text>
        <Button title="Leave Export" onPress={() => {}} />
      </View>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.additionalFields}>
        {/* Leave Type */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Leave Type</Text>
          <Picker
            selectedValue={selectedLeaveType}
            style={styles.fieldPicker}
            onValueChange={(itemValue) => handleLeaveTypeChange(itemValue)}
          >
            <Picker.Item label="Leave Type" value="" />
            {employee.map((e) => (
              <Picker.Item key={e.id} label={e.leaveType} value={e.leaveType} />
            ))}
          </Picker>
        </View>
        {/* Select Status */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Select Status</Text>
          <Picker
            selectedValue={selectedStatus}
            style={styles.fieldPicker}
            onValueChange={(itemValue) => handleStatusChange(itemValue)}
          >
            <Picker.Item label="Select Status" value="" />
            {employee.map((e) => (
              <Picker.Item key={e.id} label={e.status} value={e.status} />
            ))}
          </Picker>
        </View>
        {/* Select Site */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Select Site</Text>
          <Picker
            selectedValue={filterbySite}
            style={styles.fieldPicker}
            onValueChange={(itemValue) => setFilterbySite(itemValue)}
          >
            <Picker.Item label="Select Site" value="" />
            {employee.map((e) => (
              <Picker.Item key={e.id} label={e.address} value={e.address} />
            ))}
          </Picker>
        </View>
        {/* Search by Name */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          onChangeText={handleSearchChange}
          value={searchText}
        />
      </View>
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
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  dateText: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  additionalFields: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldPicker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  table: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e3f2fd',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#0d47a1',
    width: 120,
  },
  fixedHeaderText: {
    minWidth: 120,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
