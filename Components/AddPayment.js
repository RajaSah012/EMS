import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { myAxios } from '../services/helper';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './header/Header';

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
    myAxios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const fetchEmployeeRecords = () => {
    myAxios.get('/api/employee/')
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

  return (
    
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.gradientBackground}
    >
      <Header title={'AddPayment'}/>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Payroll Month</Text>
          <View style={styles.headerButtons}>
            <Text style={styles.dateText}>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Icon name="calendar" size={24} color="#fff" />
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
            placeholderTextColor="#ddd"
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
              {["Emp Id", "Name", "Joining Date", "CTC / Month", "Payable Amount", "Paid Amount", "Remaining Amount", "YTD Balance", "Calculation Status"].map((header, index) => (
                <Text key={index} style={[styles.tableHeaderText, styles.fixedHeaderText]}>{header}</Text>
              ))}
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#6a11cb',
    borderRadius: 5,
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    color: '#333',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#333',
  },
  table: {
    flex: 1,
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3b5998',
    padding: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    width: 120,
    textAlign: 'center',
  },
  fixedHeaderText: {
    minWidth: 120,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
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
