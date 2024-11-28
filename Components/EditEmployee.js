import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditEmployee = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { employeeId } = route.params;

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    password: '',
    fname: '',
    salary: '',
    address: '',
    jod: '',
    category: '',
    gender: '',
    marritalStatus: '',
    status: '',
    site: '',
    work: '',
  });

  const [category, setCategory] = useState([]);
  const marritalStatuses = ['Married', 'Unmarried', 'Divorced'];
  const statuses = ['Current', 'Ex-Employee', 'New Joining', 'Transferred In', 'Transferred Out', 'Exited Employee'];
  const sites = ['New Delhi', 'Mumbai', 'Bengaluru', 'Patna', 'Kolkata', 'Pune'];
  const works = ['Permanent', 'Full Time', 'Part Time', 'Contract Basis'];

  useEffect(() => {
    // Fetch categories
    axios
      .get('https://emspro-production.up.railway.app/api/category/')
      .then((result) => {
        if (result.data) {
          setCategory(result.data);
        } else {
          Alert.alert('Error', result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    // Fetch employee details
    axios
      .get(`https://emspro-production.up.railway.app/api/employee/${employeeId}`)
      .then((result) => {
        setEmployee({
          ...employee,
          ...result.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    axios
      .put(`https://emspro-production.up.railway.app/api/employee/${employeeId}`, employee)
      .then((result) => {
        if (result.data) {
          navigation.navigate('Employee'); // Adjust screen name according to your navigation setup
        } else {
          Alert.alert('Error', result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Edit Employee</Text>

      {/* Name */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={employee.name}
        onChangeText={(text) => setEmployee({ ...employee, name: text })}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={employee.email}
        keyboardType="email-address"
        onChangeText={(text) => setEmployee({ ...employee, email: text })}
      />

      {/* Mobile */}
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile No."
        value={employee.mobile}
        keyboardType="numeric"
        onChangeText={(text) => setEmployee({ ...employee, mobile: text })}
      />

      {/* DOB */}
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={employee.dob}
        onChangeText={(text) => setEmployee({ ...employee, dob: text })}
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={employee.password}
        secureTextEntry
        onChangeText={(text) => setEmployee({ ...employee, password: text })}
      />

      {/* Father's Name */}
      <TextInput
        style={styles.input}
        placeholder="Enter Father's Name"
        value={employee.fname}
        onChangeText={(text) => setEmployee({ ...employee, fname: text })}
      />

      {/* Salary */}
      <TextInput
        style={styles.input}
        placeholder="Enter Salary"
        value={employee.salary}
        keyboardType="numeric"
        onChangeText={(text) => setEmployee({ ...employee, salary: text })}
      />

      {/* Address */}
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={employee.address}
        onChangeText={(text) => setEmployee({ ...employee, address: text })}
      />

      {/* Date of Joining */}
      <TextInput
        style={styles.input}
        placeholder="Date of Joining"
        value={employee.jod}
        onChangeText={(text) => setEmployee({ ...employee, jod: text })}
      />

      {/* Category */}
      <Picker
        selectedValue={employee.category}
        style={styles.input}
        onValueChange={(itemValue) => setEmployee({ ...employee, category: itemValue })}
      >
        <Picker.Item label="Select Category" value="" />
        {category.map((c) => (
          <Picker.Item key={c.categoryId} label={c.categoryName} value={c.category} />
        ))}
      </Picker>

      {/* Gender */}
      <View style={styles.radioGroup}>
        <Text style={styles.label}>Gender:</Text>
        {['Male', 'Female', 'Trans'].map((gender) => (
          <TouchableOpacity
            key={gender}
            style={[
              styles.radioButton,
              employee.gender === gender.toLowerCase() && styles.selectedRadioButton,
            ]}
            onPress={() => setEmployee({ ...employee, gender: gender.toLowerCase() })}
          >
            <Text
              style={[
                styles.radioText,
                employee.gender === gender.toLowerCase() && styles.selectedRadioText,
              ]}
            >
              {gender}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Marital Status */}
      <Picker
        selectedValue={employee.marritalStatus}
        style={styles.input}
        onValueChange={(itemValue) => setEmployee({ ...employee, marritalStatus: itemValue })}
      >
        <Picker.Item label="Select Marital Status" value="" />
        {marritalStatuses.map((status) => (
          <Picker.Item key={status} label={status} value={status} />
        ))}
      </Picker>

      {/* Employee Status */}
      <Picker
        selectedValue={employee.status}
        style={styles.input}
        onValueChange={(itemValue) => setEmployee({ ...employee, status: itemValue })}
      >
        <Picker.Item label="Select Status" value="" />
        {statuses.map((status) => (
          <Picker.Item key={status} label={status} value={status} />
        ))}
      </Picker>

      {/* Site */}
      <Picker
        selectedValue={employee.site}
        style={styles.input}
        onValueChange={(itemValue) => setEmployee({ ...employee, site: itemValue })}
      >
        <Picker.Item label="Select Site" value="" />
        {sites.map((site) => (
          <Picker.Item key={site} label={site} value={site} />
        ))}
      </Picker>

      {/* Work Type */}
      <Picker
        selectedValue={employee.work}
        style={styles.input}
        onValueChange={(itemValue) => setEmployee({ ...employee, work: itemValue })}
      >
        <Picker.Item label="Select Work Type" value="" />
        {works.map((work) => (
          <Picker.Item key={work} label={work} value={work} />
        ))}
      </Picker>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Edit Employee</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDEE9',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30, // Ensures button is not hidden
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#B5FFFC',
  },
  selectedRadioButton: {
    borderColor: '#007BFF',
    backgroundColor: '#007BFF', // Blue color when selected
  },
  radioText: {
    fontSize: 14,
    color: '#333',
  },
  selectedRadioText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditEmployee;
