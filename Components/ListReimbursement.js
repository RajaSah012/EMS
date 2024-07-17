import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListReimbursement = () => {
  const [date, setDate] = useState(new Date());
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          axios
            .get("https://emsproject-production.up.railway.app/api/employee/", {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
            .then((result) => {
              if (result.data) {
                setEmployee(result.data);
                setRecords(result.data);
              } else {
                Alert.alert("Error", result.data.Error);
              }
            })
            .catch((err) => console.log(err));
        } else {
          Alert.alert("Error", "No token found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTokenAndData();
  }, []);

  const handleFilter = (text) => {
    setRecords(employee.filter(f => f.name.toLowerCase().includes(text.toLowerCase())));
  };

  const handleDelete = async(id) => {
    
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Fetched Token:", token); // Logging the token

      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this employee?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              axios.delete(`https://emsproject-production.up.railway.app/api/employee/${id}`, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              })
              .then(result => {
                if (result.data) {
                  fetchTokenAndData();
                  
                } else {
                  Alert.alert("Error", result.data.Error);
                }
              })
              .catch(err => console.log(err));
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      console.error(e);
    }
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Requests for Reimbursement</Text>
        <View style={styles.filterContainer}>
          <Button title="Confirmed Reviewed" onPress={() => {}} />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        onChangeText={handleFilter}
      />
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Reimb. No.</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Created Date</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp. Code</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Name</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Next Approver</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Department</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Designation</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Bill Amt.</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Approved Amt.</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Bill Date</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Status</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Trail</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Action</Text>
          </View>
          {records.map((e) => (
            <View key={e.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{e.employeeId}</Text>
              <Text style={styles.tableCell}>{e.createdDate}</Text>
              <Text style={styles.tableCell}>{e.empCode}</Text>
              <Text style={styles.tableCell}>{e.name}</Text>
              <Text style={styles.tableCell}>{e.nextApprover}</Text>
              <Text style={styles.tableCell}>{e.department}</Text>
              <Text style={styles.tableCell}>{e.designation}</Text>
              <Text style={styles.tableCell}>{e.billAmount}</Text>
              <Text style={styles.tableCell}>{e.approvedAmount}</Text>
              <Text style={styles.tableCell}>{e.billDate}</Text>
              <Text style={styles.tableCell}>{e.status}</Text>
              <Text style={styles.tableCell}>{e.trail}</Text>
              <View style={styles.tableCellActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('EditEmployee', { id: e.id })}
                >
                  <Icon name="edit" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDelete(e.employeeId)}
                >
                  <Icon name="delete" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  tableCellActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  actionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ListReimbursement;
