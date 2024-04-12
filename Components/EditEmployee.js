import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))

    axios.get(`http://localhost:3000/auth/employee/${id}`)
      .then(result => {
        const employeeData = result.data.Result[0];
        setEmployee({
          name: employeeData.name,
          email: employeeData.email,
          address: employeeData.address,
          salary: employeeData.salary,
          category_id: employeeData.category_id,
        })
      }).catch(err => console.log(err))
  }, [id])

  const handleSubmit = () => {
    axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee)
      .then(result => {
        if (result.data.Status) {
          navigation.navigate('EmployeeList');
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Employee</Text>
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
        onValueChange={(itemValue) =>
          setEmployee({ ...employee, category_id: itemValue })
        }>
        {category.map((c) => (
          <Picker.Item key={c.id} label={c.name} value={c.id} />
        ))}
      </Picker>
      <Button title="Edit Employee" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default EditEmployee;
