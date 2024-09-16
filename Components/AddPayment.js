import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const AddPayment = () => {
  const [admins, setAdmins] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [wageType, setWageType] = useState('Monthly');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAdminRecords();
    fetchEmployeeRecords();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, employee]);

  const fetchAdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const fetchEmployeeRecords = () => {
    axios.get('https://mohitbyproject-production.up.railway.app/api/employee/')
      .then(result => {
        if (result.data) {
          setEmployee(result.data);
          setRecords(result.data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (query) => {
    setRecords(
      employee.filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (dateArray, options = {}) => {
    try {
      if (!Array.isArray(dateArray) || dateArray.length !== 3) {
        console.log("Invalid date format:", dateArray);
        return "N/A";
      }
      const [year, month, day] = dateArray;
      const date = new Date(year, month - 1, day);
      if (isNaN(date.getTime())) {
        console.log("Invalid date value:", dateArray);
        return "N/A";
      }
      return new Intl.DateTimeFormat('en-GB', options).format(date);
    } catch (error) {
      console.log('Date formatting error:', error);
      return "N/A";
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Payroll Month</Text>
        <View style={styles.headerButtons}>
          <Text style={styles.dateText}>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Employee"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Branch</Text>
        <Picker
          selectedValue={selectedBranch}
          onValueChange={(itemValue) => setSelectedBranch(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All Branches" value="All Branches" />
          {employee.map((emp) => (
            <Picker.Item key={emp.employeeId} label={emp.site} value={emp.site} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Wage Type</Text>
        <Picker
          selectedValue={wageType}
          onValueChange={(itemValue) => setWageType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Monthly" value="Monthly" />
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Hourly" value="Hourly" />
        </Picker>
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Id</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Name</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Joining Date</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>CTC / Month</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Payable Amount</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Paid Amount</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Remaining Amount</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>YTD Balance</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Calculation Status</Text>
          </View>
          {records.map((item) => (
            <View key={item.employeeId} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.employeeId}</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.jod}</Text>
              <Text style={styles.tableCell}>{(item.salary * 12).toFixed(2)}</Text>
              <Text style={styles.tableCell}>{item.salary}</Text>
              <Text style={styles.tableCell}>{item.salary}</Text>
              <Text style={styles.tableCell}>{item.salary}</Text>
              <Text style={styles.tableCell}>{item.salary}</Text>
              <Text style={styles.tableCell}>{item.salary}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    marginRight: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 16,
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

export default AddPayment;
