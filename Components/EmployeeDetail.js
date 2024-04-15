import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import axios from 'axios';

const EmployeeDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employee/detail/${id}`);
        setEmployee(response.data); // Assuming response.data contains employee details
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [id]);

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employee/logout');
      if (response.data.Status) {
        // localStorage.removeItem("valid")
        navigation.navigate('Login'); // Assuming you have a 'Login' screen
        console.log("logout");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!employee) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>Employee Management System</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image
          source={{ uri: `http://localhost:3000/Images/${employee.image}` }}
          style={{ width: 200, height: 200, borderRadius: 100 }}
        />
        <View style={{ marginTop: 20 }}>
          <Text>Name: {employee.name}</Text>
          <Text>Email: {employee.email}</Text>
          <Text>Salary: ${employee.salary}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Button title="Edit" onPress={() => {}} />
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};

export default EmployeeDetail;
