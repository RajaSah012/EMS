import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const [admins, setAdmins] = useState([]);
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState('Select');
  const navigation = useNavigation();

  useEffect(() => {
    AdminRecords();
  }, []);

  const AdminRecords = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://emsproject-production.up.railway.app/auth/getUsers/", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data) {
          setAdmins(result.data);
        } else {
          alert(result.data.Error);
        }
      });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const token = await AsyncStorage.getItem('token');
      axios
        .get("https://emsproject-production.up.railway.app/api/category/", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then((result) => {
          if (result.data) {
            setCategory(result.data);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
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
            setRecords(result.data);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchEmployee();
  }, []);

  const handleFilter = (text) => {
    setRecords(employee.filter(f => f.name.toLowerCase().includes(text.toLowerCase())));
  };

  const status_1 = [
    { option1: 'Select' },
    { option1: 'Present' },
    { option1: 'Absent' },
    { option1: 'Late' },
    { option1: 'Half Day' },
    { option1: 'Paid Leave' }
  ];

  const handleStatus = (value) => {
    setStatus(value);
  };

  const handleDate = (value) => {
    setDate(new Date(value));
  };

  const handlePunch = async (employeeId, name) => {
    const token = await AsyncStorage.getItem('token');
    
    const currentStatus = status === 'Punch In' ? 'Punch Out' : 'Punch In';
  
    if (currentStatus === 'Punch In') {
      axios.post('https://emsproject-production.up.railway.app/auth/attendence/', 
        { name, employeeId, punchIn: new Date().toLocaleString() },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(result => {
          if (result.data.Status) {
            setStatus('Punch Out'); 
            navigation.navigate('/attendance');
          } else {
            alert(result.data.Error);
          }
        }).catch(err => console.log(err));
    } else {
      axios.put(`https://emsproject-production.up.railway.app/auth/attendence/${employeeId}`, 
        { punchOut: new Date().toLocaleString() },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(result => {
          if (result.data.Status) {
            setStatus('Punch In'); 
            navigation.navigate('/attendance');
          } else {
            alert(result.data.Error);
          }
        }).catch(err => console.log(err));
    }
  };
  

  const generateCSV = async () => {
    const header = ['Employee ID', 'Name', 'Status'];
    const csvData = records.map(record => [record.employeeId, record.name, status]);

    const csvString = [header, ...csvData].map(e => e.join(",")).join("\n");

    const path = FileSystem.documentDirectory + 'DailyReports.csv';

    await FileSystem.writeAsStringAsync(path, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    Sharing.shareAsync(path, {
      mimeType: 'text/csv',
      dialogTitle: 'Share Daily Report CSV',
      UTI: 'public.comma-separated-values-text',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue="All Branches"
          style={styles.picker}
          onValueChange={(itemValue) => console.log(itemValue)}
        >
          <Picker.Item label="All Branches" value="All Branches" />
          {admins.map((a) => (
            <Picker.Item key={a.id} label={a.name} value={a.id} />
          ))}
        </Picker>

        <Picker
          selectedValue="All Departments"
          style={styles.picker}
          onValueChange={(itemValue) => console.log(itemValue)}
        >
          <Picker.Item label="All Departments" value="All Departments" />
          {category.map((c) => (
            <Picker.Item key={c.id} label={c.categoryName} value={c.id} />
          ))}
        </Picker>

        <TextInput
          style={styles.dateInput}
          onChangeText={handleDate}
          value={date.toISOString().split('T')[0]}
          placeholder="Select Date"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Mark All Absent As Present" onPress={() => console.log('Mark All')} />
        <Button title="Daily Report" onPress={generateCSV} />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statText}>0</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statText}>0</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statText}>0</Text>
          <Text style={styles.statLabel}>Late</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statText}>0</Text>
          <Text style={styles.statLabel}>Half Day</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statText}>0</Text>
          <Text style={styles.statLabel}>Paid Leave</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Name of Employee"
          onChangeText={handleFilter}
        />
        <Button title="Search" onPress={() => console.log('Search')} />
      </View>
      <Button title="Export Attendance" onPress={generateCSV} /> 

      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Emp Id</Text>
          <Text style={styles.tableHeaderText}>Image</Text>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
          <Text style={styles.tableHeaderText}>Punch</Text>
        </View>
        {records.map((item) => (
          <View key={item.employeeId} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.employeeId}</Text>
            <Image source={{ uri: `http://localhost:3000/Images/` + item.image }} style={styles.employeeImage} />
            <Text style={styles.tableCell}>{item.name}</Text>
            <Picker
              selectedValue={status}
              style={styles.tableCell}
              onValueChange={handleStatus}
            >
              {status_1.map((stat, index) => (
                <Picker.Item key={index} label={stat.option1} value={stat.option1} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => handlePunch(item.employeeId, item.name)}
              style={styles.punchButton}
            >
              <Text>Punch In</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 40,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  dateInput: {
    flex: 1,
    height: 40,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  statBox: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  tableContainer: {
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    borderRadius: 8,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  employeeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  punchButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default Attendance;
