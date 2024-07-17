import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EmployeeDetail = ({ route, navigation }) => {
    const { id } = route.params || {};
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/employee/detail/${id}`)
                .then(response => {
                    setEmployee(response.data[0]);
                })
                .catch(error => {
                    console.log('Axios Error:', error);
                    // Handle error state or navigation here
                });
        }
    }, [id]);

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
            .then(response => {
                if (response.data.Status) {
                    navigation.navigate('Home'); // Replace 'Home' with your actual home screen route name
                    console.log("logout");
                }
            })
            .catch(error => console.log('Axios Error:', error));
    };

    if (!id) {
        return (
            <View style={styles.container}>
                <Text>No employee ID provided.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Employee Management System</Text>
            </View>
            <View style={styles.content}>
                <Image source={{ uri: `http://localhost:3000/Images/${employee.image}` }} style={styles.employeeImage} />
                <View style={styles.employeeDetails}>
                    <Text style={styles.detailText}>Name: {employee.name}</Text>
                    <Text style={styles.detailText}>Email: {employee.email}</Text>
                    <Text style={styles.detailText}>Salary: ${employee.salary}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Edit" onPress={() => { /* Handle Edit functionality */ }} />
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
    },
    content: {
        alignItems: 'center',
    },
    employeeImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    employeeDetails: {
        alignItems: 'center',
        marginBottom: 20,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
});

export default EmployeeDetail;
