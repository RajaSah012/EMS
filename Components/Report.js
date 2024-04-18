import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import { CSV } from 'react-native-csv';
import { MaterialIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const Report = () => {
  const [date, setDate] = useState(new Date());
  const [admins, setAdmins] = useState([]);
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchAdminRecords();
    fetchCategory();
    fetchEmployee();
  }, []);

  const fetchAdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const fetchCategory = () => {
    axios.get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const fetchEmployee = () => {
    axios.get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          setRecords(result.data.Result);
          setFilteredRecords(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleFilter = (text) => {
    const newData = employee.filter((item) => {
      const itemData = item.name.toLowerCase();
      return itemData.indexOf(text.toLowerCase()) > -1;
    });
    setFilteredRecords(newData);
  }

  const downloadCSV = (item) => {
    if (records.length > 0 && records[0].hasOwnProperty('name')) {
      const csvData = [
        {
          name: item.name,
          branch: admins.map((a) => a.name),
          month: 'Jan 2024',
          format: 'XLSX',
          generatedOn: '02-01-2024',
        },
      ];

      const csvOptions = {
        headers: ['name', 'branch', 'month', 'format', 'generatedOn'],
        filename: 'GeneratedReports.csv',
      };

      const csv = new CSV(csvData, csvOptions);

      csv.generate().then((csvString) => {
        console.log(csvString); // CSV string
      });
    } else {
      console.log('Records array is empty or the first element does not have a name property');
    }
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Company Reports</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="insert-chart" size={24} color="black" />
          <Text style={styles.menuText}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="payment" size={24} color="black" />
          <Text style={styles.menuText}>Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="note" size={24} color="black" />
          <Text style={styles.menuText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="people" size={24} color="black" />
          <Text style={styles.menuText}>Employee List</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.tabContainer}>
        <Text style={styles.tabTitle}>Generate Report</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Report Type</Text>
            <RNPickerSelect
              style={{ inputAndroid: styles.input }}
              placeholder={{ label: 'Select Report Type', value: null }}
              onValueChange={(value) => console.log(value)}
              items={admins.map((a) => ({ label: a.name, value: a.id }))}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Select Branch</Text>
            <RNPickerSelect
              style={{ inputAndroid: styles.input }}
              placeholder={{ label: 'Select Branch', value: null }}
              onValueChange={(value) => console.log(value)}
              items={admins.map((a) => ({ label: a.name, value: a.id }))}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Select Department</Text>
            <RNPickerSelect
              style={{ inputAndroid: styles.input }}
              placeholder={{ label: 'Select Department', value: null }}
              onValueChange={(value) => console.log(value)}
              items={category.map((c) => ({ label: c.name, value: c.id }))}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
              <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Format</Text>
            <RNPickerSelect
              style={{ inputAndroid: styles.input }}
              placeholder={{ label: 'Select Format', value: null }}
              onValueChange={(value) => console.log(value)}
              items={[{ label: 'XLSX', value: 'xlsx' }]}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={() => downloadCSV(records[0])}>
          <Text style={styles.generateButtonText}>Generate Report</Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>
          Some reports might take time to generate. Once these are done, you can download all the reports generated from the list below.
        </Text>
      </View>
      <FlatList
        data={filteredRecords}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recordContainer} onPress={() => downloadCSV(item)}>
            <Text style={styles.recordTitle}>{item.name} Daily Attendance Report</Text>
            {admins.length > 0 && (
              <Text style={styles.recordDetail}>Branch: {admins.map((a) => a.name)}</Text>
            )}
            <Text style={styles.recordDetail}>Month: Jan 2024</Text>
            <Text style={styles.recordDetail}>Format: XLSX</Text>
            <Text style={styles.recordDetail}>Generated On: 02-01-2024</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 5,
  },
  tabContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  column: {
    width: '48%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  recordContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recordDetail: {
    fontSize: 16,
  },
});

export default Report;
