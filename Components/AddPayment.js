import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const AddPayment = () => {
  const [admins, setAdmins] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedWageType, setSelectedWageType] = useState('Monthly');

  useEffect(() => {
    fetchAdminRecords();
    fetchEmployeeRecords();
  }, []);

  const fetchAdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchEmployeeRecords = () => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          setRecords(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFilter = (text) => {
    setSearchText(text);
    const newData = employee.filter(row => {
      return row.name.toLowerCase().includes(text.toLowerCase());
    });
    setRecords(newData);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
    );
  };

  const renderTableHeader = () => {
    return (
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title style={[styles.tableHeaderTitle, styles.tableCell]}>EMP ID</DataTable.Title>
        <DataTable.Title style={[styles.tableHeaderTitle, styles.tableCell]}>NAME</DataTable.Title>
        <DataTable.Title style={[styles.tableHeaderTitle, styles.tableCell]}>JOINING DATE</DataTable.Title>
        <DataTable.Title style={[styles.tableHeaderTitle, styles.tableCell]}>CTC / MONTH</DataTable.Title>
        <DataTable.Title style={[styles.tableHeaderTitle, styles.tableCell]}>PAYABLE AMOUNT</DataTable.Title>
        <DataTable.Title style={[styles.tableHeaderTitle, styles.tableCell]}>PAID AMOUNT</DataTable.Title>
        <DataTable.Title style={[styles.tableHeaderTitle, styles.tableCell]}>REMAINING AMOUNT</DataTable.Title>
        <DataTable.Title style={[styles.tableHeaderTitle, styles.tableCell]}>YTD BALANCE</DataTable.Title>
        <DataTable.Title style={[styles.tableHeaderTitle, styles.tableCell]}>CALCULATION STATUS</DataTable.Title>
      </DataTable.Header>
    );
  };

  const renderTableData = ({ item }) => {
    return (
      <DataTable.Row>
        <DataTable.Cell style={styles.tableCell}>{item.id}</DataTable.Cell>
        <DataTable.Cell style={styles.tableCell}>{item.name}</DataTable.Cell>
        <DataTable.Cell style={styles.tableCell}>{moment(item.joining_date).format('MM/DD/YYYY')}</DataTable.Cell>
        <DataTable.Cell style={styles.tableCell}>{item.salary * 12}</DataTable.Cell>
        <DataTable.Cell style={styles.tableCell}>{item.salary}</DataTable.Cell>
        <DataTable.Cell style={styles.tableCell}>{item.paid_amount}</DataTable.Cell>
        <DataTable.Cell style={styles.tableCell}>{item.remaining_amount}</DataTable.Cell>
        <DataTable.Cell style={styles.tableCell}>{item.ytd_blance}</DataTable.Cell>
        <DataTable.Cell style={styles.tableCell}>{item.calculation_status}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Branch</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedBranch}
          onValueChange={(itemValue, itemIndex) => setSelectedBranch(itemValue)}
        >
          <Picker.Item label="All Branches" value="All Branches" />
          {admins.map((admin) => (
            <Picker.Item label={admin.name} value={admin.id} key={admin.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Payroll Month</Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text>{moment(date).format('MMMM DD, YYYY')}</Text>
        </TouchableOpacity>
        {showDatePicker && renderDatePicker()}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Wage Type</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedWageType}
          onValueChange={(itemValue, itemIndex) => setSelectedWageType(itemValue)}
        >
          <Picker.Item label="Monthly" value="Monthly" />
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Hourly" value="Hourly" />
        </Picker>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Employee by name"
          value={searchText}
          onChangeText={handleFilter}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
        <DataTable style={styles.table}>
          {renderTableHeader()}
          <FlatList
            data={records}
            renderItem={renderTableData}
            keyExtractor={(item) => item.id.toString()}
          />
        </DataTable>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa', // Light background for better contrast
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#fff', // White background for inputs
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#fff', // White background for date picker button
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#fff', // White background for search input
  },
  searchButton: {
    backgroundColor: '#668cf5',
    borderRadius: 4,
    padding: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  table: {
    marginTop: 16,
  },
  tableHeader: {
    backgroundColor: '#668cf5',
  },
  tableHeaderTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 20, // Add margin to the right for spacing
  },
  tableCell: {
    marginRight: 20, // Add margin to the right for spacing in table cells
  },
});

export default AddPayment;
