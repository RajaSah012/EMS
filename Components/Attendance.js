import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';

const Attendance = () => {
    const [date, setDate] = useState(new Date());
    const [admins, setAdmins] = useState([]);
    const [category, setCategory] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [records, setRecords] = useState([]);
    const [punchIn, setPunchIn] = useState('');
    const [punchOut, setPunchOut] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        AdminRecords();
    }, []);

    const AdminRecords = () => {
        axios.get('http://localhost:3000/auth/admin_records')
            .then(result => {
                if (result.data.Status) {
                    setAdmins(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            });
    };

    useEffect(() => {
        axios.get("http://localhost:3000/auth/category")
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3000/auth/employee")
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                    setRecords(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleFilter = (text) => {
        const filteredRecords = employee.filter(emp => emp.name.toLowerCase().includes(text.toLowerCase()));
        setRecords(filteredRecords);
    };

    const handlePunchIn = (time) => {
        setPunchIn(time);
        console.log(`Punch In Time: ${time}`);
    };

    const handlePunchOut = (time) => {
        setPunchOut(time);
        console.log(`Punch Out Time: ${time}`);
    };

    const handleStatus = (status) => {
        setStatus(status);
        console.log(`Status: ${status}`);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Text>Branch</Text>
                        <View style={styles.dropdown}>
                            {/* Dropdown for branches */}
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Department</Text>
                        <View style={styles.dropdown}>
                            {/* Dropdown for departments */}
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Date</Text>
                        <TextInput
                            style={styles.input}
                            value={date.toDateString()} // Assuming date is of Date type
                            onChangeText={(text) => setDate(new Date(text))}
                            placeholder="Select Date"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button}>
                        <Text>Mark All Absent As Present</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text>Daily Report</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.statsRow}>
                    {/* Statistics */}
                </View>
                <View style={styles.row}>
                    <View style={styles.searchInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search Name of Employee"
                            onChangeText={handleFilter}
                        />
                        <TouchableOpacity style={styles.button}>
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text>Export Attendance</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {/* Table */}
                    <ScrollView horizontal>
                        <View>
                            {/* Table */}
                            <Text>Table Goes Here</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        marginRight: 10,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsRow: {
        // Styles for statistics row
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Attendance;
