import React, { useEffect, useState, useCallback } from "react";
import { View, Alert, FlatList, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Button, Card, Text, FAB, IconButton, Appbar } from "react-native-paper";
import { myAxios } from '../services/helper';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchEmployees = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await myAxios.get("/api/employee/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      Alert.alert("Failed to fetch employees. Please try again.");
    } finally {
      setLoading(false);
    }
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
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => confirmDelete(id) },
      ]
    );
  };

  const confirmDelete = async (id) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await myAxios.delete(`/api/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.employeeId !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      Alert.alert("Failed to delete employee. Please try again.");
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={`ID: ${item.employeeId}`}
        right={(props) => (
          <View style={styles.actions}>
            <IconButton
              {...props}
              icon="pencil"
              onPress={() => navigation.navigate("EditEmployee", { id: item.employeeId })}
            />
            <IconButton
              {...props}
              icon="delete"
              color="red"
              onPress={() => handleDelete(item.employeeId)}
            />
          </View>
        )}
      />
      <Card.Content>
        <View style={styles.content}>
          <Image
            source={{
              uri: `${myAxios.defaults.baseURL}/api/employee/image/${item.zname}`,
            }}
            style={styles.image}
            onError={(e) => console.log(`Image load failed for ${item.zname}`, e.nativeEvent)}
          />
          <View style={styles.details}>
            <Text style={styles.text}>Email: {item.email}</Text>
            <Text style={styles.text}>Address: {item.address}</Text>
            <Text style={styles.text}>Salary: ₹{item.salary}</Text>
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
    <LinearGradient colors={["#FFDEE9", "#B5FFFC"]} style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Employee Management" titleStyle={styles.appbarTitle} />
      </Appbar.Header>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.employeeId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => navigation.navigate("AddEmployee")}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: "transparent",
    elevation: 0,
  },
  appbarTitle: {
    color: "#444",
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
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
    backgroundColor: "#f0f0f0",
  },
  details: {
    flex: 1,
  },
  text: {
    color: "#333",
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#00C6FF",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Employee;
