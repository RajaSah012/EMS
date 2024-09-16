import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CurrentEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = await AsyncStorage.getItem('token');
      axios
        .get('https://mohitbyproject-production.up.railway.app/api/employee/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          if (result.data) {
            setEmployee(result.data);
            setRecords(result.data);
          } else {
            Alert.alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchEmployees();
  }, []);

  const handleFilter = (text) => {
    setRecords(employee.filter((f) => f.name.toLowerCase().includes(text.toLowerCase())));
  };

  const handleDelete = (employeeId) => {
    axios.delete(`https://mohitbyproject-production.up.railway.app/api/employee/${employeeId}`)
        .then(result => {
            if (result.data) {
                setRecords(records.filter(e => e.employeeId !== employeeId));
                Alert.alert('Success', 'Employee deleted successfully.');
            } else {
                Alert.alert('Error', result.data.Error);
            }
        })
        .catch(err => Alert.alert('Error', 'Failed to delete employee.'));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Employees</Text>
        <Picker
          selectedValue={selectedGender}
          style={styles.picker}
          onValueChange={(value) => setSelectedGender(value)}
        >
          <Picker.Item label="Gender" value="" />
          {employee.map((c) => (
            <Picker.Item key={c.gender} label={c.gender} value={c.gender} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Bulk Attendance Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Employee</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddEmployee')}
        >
          <Text style={styles.buttonText}>Add Employee</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Export</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Picker style={styles.picker}>
          <Picker.Item label="STAFF" value="" />
          {employee.map((c) => (
            <Picker.Item key={`staff-${c.name}`} label={c.name} value={c.name} />
          ))}
        </Picker>
        <Picker style={styles.picker}>
          <Picker.Item label="SHIFT" value="" />
          {employee.map((c) => (
            <Picker.Item key={`shift-${c.employeeId}`} label={c.work} value={c.id} />
          ))}
        </Picker>
        <Picker style={styles.picker}>
          <Picker.Item label="DEPARTMENT" value="" />
          {employee.map((c) => (
            <Picker.Item key={`dept-${c.id}`} label={c.category} value={c.id} />
          ))}
        </Picker>
        <Picker style={styles.picker}>
          <Picker.Item label="ALL" value="" />
          {employee.map((c) => (
            <Picker.Item key={`status-${c.id}`} label={c.status} value={c.id} />
          ))}
        </Picker>
        <Picker style={styles.picker}>
          <Picker.Item label="SITE" value="" />
          {employee.map((c) => (
            <Picker.Item key={`site-${c.id}`} label={c.site} value={c.id} />
          ))}
        </Picker>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          onChangeText={handleFilter}
        />
      </View>

      <View style={styles.tableContainer}>
        <ScrollView horizontal>
          <View>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { width: 80 }]}>Emp Id</Text>
              <Text style={[styles.tableHeaderText, { width: 180 }]}>Employee</Text>
              <Text style={[styles.tableHeaderText, { width: 120 }]}>Department</Text>
              <Text style={[styles.tableHeaderText, { width: 150 }]}>Father's Name</Text>
              <Text style={[styles.tableHeaderText, { width: 120 }]}>Phone no</Text>
              <Text style={[styles.tableHeaderText, { width: 150 }]}>Email</Text>
              <Text style={[styles.tableHeaderText, { width: 120 }]}>Joining Date</Text>
              <Text style={[styles.tableHeaderText, { width: 120 }]}>Status</Text>
              <Text style={[styles.tableHeaderText, { width: 100 }]}>Emp Type</Text>
              <Text style={[styles.tableHeaderText, { width: 120 }]}>Shift</Text>
              <Text style={[styles.tableHeaderText, { width: 120 }]}>Site</Text>
              <Text style={[styles.tableHeaderText, { width: 120 }]}>Primary Site</Text>
              <Text style={[styles.tableHeaderText, { width: 120 }]}>Action</Text>
            </View>
            {records.map((e) => (
              <View key={e.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.fixedCell]}>{e.employeeId}</Text>
                <View style={styles.tableCell}>
                  <Image
                    source={{ uri: `https://mohitbyproject-production.up.railway.app/api/employee/image/${e.zname}` }}
                    style={styles.employeeImage}
                  />
                  <View style={styles.employeeInfo}>
                    <Text>{e.name}</Text>
                    <Text style={styles.category}>{e.category}</Text>
                  </View>
                </View>
                <Text style={[styles.tableCell, { width: 120 }]}>{e.category}</Text>
                <Text style={[styles.tableCell, { width: 150 }]}>{e.fname}</Text>
                <Text style={[styles.tableCell, { width: 120 }]}>{e.mobile}</Text>
                <Text style={[styles.tableCell, { width: 150 }]}>{e.email}</Text>
                <Text style={[styles.tableCell, { width: 120 }]}>{e.jod}</Text>
                <Text style={[styles.tableCell, { width: 120 }]}>{e.status}</Text>
                <Text style={[styles.tableCell, { width: 100 }]}>{e.status}</Text>
                <Text style={[styles.tableCell, { width: 120 }]}>{e.status}</Text>
                <Text style={[styles.tableCell, { width: 120 }]}>{e.site}</Text>
                <Text style={[styles.tableCell, { width: 120 }]}>{e.status}</Text>
                <View style={[styles.tableCellAction, { width: 120 }]}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditEmployeeIndivisual', { id: e.id })
                    }
                  >
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(e.employeeId)}>
                    <Text style={styles.deleteButton}>Delete</Text>
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
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  tableContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
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
  employeeImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  employeeInfo: {
    flexDirection: 'column',
  },
  category: {
    fontStyle: 'italic',
    color: '#555',
  },
  tableCellAction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 120,
  },
  editButton: {
    color: '#007bff',
  },
  deleteButton: {
    color: '#ff0000',
  },
});

export default CurrentEmployee;
