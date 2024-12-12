import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { myAxios, BASE_URL } from '../services/helper';

const AddTask = ({ navigation }) => {
  const [employee, setEmployee] = useState([]);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    myAxios
      .get('/api/employee/')
      .then(result => {
        if (result.data) {
          setEmployee(result.data);
          setRecords(result.data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleFilter = (text) => {
    setSearch(text);
    setRecords(employee.filter(f => f.name.toLowerCase().includes(text.toLowerCase())));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Name of Employee"
        onChangeText={handleFilter}
        value={search}
      />
      <ScrollView horizontal={true}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Emp Id</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Image</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Name</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Designation</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Site</Text>
            <Text style={[styles.tableHeaderText, styles.fixedHeaderText]}>Action</Text>
          </View>
          {records.map((e) => (
            <View key={e.employeeId} style={styles.tableRow}>
              <Text style={styles.tableCell}>{e.employeeId}</Text>

              {/* Wrap the Image in a View */}
              <View style={styles.imageCell}>
              <Image
            source={{ uri: `${BASE_URL}/api/employee/image/${e.zname}` }}
              style={styles.image}
      />
              </View>

              <Text style={styles.tableCell}>{e.name}</Text>
              <Text style={styles.tableCell}>{e.category}</Text>
              <Text style={styles.tableCell}>{e.site}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AssignTask', { employeeId: e.employeeId })}
              >
                <Text style={styles.buttonText}>Assign Task</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 16,
  },
  table: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
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
  imageCell: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  image: {
    width: 50,  // Adjust width to fit the cell
    height: 50, // Adjust height to fit the cell
    borderRadius: 25, // Ensure the image is rounded
    resizeMode: 'cover', // Ensure the image covers the area without distortion
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default AddTask;
