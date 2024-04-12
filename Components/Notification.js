import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const Notification = () => {
  const [admins, setAdmins] = useState([]);
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminResponse = await axios.get('http://localhost:3000/auth/admin_records');
        if (adminResponse.data.Status) {
          setAdmins(adminResponse.data.Result);
        } else {
          alert(adminResponse.data.Error);
        }

        const categoryResponse = await axios.get('http://localhost:3000/auth/category');
        if (categoryResponse.data.Status) {
          setCategory(categoryResponse.data.Result);
        } else {
          alert(categoryResponse.data.Error);
        }

        const employeeResponse = await axios.get('http://localhost:3000/auth/employee');
        if (employeeResponse.data.Status) {
          setEmployee(employeeResponse.data.Result);
          setRecords(employeeResponse.data.Result);
        } else {
          alert(employeeResponse.data.Error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (text) => {
    setRecords(employee.filter((e) => e.name.toLowerCase().includes(text.toLowerCase())));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.filterContainer}>
          <View style={styles.filterItem}>
            <Picker style={{ flex: 1 }}>
              <Picker.Item label="All Notifications" value="" />
              {category.map((c) => (
                <Picker.Item key={c.id} label={c.name} value={c.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.filterItem}>
            <Picker style={{ flex: 1 }}>
              <Picker.Item label="All Branches" value="" />
              {admins.map((a) => (
                <Picker.Item key={a.id} label={a.name} value={a.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.filterItem}>
            <Picker style={{ flex: 1 }}>
              <Picker.Item label="All Departments" value="" />
              {category.map((c) => (
                <Picker.Item key={c.id} label={c.name} value={c.id} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={[styles.filterItem, { flex: 1 }]}
            placeholder="All Employees"
            onChangeText={handleFilter}
          />
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>EMPLOYEE NAME</Text>
            <Text style={styles.tableHeader}>BRANCH</Text>
            <Text style={styles.tableHeader}>DEPARTMENT</Text>
            <Text style={styles.tableHeader}>APP USING STATUS</Text>
            <Text style={styles.tableHeader}>LAST STATUS</Text>
          </View>
          {records.map((e) => (
            <View key={e.id} style={styles.tableRow}>
              <Text style={styles.tableData}>{e.name}</Text>
              {/* Render branch, department, app status, and last status similarly */}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  table: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableData: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Notification;
