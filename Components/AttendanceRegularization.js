import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { myAxios, BASE_URL } from '../services/helper';
import AttendanceFilter from './AttendanceFilter';

const AttendanceRegularization = () => {
  const [date, setDate] = useState(new Date());
  const [employee, setEmployee] = useState([]);
  const [employeeCopy, setEmployeeCopy] = useState([]);
  const [openReportFilter, setOpenReportFilter] = useState(false);
  const [openReportFilterSearchText, setOpenReportFilterSearchText] = useState('');
  const [filterbyDepartment, setFilterbyDepartment] = useState('');
  const [filterbySite, setFilterbySite] = useState('');
  const [filterbyShift, setFilterbyShift] = useState('');

  useEffect(() => {
    myAxios
      .get('/api/employee/')
      .then((result) => {
        if (result.data) {
          setEmployee(result.data);
          setEmployeeCopy(result.data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [openReportFilterSearchText, filterbyDepartment, filterbySite, filterbyShift]);

  const filterEmployees = () => {
    let filteredEmployees = employeeCopy;

    if (openReportFilterSearchText) {
      filteredEmployees = filteredEmployees.filter(f =>
        f.name.toLowerCase().includes(openReportFilterSearchText.toLowerCase())
      );
    }
    if (filterbyDepartment) {
      filteredEmployees = filteredEmployees.filter(f =>
        f.department === filterbyDepartment
      );
    }
    if (filterbySite) {
      filteredEmployees = filteredEmployees.filter(f =>
        f.site === filterbySite
      );
    }
    if (filterbyShift) {
      filteredEmployees = filteredEmployees.filter(f =>
        f.shift === filterbyShift
      );
    }

    setEmployee(filteredEmployees);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance Regular</Text>
        <View style={styles.dateAndFilterContainer}>
          <TouchableOpacity style={styles.dateButton} onPress={() => setDate(new Date())}>
            <Text style={styles.dateText}>
              {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setOpenReportFilter(true)}
          >
            <Text style={styles.filterIcon}>📝</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal Scrollable Table */}
      <ScrollView horizontal>
        <ScrollView>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Emp Id</Text>
              <Text style={styles.tableHeaderText}>Employee</Text>
              <Text style={styles.tableHeaderText}>Request Id</Text>
              <Text style={styles.tableHeaderText}>Created On</Text>
              <Text style={styles.tableHeaderText}>Check In</Text>
              <Text style={styles.tableHeaderText}>Check Out</Text>
              <Text style={styles.tableHeaderText}>Next Approver</Text>
              <Text style={styles.tableHeaderText}>Attendance</Text>
              <Text style={styles.tableHeaderText}>Status</Text>
              <Text style={styles.tableHeaderText}>Reason</Text>
              <Text style={styles.tableHeaderText}>Trail</Text>
              <Text style={styles.tableHeaderText}>Total Duration</Text>
            </View>

            {/* Table Rows */}
            {employee.map((item) => (
              <View key={item.employeeId} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.employeeId}</Text>
                <View style={styles.employeeCell}>
                  <Image
                    source={{ uri: `${BASE_URL}/api/employee/image/${e.zname}`,
                    }}
                    style={styles.employeeImage}
                  />
                  <View style={styles.employeeInfo}>
                    <Text style={styles.employeeName}>{item.name}</Text>
                    <Text style={styles.employeeCategory}>{item.category}</Text>
                  </View>
                </View>
                <Text style={styles.tableCell}>{item.address}</Text>
                <Text style={styles.tableCell}>{item.salary}</Text>
                <Text style={styles.tableCell}>{item.site}</Text>
                <Text style={styles.tableCell}>{item.jod}</Text>
                <Text style={styles.tableCell}>{item.status}</Text>
                <Text style={styles.tableCell}>{item.status}</Text>
                <Text style={styles.tableCell}>{item.status}</Text>
                <Text style={styles.tableCell}>{item.status}</Text>
                <Text style={styles.tableCell}>{item.status}</Text>
                <Text style={styles.tableCell}>{item.status}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      {openReportFilter && (
        <Modal
          visible={openReportFilter}
          animationType="slide"
          transparent
          onRequestClose={() => setOpenReportFilter(false)}
        >
          <TouchableWithoutFeedback onPress={() => setOpenReportFilter(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.filterModal}>
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDEE9',
  },
  header: {
    backgroundColor: '#B5FFFC',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dateAndFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  filterIcon: {
    fontSize: 20,
    color: '#fff',
  },
  table: {
    flex: 1,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
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
  tableRow: {
    flexDirection: 'row',
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
  employeeCell: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    paddingRight: 10,
  },
  employeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  employeeInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  employeeName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  employeeCategory: {
    color: '#555',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterModal: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
});

export default AttendanceRegularization;
