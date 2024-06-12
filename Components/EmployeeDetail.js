import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(result => {
        setEmployee(result.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          navigation.navigate('Home');
          console.log("logout");
        }
      }).catch(err => console.log(err));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee Management System</Text>
      </View>
      <View style={styles.content}>
        <Image 
          source={{ uri: `http://localhost:3000/Images/${employee.image}` }} 
          style={styles.image} 
        />
        <View style={styles.details}>
          <Text style={styles.detailText}>Name: {employee.name}</Text>
          <Text style={styles.detailText}>Email: {employee.email}</Text>
          <Text style={styles.detailText}>Salary: ${employee.salary}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]} 
            onPress={() => navigation.navigate('EditEmployee', { id })}
          >
            <Icon name="pencil" size={20} color="#fff" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <Icon name="log-out" size={20} color="#fff" />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 40,
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#4CAF50',
  },
  details: {
    marginTop: 20,
    alignItems: 'center',
  },
  detailText: {
    fontSize: 20,
    marginVertical: 5,
    color: '#333',
  },
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    width: '45%',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  logoutButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EmployeeDetail;
