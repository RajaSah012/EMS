import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GeneratePayslip = () => {
  const [date, setDate] = useState(new Date());
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get("https://emspro-production.up.railway.app/api/employee/", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.data) {
          setEmployee(response.data);
          setRecords(response.data);
        } else {
          Alert.alert('Error', 'Failed to fetch employee data.');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        Alert.alert('Error', 'An error occurred while fetching employee data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchEmployeeData();
  }, []);

  const handleFilter = (text) => {
    setRecords(employee.filter(f => f.name.toLowerCase().includes(text.toLowerCase())));
  };

  const handleDelete = (id) => {
    axios.delete(`https://emspro-production.up.railway.app/auth/delete_employee/${id}`)
      .then(result => {
        if (result.data.Status) {
          Alert.alert("Employee deleted successfully");
          setRecords(records.filter(e => e.id !== id));
        } else {
          Alert.alert(result.data.Error);
        }
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
        Alert.alert('Error', 'An error occurred while deleting employee.');
      });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Salary Generator</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Download Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Export Overtime Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirmed Reviewed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pre-Generate Salary</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.fieldSet}>
          <Picker style={styles.picker}>
            <Picker.Item label="STAFF" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
          <Text style={styles.label}>Emp Type</Text>
        </View>

        <View style={styles.fieldSet}>
          <Picker style={styles.picker}>
            <Picker.Item label="PENDING" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
          <Text style={styles.label}>Payslip Status</Text>
        </View>

        <View style={styles.fieldSet}>
          <Picker style={styles.picker}>
            <Picker.Item label="DEPARTMENT" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
          <Text style={styles.label}>Columns</Text>
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

        <View style={styles.fieldSet}>
          <Picker style={styles.picker}>
            <Picker.Item label="HEAD OFFICE" value="" />
            {employee.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
          <Text style={styles.label}>Site</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={handleFilter}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Payroll Status</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableContainer}>
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Id</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Employee</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Department</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Father's Name</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Phone no</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Email</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Joining Date</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Status</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Type</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Shift</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Site</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Primary Site</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Action</Text>
            </View>
            {records.map((e) => (
              <View style={styles.tableRow} key={e.id}>
                <Text style={styles.tableCell}>{e.employeeId}</Text>
                <View style={styles.tableCell}>
                  <Text>{e.name}</Text>
                  <Text>{e.designation}</Text>
                </View>
                <Text style={styles.tableCell}>{e.category}</Text>
                <Text style={styles.tableCell}>{e.fname}</Text>
                <Text style={styles.tableCell}>{e.mobile}</Text>
                <Text style={styles.tableCell}>{e.email}</Text>
                <Text style={styles.tableCell}>{e.jod}</Text>
                <Text style={styles.tableCell}>{e.status}</Text>
                <Text style={styles.tableCell}>{e.site}</Text>
                <Text style={styles.tableCell}>{e.site}</Text>
                <Text style={styles.tableCell}>{e.site}</Text>
                <Text style={styles.tableCell}>{e.site}</Text>
                <View style={[styles.tableCell, styles.actionCell]}>
                  <TouchableOpacity onPress={() => handleDelete(e.id)}>
                    <Text style={styles.actionText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: Dimensions.get('window').width / 2.5,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    marginVertical: 16,
  },
  fieldSet: {
    marginVertical: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    height: 40,
  },
  label: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  datePicker: {
    borderColor: '#007bff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  dateText: {
    color: '#007bff',
  },
  searchContainer: {
    marginVertical: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    padding: 10,
  },
  tableContainer: {
    marginVertical: 16,
    maxHeight: 400, // Adjust this value as needed
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
    minWidth: 120, // Adjusted for minimum width
  },
  fixedHeaderText: {
    minWidth: 120, // Adjusted for minimum width
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
    minWidth: 120, // Adjusted for minimum width
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  actionCell: {
    justifyContent: 'center', // Center content vertically
  },
  actionText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center', // Center text horizontally
  },
});

export default GeneratePayslip;
