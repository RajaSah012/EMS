import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/employee')
      .then((response) => {
        const data = response.data;
        if (data.Status) {
          setEmployee(data.Result);
        } else {
          Alert.alert('Error', data.Error);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then((response) => {
        const result = response.data;
        if (result.Status) {
          // Reload or update the employee list
          // Implement your logic here
        } else {
          Alert.alert('Error', result.Error);
        }
      })
      .catch((error) => console.log(error));
  };

  const navigateToAddEmployee = () => {
    navigation.navigate('AddEmployee'); // Replace 'AddEmployee' with your screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={navigateToAddEmployee}>
          <Text style={styles.buttonText}>Add Employee</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Add Multiple Employee</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.employeeList}>
        {employee.map((e) => (
          <View key={e.id} style={styles.employeeItem}>
            <Text style={styles.field}>Name: {e.name}</Text>
            {e.image ? (
              <Image source={{ uri: `http://localhost:3000/Images/${e.image}` }} style={styles.employeeImage} />
            ) : (
              <View style={styles.defaultImage}>
                <Text>No Image</Text>
              </View>
            )}
            <Text style={styles.field}>Email: {e.email}</Text>
            <Text style={styles.field}>Address: {e.address}</Text>
            <Text style={styles.field}>Salary: {e.salary}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(e.id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  employeeList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  employeeItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  employeeImage: {
    width: 100,
    height: 100,
  },
  defaultImage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  field: {
    marginBottom: 5,
  },
});

export default Employee;
