import { myAxios ,BASE_URL} from '../services/helper';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ReportFilter from './ReportFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailyRepoart = () => {
  const [date, setDate] = useState(new Date());
  const [employee, setEmployee] = useState([]);
  const [employeeCopy, setEmployeeCopy] = useState([]);
  const [openReportFilter, setOpenReportFilter] = useState(false);
  const [openReportFilterSearchText, setOpenReportFilterSearchText] = useState('');
  const [filterbyDepartment, setFilterbyDepartment] = useState('');
  const [filterbySite, setFilterbySite] = useState('');
  const [filterbyShift, setFilterbyShift] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await myAxios.get("/api/employee/", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.data) {
          setEmployee(response.data);
          setEmployeeCopy(response.data);
        } else {
          Alert.alert('Error', 'Failed to fetch employee data.');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        Alert.alert('Error', 'An error occurred while fetching employee data.');
      }
    };

    fetchEmployeeData();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [openReportFilterSearchText, filterbyDepartment, filterbySite, filterbyShift]);

  const filterEmployees = () => {
    let filteredEmployees = [...employeeCopy];

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
      filteredEmployees = filteredEmployees.filter(f => f.shift == filterbyShift);
    }

    setEmployee(filteredEmployees);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Attendance Report</Text>
        <View style={styles.buttonsContainer}>
          <Text style={styles.date}>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</Text>
          <TouchableOpacity style={styles.button}>
            <Text>Break-Time-Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setOpenReportFilter(!openReportFilter)}>
            <MaterialIcons name="filter-list" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {openReportFilter && (
        <ReportFilter
          setOpenReportFilterSearchText={setOpenReportFilterSearchText}
          setFilterbyDepartment={setFilterbyDepartment}
          setFilterbySite={setFilterbySite}
          setFilterbyShift={setFilterbyShift}
          onClose={() => setOpenReportFilter(false)}
        />
      )}
      <View style={styles.tableContainer}>
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Id</Text>
              <Text style={[styles.tableHeaderText]}>Employee Name</Text>
              <Text style={[styles.tableHeaderText]}>Site</Text>
              <Text style={[styles.tableHeaderText]}>Shift</Text>
              <Text style={[styles.tableHeaderText]}>Department</Text>
              <Text style={[styles.tableHeaderText]}>Work Type</Text>
              <Text style={[styles.tableHeaderText]}>Location</Text>
              <Text style={[styles.tableHeaderText]}>Status</Text>
              <Text style={[styles.tableHeaderText]}>Check In</Text>
              <Text style={[styles.tableHeaderText]}>Check Out</Text>
              <Text style={[styles.tableHeaderText]}>Overtime</Text>
              <Text style={[styles.tableHeaderText]}>Total Duration</Text>
            </View>
            {employee.map((e) => (
              <View key={e.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.fixedCell]}>{e.employeeId}</Text>
                <View style={styles.tableCell}>
                  <Image
                  source={{ uri: `${BASE_URL}/api/employee/image/${e.zname}` }}
                    style={styles.employeeImage}
                  />
                  <View style={styles.employeeInfo}>
                    <Text>{e.name}</Text>
                    <Text style={styles.category}>{e.category}</Text>
                  </View>
                </View>
                <Text style={[styles.tableCell]}>{e.address}</Text>
                <Text style={[styles.tableCell]}>{e.salary}</Text>
                <Text style={[styles.tableCell]}>{e.name}</Text>
                <Text style={[styles.tableCell]}>{e.jod}</Text>
                <Text style={[styles.tableCell]}>{e.status}</Text>
                <Text style={[styles.tableCell]}>{e.status}</Text>
                <Text style={[styles.tableCell]}>{e.status}</Text>
                <Text style={[styles.tableCell]}>{e.status}</Text>
                <Text style={[styles.tableCell]}>{e.status}</Text>
                <Text style={[styles.tableCell]}>{e.status}</Text>
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
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginRight: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
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
});

export default DailyRepoart;
