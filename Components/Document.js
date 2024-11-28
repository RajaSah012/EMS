import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Document = () => {
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://emspro-production.up.railway.app/api/employee/')
      .then((result) => {
        if (result.data) {
          setEmployee(result.data);
          setRecords(result.data);
        } else {
          Alert.alert('Error', result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (employeeId) => {
    axios
      .delete(`https://emspro-production.up.railway.app/api/employee/${employeeId}`)
      .then((result) => {
        if (result.data) {
          setRecords(records.filter((item) => item.employeeId !== employeeId));
          Alert.alert('Success', 'Employee deleted successfully');
        } else {
          Alert.alert('Error', result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = (event) => {
    setRecords(employee.filter((f) => f.name.toLowerCase().includes(event.toLowerCase())));
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <Text style={styles.header}>Documents</Text>

      {/* Add Employee Button */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddEmployee')}
      >
        <Text style={styles.addButtonText}>Add Employee</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Name of Employee"
          placeholderTextColor="#666"
          onChangeText={handleFilter}
        />
        <Button title="Search" onPress={() => {}} color="#007bff" />
      </View>

      <View style={styles.tableContainer}>
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Name</Text>
              <Text style={styles.tableHeaderText}>Image</Text>
              <Text style={styles.tableHeaderText}>Email</Text>
              <Text style={styles.tableHeaderText}>Address</Text>
              <Text style={styles.tableHeaderText}>Salary</Text>
              <Text style={styles.tableHeaderText}>Action</Text>
            </View>

            {records.map((e) => (
              <View key={e.employeeId} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.fixedCell]}>{e.name}</Text>
                <View style={styles.tableCell}>
                  <Image
                    source={{
                      uri: `https://emspro-production.up.railway.app/api/employee/image/${e.zname}`,
                    }}
                    style={styles.employeeImage}
                  />
                </View>
                <Text style={styles.tableCell}>{e.email}</Text>
                <Text style={styles.tableCell}>{e.address}</Text>
                <Text style={styles.tableCell}>{e.salary}</Text>
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditEmployee', { employeeId: e.employeeId })}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(e.employeeId)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0d47a1',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  table: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e3f2fd',
    padding: 10,
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 14,
    width: 120,
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  employeeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  actionContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Document;
