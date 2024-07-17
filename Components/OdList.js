import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OdList = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [filterbySite, setFilterbySite] = useState('');

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
    setRecords(employee.filter(f => f.name.toLowerCase().includes(text.toLowerCase())));
  };

  useEffect(() => {
    setRecords(employee.filter(f => f.address === filterbySite));
  }, [filterbySite]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>OD Application</Text>
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
      <Picker
        selectedValue={filterbySite}
        style={styles.picker}
        onValueChange={(itemValue) => setFilterbySite(itemValue)}
      >
        <Picker.Item label="Select Status" value="" />
        {employee.map((e) => (
          <Picker.Item key={e.id} label={e.name} value={e.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        onChangeText={handleFilter}
      />
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>OD Id</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Employee</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Dept./Desi.</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Next Approver</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Applied Date</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Check In</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Check Out</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Distance/Duration</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Remarks</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Force Checkout Remarks</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Detail</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Expenses</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Total Amount</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Status</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Force Checkout</Text>
          </View>
          {records.map((e) => (
            <View key={e.employeeId} style={styles.tableRow}>
              <Text style={styles.tableCell}>{e.odId}</Text>
              <Text style={styles.tableCell}>{e.name}</Text>
              <Text style={styles.tableCell}>{e.department}</Text>
              <Text style={styles.tableCell}>{e.nextApprover}</Text>
              <Text style={styles.tableCell}>{e.appliedDate}</Text>
              <Text style={styles.tableCell}>{e.checkIn}</Text>
              <Text style={styles.tableCell}>{e.checkOut}</Text>
              <Text style={styles.tableCell}>{e.distanceDuration}</Text>
              <Text style={styles.tableCell}>{e.remarks}</Text>
              <Text style={styles.tableCell}>{e.forceCheckoutRemarks}</Text>
              <Text style={styles.tableCell}>{e.detail}</Text>
              <Text style={styles.tableCell}>{e.expenses}</Text>
              <Text style={styles.tableCell}>{e.totalAmount}</Text>
              <Text style={styles.tableCell}>{e.status}</Text>
              <Text style={styles.tableCell}>{e.forceCheckout}</Text>
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    marginBottom: 20,
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

export default OdList;
