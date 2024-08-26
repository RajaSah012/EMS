import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background

const EmpTask = () => {
  const [employee, setEmployee] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.get('https://emsproject-production.up.railway.app/api/employee/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.data && Array.isArray(response.data)) {
          setEmployee(response.data);
        } else {
          Alert.alert('Error', 'Failed to fetch employee data.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while fetching data.');
      }
    };

    fetchEmployeeData();
  }, []);

  const handleStatusChange = (id, status) => {
    setSelectedStatus(prev => ({
      ...prev,
      [id]: status,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#FFDEE9', '#B5FFFC']}
        style={styles.gradientBackground}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Task List</Text>
        </View>
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Task Id</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Assigned Date</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Task Title</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Assigned Task</Text>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Task Status</Text>
            </View>
            {employee.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.id}</Text>
                <Text style={styles.tableCell}>{moment(item.date).format('YYYY-MM-DD')}</Text>
                <Text style={styles.tableCell}>{item.title}</Text>
                <Text style={styles.tableCell}>{item.task}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedStatus[item.id] || item.status}
                    style={styles.picker}
                    onValueChange={(value) => handleStatusChange(item.id, value)}
                  >
                    <Picker.Item label="Select Status" value="" />
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="Working" value="Working" />
                    <Picker.Item label="Completed" value="Completed" />
                  </Picker>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#008b8b',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  table: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    padding: 8,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#0d47a1',
    width: 150,
  },
  fixedHeaderText: {
    minWidth: 150,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    width: 150,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: 150,
  },
});

export default EmpTask;
