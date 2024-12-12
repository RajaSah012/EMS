import { myAxios } from '../services/helper';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskListFilter from './TaskListFilter';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskList = () => {
    const [date, setDate] = useState(new Date());
    const [employee, setEmployee] = useState([]);
    const [employeeCopy, setEmployeeCopy] = useState([]);
    const [task, setTask] = useState([]);
    const [openReportFilter, setOpenReportFilter] = useState(false);
    const [openReportFilterSearchText, setOpenReportFilterSearchText] = useState('');
    const [filterbyDepartment, setFilterbyDepartment] = useState('');
    const [filterbySite, setFilterbySite] = useState('');
    const [filterbyShift, setFilterbyShift] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const employeeResult = await myAxios.get("/api/employee/", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (employeeResult.data) {
                    setEmployee(employeeResult.data);
                    setEmployeeCopy(employeeResult.data);
                }

                const taskResult = await myAxios.get("/api/tasks", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (taskResult.data) {
                    console.log('Task Data:', taskResult.data);
                    setTask(taskResult.data);
                }
            } catch (err) {
                console.log(err);
            }
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

    // Improved formatDate function with error handling and validation
    const formatDate = (dateArray, options = {}) => {
        try {
            // Check if dateArray is an array with 3 elements: year, month, and day
            if (!Array.isArray(dateArray) || dateArray.length !== 3) {
                console.log("Invalid date format:", dateArray);
                return "N/A";
            }
            const [year, month, day] = dateArray;
            // Create a date object
            const date = new Date(year, month - 1, day);
            // Check if the date is valid
            if (isNaN(date.getTime())) {
                console.log("Invalid date value:", dateArray);
                return "N/A";
            }
            // Format the date
            return new Intl.DateTimeFormat('en-GB', options).format(date);
        } catch (error) {
            console.log('Date formatting error:', error);
            return "N/A";
        }
    };

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
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Id</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Employee Name</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Task Id</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Task Name</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Assign Date</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Completed Date</Text>
                        <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Task Status</Text>
                    </View>
                    {task.map((e) => (
                        <View key={e.taskId} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{e.employeeId}</Text>
                            <Text style={styles.tableCell}>{e.name}</Text>
                            <Text style={styles.tableCell}>{e.taskId}</Text>
                            <Text style={styles.tableCell}>{e.taskName}</Text>
                            <Text style={styles.tableCell}>{formatDate(e.assign, { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
                            <Text style={styles.tableCell}>{e.assign ? formatDate(e.assign, { day: 'numeric', month: 'short', year: 'numeric',hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,}) : "N/A"}</Text>
                            <Text style={styles.tableCell}>{e.status}</Text>
                        </View>
                    ))}
                </View>
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
