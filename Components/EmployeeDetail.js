import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EmployeeDetail = ({ route, navigation }) => {
  const [employee, setEmployee] = useState({});
  const { id } = route.params || {};

  useEffect(() => {
    // Check if id exists before making the API call
    if (id) {
      axios.get(`http://localhost:3000/employee/detail/${id}`)
        .then(response => {
          setEmployee(response.data[0]);
        })
        .catch(error => console.log(error));
    } else {
      console.log('No id provided.');
    }
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(response => {
        if (response.data.Status) {
          // You can handle any necessary logic for successful logout here
          navigation.navigate('Login'); // Assuming your login screen is named 'Login'
          console.log("logout");
        }
      })
      .catch(error => console.log(error));
  };

  const handleEdit = () => {
    // Navigate to the edit screen with the employee id
    navigation.navigate('EditEmployee', { id: employee.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee Details</Text>
      </View>
      <View style={styles.content}>
        <Image source={{ uri: `http://localhost:3000/Images/${employee.image}` }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailText}>{employee.name}</Text>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailText}>{employee.email}</Text>
          <Text style={styles.detailLabel}>Salary:</Text>
          <Text style={styles.detailText}>{employee.salary}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  details: {
    marginBottom: 20,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 18,
    color: '#555',
  },
  detailText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#1E90FF',
  },
  logoutButton: {
    backgroundColor: '#FF6347',
  },
});


export default EmployeeDetail;
