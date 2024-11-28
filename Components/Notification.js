import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';

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
    <Animatable.View
      animation="fadeIn"
      duration={1000}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animatable.View animation="slideInDown" style={styles.filterContainer}>
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
            placeholder="Search Employee"
            onChangeText={handleFilter}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.table}>
          {records.map((e) => (
            <Animatable.View
              key={e.id}
              animation="zoomIn"
              delay={100 * e.id}
              style={styles.notificationCard}
            >
              <Text style={styles.cardTitle}>{e.name}</Text>
              <Text style={styles.cardDetails}>
                Branch: {e.branch} | Department: {e.department}
              </Text>
              <Text style={styles.cardStatus}>Status: {e.lastStatus || 'Not Logged In'}</Text>
            </Animatable.View>
          ))}
        </Animatable.View>
      </ScrollView>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F9',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200EE',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  filterItem: {
    flex: 1,
    minWidth: '48%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
  },
  input: {
    padding: 10,
  },
  table: {
    marginTop: 10,
  },
  notificationCard: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6200EE',
  },
});

export default Notification;
