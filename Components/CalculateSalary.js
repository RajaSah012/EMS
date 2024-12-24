import React, { useEffect, useState, useCallback } from "react";
import { View, Alert, FlatList, StyleSheet, Image, ActivityIndicator, TextInput } from "react-native";
import { Card, Text, Appbar } from "react-native-paper";
import { myAxios, BASE_URL } from '../services/helper';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const CalculateSalary = () => {
  const [employee, setEmployee] = useState([]);
  const [employeeData, setEmployeeData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    const token = await AsyncStorage.getItem('token');
    myAxios
      .get("/api/employee/", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((result) => {
        if (result.data) {
          setEmployee(result.data);
        } else {
          Alert.alert(result.data.Error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [])
  );

  const handleDaysChange = (text, employeeId) => {
    setEmployeeData(prevData => ({
      ...prevData,
      [employeeId]: {
        ...prevData[employeeId],
        workedDays: parseInt(text) || 0
      }
    }));
  };

  const handleOvertimeChange = (text, employeeId) => {
    setEmployeeData(prevData => ({
      ...prevData,
      [employeeId]: {
        ...prevData[employeeId],
        overtimeHours: parseInt(text) || 0
      }
    }));
  };

  const calculateSalary = (baseSalary, employeeId) => {
    const employeeInfo = employeeData[employeeId] || {};
    const days = employeeInfo.workedDays || 0;
    const overtimeHours = employeeInfo.overtimeHours || 0;
    const salaryPerDay = baseSalary / 30; // Assuming a 30-day month
    const overtimeRate = (baseSalary / 240) * 1.5; // Assuming overtime is 1.5x the hourly rate
    const calculatedSalary = (salaryPerDay * days) + (overtimeHours * overtimeRate);
    return calculatedSalary.toFixed(2);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={`ID: ${item.employeeId}`}
      />
      <Card.Content>
        <View style={styles.content}>
          <Image
             source={{ uri: `${BASE_URL}/api/employee/image/${item.zname}` }} 
            style={styles.image}
          />
          <View style={styles.details}>
            <Text style={styles.text}>Email: {item.email}</Text>
            <Text style={styles.text}>Address: {item.address}</Text>
            <Text style={styles.text}>Salary: {item.salary}</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Worked Days"
              keyboardType="numeric"
              value={employeeData[item.employeeId]?.workedDays ? employeeData[item.employeeId].workedDays.toString() : ''}
              onChangeText={text => handleDaysChange(text, item.employeeId)}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Overtime Hours"
              keyboardType="numeric"
              value={employeeData[item.employeeId]?.overtimeHours ? employeeData[item.employeeId].overtimeHours.toString() : ''}
              onChangeText={text => handleOvertimeChange(text, item.employeeId)}
            />

            <Text style={styles.text}>
              Calculated Salary: {calculateSalary(item.salary, item.employeeId)}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00C6FF" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#FFDEE9', '#B5FFFC']}
      style={styles.container}
    >
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Calculate Salary" titleStyle={styles.appbarTitle} />
      </Appbar.Header>
      <FlatList
        data={employee}
        keyExtractor={(item) => item.employeeId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  appbarTitle: {
    color: '#444',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  text: {
    color: '#333',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CalculateSalary;
