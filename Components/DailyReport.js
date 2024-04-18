import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ReportFilter from './ReportFilter';

const DailyReport = () => {
  const [date, setDate] = useState(new Date());
  const [employee, setEmployee] = useState([]);
  const [employeeCopy, setEmployeeCopy] = useState([]);

  const [openReportFilter, setOpenReportFilter] = useState(false);

  const [openReportFilterSearchText, setOpenReportFilterSearchText] = useState('');
  const [filterbyDepartment, setFilterbyDepartment] = useState('');
  const [filterbySite, setFilterbySite] = useState('');
  const [filterbyShift, setFilterbyShift] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          setEmployeeCopy(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filteredEmployees = employeeCopy.filter(f => f.name.toLowerCase().includes(openReportFilterSearchText.toLowerCase()));
    setEmployee(filteredEmployees);
  }, [openReportFilterSearchText]);

  useEffect(() => {
    const filteredEmployees = employeeCopy.filter(f => f.name === filterbyDepartment);
    setEmployee(filteredEmployees);
  }, [filterbyDepartment]);

  useEffect(() => {
    const filteredEmployees = employeeCopy.filter(f => f.address === filterbySite);
    setEmployee(filteredEmployees);
  }, [filterbySite]);

  useEffect(() => {
    const filteredEmployees = employeeCopy.filter(f => f.salary == filterbyShift);
    setEmployee(filteredEmployees);
  }, [filterbyShift]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Attendance Report</Text>
          <View style={styles.buttonsContainer}>
            <Text style={styles.date}>{date.toLocaleDateString()}</Text>
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
          {employee.map((e) => (
            <View key={e.id} style={styles.row}>
              <Text style={styles.cell}>{e.id}</Text>
              <View style={styles.employeeCell}>
                <Image source={{ uri: `http://localhost:3000/Images/` + e.image }} style={styles.employeeImage} />
                <View style={styles.employeeDetails}>
                  <Text style={styles.employeeName}>{e.name}</Text>
                  <Text style={styles.employeeDesignation}>{e.designation}</Text>
                </View>
              </View>
              <Text style={styles.cell}>{e.address}</Text>
              <Text style={styles.cell}>{e.salary}</Text>
              <Text style={styles.cell}>{e.to_date}</Text>
              <Text style={styles.cell}>{e.status}</Text>
              <View style={styles.statusField}>
                <Text>{e.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20, // Add space from top
    paddingBottom: 20, // Add space from bottom
  },
  header: {
    backgroundColor: '#2196F3', // Material Blue
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
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
    backgroundColor: '#E0E0E0', // Grey 300
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  tableContainer: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  employeeCell: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  employeeImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25, // Circular image
  },
  employeeDetails: {
    flexDirection: 'column',
  },
  employeeName: {
    fontWeight: 'bold',
  },
  employeeDesignation: {
    color: 'gray',
  },
  statusField: {
    backgroundColor: '#EEEEEE', // Grey 200
    padding: 5,
    borderRadius: 5,
  },
});

export default DailyReport;
