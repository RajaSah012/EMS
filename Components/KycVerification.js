import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';  // Importing LinearGradient for gradient background

const KycVerification = () => {
    const [employee, setEmployee] = useState([]);
    const [records, setRecords] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        axios
            .get("https://emspro-production.up.railway.app/api/employee/")
            .then((result) => {
                if (result.data) {
                    setEmployee(result.data);
                    setRecords(result.data);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleFilter = (text) => {
        setRecords(employee.filter(f => f.name.toLowerCase().includes(text.toLowerCase())));
    };

    return (
        <LinearGradient
            colors={['#8EC5FC', '#E0C3FC']} // Beautiful two-color gradient
            style={styles.container}
        >
            <Text style={styles.headerText}>Do KYC Verification</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search Name of employee"
                    placeholderTextColor="#aaa"
                    onChangeText={handleFilter}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tableContainer}>
                <ScrollView horizontal>
                    <View>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Id</Text>
                            <Text style={styles.tableHeaderText}>Name</Text>
                            <Text style={styles.tableHeaderText}>Designation</Text>
                            <Text style={styles.tableHeaderText}>Salary</Text>
                            <Text style={styles.tableHeaderText}>KYC Status</Text>
                            <Text style={styles.tableHeaderText}>Action</Text>
                        </View>

                        {/* Table Data */}
                        <ScrollView>
                            {records.map((e) => (
                                <View key={e.employeeId} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{e.employeeId}</Text>
                                    <Text style={styles.tableCell}>{e.name}</Text>
                                    <Text style={styles.tableCell}>{e.category}</Text>
                                    <Text style={styles.tableCell}>{e.salary}</Text>
                                    <Text style={styles.tableCell}>{e.KycStatus}Pending</Text>
                                    <View style={styles.actionButtons}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => navigation.navigate('kycUpdate', { employeeId: e.employeeId })}
                                        >
                                            <Text style={styles.buttonText}>Do KYC</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => navigation.navigate('paySalary', { employeeId: e.employeeId })}
                                        >
                                            <Text style={styles.buttonText}>Pay Salary</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        marginRight: 10,
        height: 40,
    },
    searchButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tableContainer: {
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#4A90E2',
    },
    tableHeaderText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        width: 120,
        padding: 8,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },
    tableCell: {
        textAlign: 'center',
        fontSize: 14,
        width: 120,
        padding: 8,
        color: '#333',
    },
    actionButtons: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#50C878',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default KycVerification;
