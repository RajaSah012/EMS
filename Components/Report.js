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
    axios.get('https://emsproject-production.up.railway.app/api/category/')
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
    axios.get('https://emsproject-production.up.railway.app/api/category/')
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
    axios.get('https://emsproject-production.up.railway.app/api/employee/')
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
      <Text style={styles.header}>Company Reports</Text>
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.tabText}>Attendance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Employee List</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <View style={styles.filterColumn}>
            <Text style={styles.filterLabel}>Report Type</Text>
            <RNPickerSelect
              style={{ inputAndroid: styles.input }}
              placeholder={{ label: 'Select Report Type', value: null }}
              onValueChange={(value) => console.log(value)}
              items={admins.map((a) => ({ label: a.name, value: a.id }))}
            />
          </View>
          <View style={styles.filterColumn}>
            <Text style={styles.filterLabel}>Select Branch</Text>
            <RNPickerSelect
              style={{ inputAndroid: styles.input }}
              placeholder={{ label: 'All Branches', value: null }}
              onValueChange={(value) => console.log(value)}
              items={admins.map((a) => ({ label: a.name, value: a.id }))}
            />
          </View>
        </View>
        <View style={styles.filterRow}>
          <View style={styles.filterColumn}>
            <Text style={styles.filterLabel}>Select Department</Text>
            <RNPickerSelect
              style={{ inputAndroid: styles.input }}
              placeholder={{ label: 'All Departments', value: null }}
              onValueChange={(value) => console.log(value)}
              items={category.map((c) => ({ label: c.name, value: c.id }))}
            />
          </View>
          <View style={styles.filterColumn}>
            <Text style={styles.filterLabel}>Date</Text>
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
        </View>
        <View style={styles.filterRow}>
          <View style={styles.filterColumn}>
            <Text style={styles.filterLabel}>Format</Text>
            <RNPickerSelect
              style={{ inputAndroid: styles.input }}
              placeholder={{ label: 'XLSX', value: null }}
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
      <View style={styles.recentReportsContainer}>
        <Text style={styles.recentReportsTitle}>Recent Reports</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8E9E9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  tabContainer: {
    marginBottom: 20,
  },
  tabScroll: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E9E3E3',
    borderRadius: 5,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#FF9F9F',
  },
  tabText: {
    fontSize: 16,
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#CCC',
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
  },
  generateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  recentReportsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
  },
  recentReportsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recordContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
    marginBottom: 10,
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
