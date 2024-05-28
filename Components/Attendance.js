import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const Attendance = () => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [category, setCategory] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [records, setRecords] = useState([]);
    const [punchIn, setPunchIn] = useState({});
    const [punchOut, setPunchOut] = useState({});
    const [status, setStatus] = useState({});
    const statusOptions = ['Select', 'Present', 'Absent', 'Late', 'Half Day', 'Paid Leave'];

    useEffect(() => {
        AdminRecords();
        fetchCategories();
        fetchEmployees();
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

    const fetchCategories = () => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    const fetchEmployees = () => {
        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                    setRecords(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    const handleFilter = (event) => {
        setRecords(employee.filter(f => f.name.toLowerCase().includes(event.toLowerCase())));
    };

    const handlePunchIn = (value, id) => {
        setPunchIn(prevState => ({ ...prevState, [id]: value }));
    };

    const handlePunchOut = (value, id) => {
        setPunchOut(prevState => ({ ...prevState, [id]: value }));
    };

    const handleStatus = (value, id) => {
        setStatus(prevState => ({ ...prevState, [id]: value }));
    };

    const handleDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleExportCSV = async (data, filename) => {
        const csvData = csv(data);
        const fileUri = FileSystem.documentDirectory + `${filename}.csv`;
        await FileSystem.writeAsStringAsync(fileUri, csvData, { encoding: FileSystem.EncodingType.UTF8 });
        await Sharing.shareAsync(fileUri);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.filterContainer}>
                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Branch</Text>
                    <Picker selectedValue="" onValueChange={() => {}} style={styles.picker}>
                        <Picker.Item label="All Branches" value="" />
                        {admins.map((a) => (
                            <Picker.Item key={a.id} label={a.name} value={a.id} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Department</Text>
                    <Picker selectedValue="" onValueChange={() => {}} style={styles.picker}>
                        <Picker.Item label="All Departments" value="" />
                        {category.map((c) => (
                            <Picker.Item key={c.id} label={c.name} value={c.id} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                        <Text>{date.toISOString().split('T')[0]}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDate}
                        />
                    )}
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Button title="Mark All Absent As Present" onPress={() => {}} />
                <TouchableOpacity onPress={() => handleExportCSV(employee, 'DailyReports')} style={styles.exportButton}>
                    <Text style={styles.exportButtonText}>Daily Report</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.summaryContainer}>
                {['Present', 'Absent', 'Late', 'Half Day', 'Paid Leave'].map((status, index) => (
                    <View key={index} style={styles.statusContainer}>
                        <Text style={styles.statusCount}>0</Text>
                        <Text style={styles.statusLabel}>{status}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search Name of employee"
                    onChangeText={handleFilter}
                />
                <Button title="Search" onPress={() => {}} />
                <TouchableOpacity onPress={() => handleExportCSV(records, 'RegisterEmployeeData')} style={styles.exportButton}>
                    <Text style={styles.exportButtonText}>Export Attendance</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal>
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, styles.imageHeader]}>Image</Text>
                        <Text style={[styles.tableHeaderText, styles.nameHeader]}>Name</Text>
                        <Text style={[styles.tableHeaderText, styles.punchInHeader]}>Punch-In</Text>
                        <Text style={[styles.tableHeaderText, styles.punchOutHeader]}>Punch-Out</Text>
                        <Text style={[styles.tableHeaderText, styles.statusHeader]}>Status</Text>
                    </View>
                    {records.map((e) => (
                        <View key={e.id} style={styles.row}>
                            <Image
                                source={{ uri: `http://localhost:3000/Images/${e.image}` }}
                                style={styles.employeeImage}
                            />
                            <Text style={[styles.cell, styles.nameCell]}>{e.name}</Text>
                            <TextInput
                                style={[styles.input, styles.timeInput]}
                                placeholder="Punch In"
                                value={punchIn[e.id] || ''}
                                onChangeText={(value) => handlePunchIn(value, e.id)}
                            />
                            <TextInput
                                style={[styles.input, styles.timeInput]}
                                placeholder="Punch Out"
                                value={punchOut[e.id] || ''}
                                onChangeText={(value) => handlePunchOut(value, e.id)}
                            />
                            <Picker
                                selectedValue={status[e.id] || 'Select'}
                                style={styles.picker}
                                onValueChange={(value) => handleStatus(value, e.id)}>
                                {statusOptions.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} />
                                ))}
                            </Picker>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pickerContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    dateContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeInput: {
        flex: 1,
        marginHorizontal: 5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    exportButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exportButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statusContainer: {
        alignItems: 'center',
    },
    statusCount: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statusLabel: {
        fontSize: 14,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        marginBottom: 10,
    },
    tableHeaderText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageHeader: {
        width: width * 0.15,
    },
    nameHeader: {
        width: width * 0.25,
    },
    punchInHeader: {
        width: width * 0.2,
    },
    punchOutHeader: {
        width: width * 0.2,
    },
    statusHeader: {
        width: width * 0.2,
        marginLeft: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        textAlign: 'center',
        paddingVertical: 5,
    },
    nameCell: {
        width: width * 0.25,
    },
    employeeImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
});

export default Attendance;
