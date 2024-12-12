import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { myAxios, BASE_URL } from '../services/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [punchRecords, setPunchRecords] = useState({});
  const [statusMap, setStatusMap] = useState({});
  const [branch, setBranch] = useState(""); 
  const [department, setDepartment] = useState(""); 
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  const [halfDayCount, setHalfDayCount] = useState(0);
  const [paidLeaveCount, setPaidLeaveCount] = useState(0);
  const statusOptions = ['Select', 'Present', 'Absent', 'Late', 'Half Day', 'Paid Leave'];

  useEffect(() => {
    AdminRecords();
    fetchCategories();
    fetchEmployees();
    PresentCount();
    AbsentCount();
    LateCount();
    HalfDayCount();
    PaidLeaveCount();
  }, []);

  const AdminRecords = async () => {
    const token = await AsyncStorage.getItem('token');
    myAxios.get('/auth/getUsers/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(result => setAdmins(result.data))
      .catch(err => console.log(err));
  };

  const fetchCategories = async () => {
    const token = await AsyncStorage.getItem('token');
    myAxios.get('/api/category/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(result => setCategory(result.data))
      .catch(err => console.log(err));
  };

  const fetchEmployees = async () => {
    const token = await AsyncStorage.getItem('token');
    myAxios.get('/api/employee/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(result => {
        setEmployee(result.data);
        setRecords(result.data);
      })
      .catch(err => console.log(err));
  };

  const handleFilter = (text) => {
    setRecords(employee.filter(f => f.name.toLowerCase().includes(text.toLowerCase())));
  };

  const handlePunch = async (employeeId, name) => {
    const isPunchingIn = !punchRecords[employeeId];
    const token = await AsyncStorage.getItem('token');

    if (isPunchingIn) {
      myAxios.post('/api/Hello/punchIn', {
        employeeName: name,
        employeeId: employeeId,
        status: statusMap[employeeId] || 'Select',
      }, { headers: { Authorization: `Bearer ${token}` } })
        .then(result => {
          if (result.data) {
            setPunchRecords(prev => ({ ...prev, [employeeId]: result.data.id }));
          }
        })
        .catch(err => console.log(err));
    } else {
      const attendanceId = punchRecords[employeeId];
      myAxios.put(`/api/Hello/punchOut/${attendanceId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          setPunchRecords(prev => {
            const newState = { ...prev };
            delete newState[employeeId];
            return newState;
          });
        })
        .catch(err => console.log(err));
    }
  };

  const handleStatusChange = (employeeId, value) => {
    setStatusMap(prev => ({ ...prev, [employeeId]: value }));
  };

  const PresentCount = async () => {
    const token = await AsyncStorage.getItem('token');
    myAxios.get('/api/Hello/countP', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(result => setPresentCount(result.data))
      .catch(err => console.log(err));
  };

  const AbsentCount = async () => {
    const token = await AsyncStorage.getItem('token');
    myAxios.get('/api/Hello/countA', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(result => setAbsentCount(result.data))
      .catch(err => console.log(err));
  };

  const LateCount = async () => {
    const token = await AsyncStorage.getItem('token');
    myAxios.get('/api/Hello/countL', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(result => setLateCount(result.data))
      .catch(err => console.log(err));
  };

  const HalfDayCount = async () => {
    const token = await AsyncStorage.getItem('token');
    myAxios.get('/api/Hello/countH', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(result => setHalfDayCount(result.data))
      .catch(err => console.log(err));
  };

  const PaidLeaveCount = async () => {
    const token = await AsyncStorage.getItem('token');
    myAxios.get('/api/Hello/countPl', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(result => setPaidLeaveCount(result.data))
      .catch(err => console.log(err));
  };

  const exportCSV = async () => {
    const csvData = records.map(record => ({
      EmployeeId: record.employeeId,
      Name: record.name,
      Status: statusMap[record.employeeId] || 'Select',
    }));

    const csvContent = [
      ["EmployeeId", "Name", "Status"],
      ...csvData.map(row => [row.EmployeeId, row.Name, row.Status])
    ].map(e => e.join(",")).join("\n");

    const fileUri = `${FileSystem.documentDirectory}AttendanceReport.csv`;
    await FileSystem.writeAsStringAsync(fileUri, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
    await Sharing.shareAsync(fileUri);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Attendance Management</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={exportCSV} style={styles.exportButton}>
          <Text style={styles.exportButtonText}>Export Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Mark All Absent As Present')} style={styles.markAbsentButton}>
          <Text style={styles.markAbsentButtonText}>Mark All Absent As Present</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.label}>Branch</Text>
        <Picker
          style={styles.picker}
          selectedValue={branch} 
          onValueChange={(itemValue) => setBranch(itemValue)}>
          <Picker.Item label="All Branches" value="" />
          {employee.map(emp => (
            <Picker.Item key={emp.employeeId} label={emp.site} value={emp.site} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.label}>Department</Text>
        <Picker
          style={styles.picker}
          selectedValue={department} 
          onValueChange={(itemValue) => setDepartment(itemValue)}>
          <Picker.Item label="All Departments" value="" />
          {category.map(cat => (
            <Picker.Item key={cat.id} label={cat.categoryName} value={cat.categoryName} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.countsContainer}>
          <View style={styles.countBox}>
            <Text style={styles.countText}>{presentCount}</Text>
            <Text style={styles.countLabel}>Present</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countText}>{absentCount}</Text>
            <Text style={styles.countLabel}>Absent</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countText}>{lateCount}</Text>
            <Text style={styles.countLabel}>Late</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countText}>{halfDayCount}</Text>
            <Text style={styles.countLabel}>Half Day</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countText}>{paidLeaveCount}</Text>
            <Text style={styles.countLabel}>Paid Leave</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Name of Employee"
          onChangeText={handleFilter}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Id</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Image</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Name</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Status</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Punch</Text>
          </View>
          {records.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.employeeId}</Text>
              <View style={styles.imageCell}>
                <Image
                  source={{ uri: `${BASE_URL}/api/employee/image/${e.zname}` }}
                  style={styles.employeeImage}
                />
              </View>
              <Text style={styles.tableCell}>{item.name}</Text>
              <View style={styles.statusCell}>
                <Picker
                  style={styles.statusPicker}
                  selectedValue={statusMap[item.employeeId] || 'Select'}
                  onValueChange={value => handleStatusChange(item.employeeId, value)}>
                  {statusOptions.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option} />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity
                onPress={() => handlePunch(item.employeeId, item.name)}
                style={[
                  styles.punchButton,
                  punchRecords[item.employeeId] ? styles.punchOut : styles.punchIn,
                ]}>
                <Text style={styles.punchButtonText}>
                  {punchRecords[item.employeeId] ? 'Punch Out' : 'Punch In'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E3F2FD',
  },
  header: {
    backgroundColor: '#BBDEFB',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  exportButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  markAbsentButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  exportButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
  },
  markAbsentButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
  },
  filterContainer: {
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  dateInput: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    marginVertical: 10,
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  countBox: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#BBDEFB',
    borderRadius: 8,
    width: 100,
    marginHorizontal: 10,
    elevation: 2,
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  countLabel: {
    fontSize: 10,
    color: '#555',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  table: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#BBDEFB',
    padding: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#0D47A1',
    width: 120,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 14,
    width: 120,
    padding: 4,
  },
  imageCell: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    padding: 4,
  },
  employeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statusCell: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusPicker: {
    width: '100%',
    height: 40,
  },
  punchButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    minWidth: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  punchIn: {
    backgroundColor: '#4CAF50',
  },
  punchOut: {
    backgroundColor: '#F44336',
  },
  punchButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default Attendance;