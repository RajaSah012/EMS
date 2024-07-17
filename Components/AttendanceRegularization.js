import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AttendanceFilter from './AttendanceFilter';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AttendanceRegularization = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [employee, setEmployee] = useState([]);
  const [employeeCopy, setEmployeeCopy] = useState([]);
  const [openReportFilter, setOpenReportFilter] = useState(false);
  const [openReportFilterSearchText, setOpenReportFilterSearchText] = useState('');
  const [filterbyDepartment, setFilterbyDepartment] = useState('');
  const [filterbySite, setFilterbySite] = useState('');
  const [filterbyShift, setFilterbyShift] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = await AsyncStorage.getItem('token');
      axios
        .get("https://emsproject-production.up.railway.app/api/employee/", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then((result) => {
          if (result.data) {
            setEmployee(result.data);
            setEmployeeCopy(result.data);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [openReportFilterSearchText, filterbyDepartment, filterbySite, filterbyShift]);

  const filterEmployees = () => {
    let filteredEmployees = employeeCopy;

    if (openReportFilterSearchText) {
      filteredEmployees = filteredEmployees.filter(f => f.name.toLowerCase().includes(openReportFilterSearchText.toLowerCase()));
    }
    if (filterbyDepartment) {
      filteredEmployees = filteredEmployees.filter(f => f.department === filterbyDepartment);
    }
    if (filterbySite) {
      filteredEmployees = filteredEmployees.filter(f => f.site === filterbySite);
    }
    if (filterbyShift) {
      filteredEmployees = filteredEmployees.filter(f => f.shift === filterbyShift);
    }

    setEmployee(filteredEmployees);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Attendance Regularization</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Text>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterIcon} onPress={() => setOpenReportFilter(true)}>
          <Icon name="filter-list" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Id</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Employee</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Request Id</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Created On</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Check In</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Check Out</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Next Approver</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Attendance</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Status</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Reason</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Trail</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Total Duration</Text>
          </View>
          {employee.map(e => (
            <View key={e.employeeId} style={styles.tableRow}>
              <Text style={styles.tableCell}>{e.employeeId}</Text>
              <View style={[styles.tableCell, styles.employeeInfo]}>
                <Text numberOfLines={2}>{e.name}</Text>
                <Text>{e.designation}</Text>
              </View>
              <Text style={styles.tableCell}>{e.requestId}</Text>
              <Text style={styles.tableCell}>{e.createdOn}</Text>
              <Text style={styles.tableCell}>{e.checkIn}</Text>
              <Text style={styles.tableCell}>{e.checkOut}</Text>
              <Text style={styles.tableCell}>{e.nextApprover}</Text>
              <Text style={styles.tableCell}>{e.attendance}</Text>
              <Text style={styles.tableCell}>{e.status}</Text>
              <Text style={styles.tableCell}>{e.reason}</Text>
              <Text style={styles.tableCell}>{e.trail}</Text>
              <Text style={styles.tableCell}>{e.totalDuration}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      </ScrollView>
      <Modal
        visible={openReportFilter}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOpenReportFilter(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpenReportFilter(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <AttendanceFilter
                setOpenReportFilterSearchText={setOpenReportFilterSearchText}
                setFilterbyDepartment={setFilterbyDepartment}
                setFilterbySite={setFilterbySite}
                setFilterbyShift={setFilterbyShift}
                onClose={() => setOpenReportFilter(false)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateButton: {
    marginRight: 16,
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  filterIcon: {
    padding: 8,
  },
  table: {
    flex: 1,
    marginBottom: 16,
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
  employeeInfo: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    minWidth: '80%',
    minHeight: '50%',
  },
});

export default AttendanceRegularization;
