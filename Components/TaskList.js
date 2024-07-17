import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskListFilter from './TaskListFilter';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskList = () => {
    const [date, setDate] = useState(new Date());
    const [employee, setEmployee] = useState([]);
    const [employeeCopy, setEmployeeCopy] = useState([]);
    const [openReportFilter, setOpenReportFilter] = useState(false);
    const [openReportFilterSearchText, setOpenReportFilterSearchText] = useState('');
    const [filterbyDepartment, setFilterbyDepartment] = useState('');
    const [filterbySite, setFilterbySite] = useState('');
    const [filterbyShift, setFilterbyShift] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');
            axios.get("https://emsproject-production.up.railway.app/api/employee/", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((result) => {
                    if (result.data) {
                        setEmployee(result.data);
                        setEmployeeCopy(result.data);
                    } else {
                        alert(result.data.Error);
                    }
                })
                .catch((err) => console.log(err));
        };

        fetchData();
    }, []);

    useEffect(() => {
        setEmployee(employeeCopy.filter(f => f.name.toLowerCase().includes(openReportFilterSearchText.toLowerCase())));
    }, [openReportFilterSearchText]);

    useEffect(() => {
        setEmployee(employeeCopy.filter(f => f.department === filterbyDepartment));
    }, [filterbyDepartment]);

    useEffect(() => {
        setEmployee(employeeCopy.filter(f => f.site === filterbySite));
    }, [filterbySite]);

    useEffect(() => {
        setEmployee(employeeCopy.filter(f => f.shift == filterbyShift));
    }, [filterbyShift]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Task Management</Text>
                <View style={styles.headerButtons}>
                    <Text style={styles.dateText}>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</Text>
                    <TouchableOpacity onPress={() => setOpenReportFilter(prev => !prev)}>
                        <Icon name="filter" size={24} color="#007bff" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView horizontal={true}>
            <ScrollView horizontal>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Id</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Employee Name</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Task Id</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Task Name</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Task Status</Text>
                    </View>
                    {employee.map((item) => (
                        <View key={item.employeeId} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.employeeId}</Text>
                            <Text style={styles.tableCell}>{item.name}</Text>
                            <Text style={styles.tableCell}>{item.taskId}</Text>
                            <Text style={styles.tableCell}>{item.taskName}</Text>
                            <Text style={styles.tableCell}>{item.status}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            </ScrollView>
            {openReportFilter && (
                <TaskListFilter
                    setOpenReportFilterSearchText={setOpenReportFilterSearchText}
                    setFilterbyDepartment={setFilterbyDepartment}
                    setFilterbySite={setFilterbySite}
                    setFilterbyShift={setFilterbyShift}
                    onClose={() => setOpenReportFilter(false)}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        marginRight: 10,
    },
    table: {
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e3f2fd',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeaderText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        color: '#0d47a1',
        width: 120,
    },
    fixedHeaderText: {
        minWidth: 120,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableCell: {
        textAlign: 'center',
        fontSize: 14,
        width: 120,
        padding: 4,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
});

export default TaskList;
