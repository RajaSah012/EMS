import React, { useEffect, useState, useCallback } from "react";
import { View, Alert, FlatList, StyleSheet } from "react-native";
import { Button, Card, Text, FAB, IconButton, Appbar } from "react-native-paper";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigation = useNavigation();

  const fetchEmployees = async ()=> {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://emsproject-production.up.railway.app/api/employee/",
         {
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
      })
      .catch((err) => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this employee?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => confirmDelete(id) }
      ]
    );
  };
  
  const confirmDelete = (id) => {
    axios
      .delete(`https://emsproject-production.up.railway.app/api/employee/${id}`)
      .then((result) => {
        if (result.data) {
          setEmployee(employee.filter((emp) => emp.employeeId !== id));
        } else {
          Alert.alert(result.data.Error);
        }
      });
  };
  
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={`ID: ${item.employeeId}`}
        right={(props) => (
          <View style={styles.actions}>
            <IconButton {...props} icon="pencil" onPress={() => navigation.navigate('EditEmployee', { id: item.employeeId })} />
            <IconButton {...props} icon="delete" color="red" onPress={() => handleDelete(item.employeeId)} />
          </View>
        )}
      />
      <Card.Content>
        <Text>Email: {item.email}</Text>
        <Text>Address: {item.address}</Text>
        <Text>Salary: {item.salary}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Employee Management" />
      </Appbar.Header>
      <FlatList
        data={employee}
        keyExtractor={(item) => item.employeeId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddEmployee')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    marginVertical: 8,
  },
  actions: {
    flexDirection: "row",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Employee;
