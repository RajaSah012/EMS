import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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

  let time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  };
  setInterval(updateTime, 1000);

  const [status, setStatus] = useState('Select');

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
    
    // Determine current status based on state
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
            setStatus('Punch Out'); // Update status after successful punch in
            navigation.navigate('/dashboard/attendence');
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
            setStatus('Punch In'); // Update status after successful punch out
            navigation.navigate('/dashboard/attendence');
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

      <FlatList
        data={records}
        keyExtractor={(item) => item.employeeId.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
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
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  picker: {
    width: '30%',
    height: 40,
  },
  dateInput: {
    width: '30%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  tableCell: {
    width: '20%',
    textAlign: 'center',
  },
  employeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  punchButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
});

export default Attendance;
