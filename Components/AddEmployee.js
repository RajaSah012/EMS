import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    category_id: '',
  });
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://emsproject-production.up.railway.app/api/category/')
      .then(result => {
        if (result.data) {
          setCategories(result.data);
        } else {
          Alert.alert('Error', result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (name, value) => {
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    axios.post('https://emsproject-production.up.railway.app/api/employee/', employee, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        if (result.data) {
          // Clear the fields after adding an employee
          setEmployee({
            name: '',
            email: '',
            password: '',
            salary: '',
            address: '',
            category_id: '',
          });
          navigation.navigate('Employee'); // Assuming you have an Employee screen
        } else {
          Alert.alert('Error', result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const updateCategory = (categoryId) => {
    setEmployee(prevState => ({
      ...prevState,
      category_id: categoryId
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Employee</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={employee.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={employee.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={employee.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Salary"
        value={employee.salary}
        onChangeText={(value) => handleInputChange('salary', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={employee.address}
        onChangeText={(value) => handleInputChange('address', value)}
      />
      <Picker
        selectedValue={employee.category_id}
        style={styles.input}
        onValueChange={(itemValue) => updateCategory(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((c) => (
          <Picker.Item key={c.categoryId ? c.categoryId.toString() : ''} label={c.categoryName} value={c.categoryId ? c.categoryId.toString() : ''} />
        ))}
      </Picker>
      <Button title="Add Employee" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddEmployee;
