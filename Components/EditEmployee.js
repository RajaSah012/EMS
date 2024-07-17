import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const EditEmployee = ({ route, navigation }) => {
  const { id } = route.params;
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('https://emsproject-production.up.railway.app/api/category/')
      .then(result => {
        if (result.data) {
          setCategory(result.data);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));

    axios.get(`https://emsproject-production.up.railway.app/api/employee/${id}`)
      .then(result => {
        const data = result.data;
        setEmployee({
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
          salary: data.salary !== undefined ? data.salary.toString() : "",
          category_id: data.category_id !== undefined ? data.category_id.toString() : "",
        });
      }).catch(err => console.log(err));
  }, [id]);

  const handleSubmit = () => {
    axios.put(`https://emsproject-production.up.railway.app/api/employee/${id}`, {
      ...employee,
      salary: parseFloat(employee.salary), // Convert salary back to number before sending to API
    })
      .then(result => {
        if (result.data) {
          navigation.navigate('Employee');
        } else {
          alert(result.data);
        }
      }).catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Edit Employee</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={employee.name}
          onChangeText={(text) => setEmployee({ ...employee, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={employee.email}
          onChangeText={(text) => setEmployee({ ...employee, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Salary"
          value={employee.salary}
          onChangeText={(text) => setEmployee({ ...employee, salary: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          value={employee.address}
          onChangeText={(text) => setEmployee({ ...employee, address: text })}
        />
        <Picker
          selectedValue={employee.category_id}
          onValueChange={(itemValue) => setEmployee({ ...employee, category_id: itemValue })}
          style={styles.input}
        >
          {category.map((c) => {
            return <Picker.Item key={c.categoryId} label={c.categoryName} value={c.categoryId.toString()} />;
          })}
        </Picker>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Edit Employee</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EditEmployee;
