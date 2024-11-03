import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const employeeId = await AsyncStorage.getItem('employeeId');
                const result = await axios.get(`https://emspro-production.up.railway.app/api/employee/${employeeId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setEmployee(result.data);
            } catch (err) {
                console.error("Error fetching employee details", err);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        // Perform logout action
        navigation.navigate('Login'); // Navigate to Login screen
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/Images/pay-emp-bg.png')} style={styles.logo} />
                <Text style={styles.title}>STAFF WORLD</Text>
                <Text style={styles.subtitle}>An Employee Management System</Text>
            </View>

            <View style={styles.profileSection}>
                <Image
                    source={require('../assets/Images/pay-emp-bg.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{employee.name}</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.navigation}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.navButton}>
                    <Text style={styles.navText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MarkAttendance')} style={styles.navButton}>
                    <Text style={styles.navText}>Mark Attendance</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ViewAttendance')} style={styles.navButton}>
                    <Text style={styles.navText}>View Attendance</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('RequestLeave')} style={styles.navButton}>
                    <Text style={styles.navText}>Request Leaves</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('HolidayList')} style={styles.navButton}>
                    <Text style={styles.navText}>Holiday List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MyDocuments')} style={styles.navButton}>
                    <Text style={styles.navText}>My Documents</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Tasks')} style={styles.navButton}>
                    <Text style={styles.navText}>Tasks</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Copyright © Acetech Work Organization Pvt. Ltd. 2024.</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logo: {
        width: 100,
        height: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#777',
    },
    profileSection: {
        padding: 16,
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#f00',
        padding: 10,
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
    },
    navigation: {
        padding: 16,
        backgroundColor: '#fff',
    },
    navButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    navText: {
        fontSize: 16,
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#777',
    },
});

export default EmployeeDetail;
