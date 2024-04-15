import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');
const TABLE_COLUMN_WIDTH = width * 0.2;

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.filterContainer}>
          <View style={styles.filterItem}>
            <Picker style={styles.picker}>
              <Picker.Item label="All Notifications" value="" />
              {category.map((c) => (
                <Picker.Item key={c.id} label={c.name} value={c.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.filterItem}>
            <Picker style={styles.picker}>
              <Picker.Item label="All Branches" value="" />
              {admins.map((a) => (
                <Picker.Item key={a.id} label={a.name} value={a.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.filterItem}>
            <Picker style={styles.picker}>
              <Picker.Item label="All Departments" value="" />
              {category.map((c) => (
                <Picker.Item key={c.id} label={c.name} value={c.id} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={[styles.filterItem, styles.input]}
            placeholder="All Employees"
            onChangeText={handleFilter}
          />
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, { width: TABLE_COLUMN_WIDTH }]}>EMPLOYEE NAME</Text>
            <Text style={[styles.tableHeader, { width: TABLE_COLUMN_WIDTH }]}>BRANCH</Text>
            <Text style={[styles.tableHeader, { width: TABLE_COLUMN_WIDTH }]}>DEPARTMENT</Text>
            <Text style={[styles.tableHeader, { width: TABLE_COLUMN_WIDTH }]}>APP USING STATUS</Text>
            <Text style={[styles.tableHeader, { width: TABLE_COLUMN_WIDTH }]}>LAST STATUS</Text>
          </View>
          {records.map((e) => (
            <View key={e.id} style={styles.tableRow}>
              <Text numberOfLines={1} style={[styles.tableData, { width: TABLE_COLUMN_WIDTH }]}>{e.name}</Text>
              <Text numberOfLines={1} style={[styles.tableData, { width: TABLE_COLUMN_WIDTH }]}>{e.branch}</Text>
              <Text numberOfLines={1} style={[styles.tableData, { width: TABLE_COLUMN_WIDTH }]}>{e.department}</Text>
              <Text numberOfLines={1} style={[styles.tableData, { width: TABLE_COLUMN_WIDTH }]}>Not Logged In</Text>
              <Text numberOfLines={1} style={[styles.tableData, { width: TABLE_COLUMN_WIDTH }]}>{e.lastStatus}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    height: 40,
  },
  picker: {
    flex: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 5,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableData: {
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export default Notification;
