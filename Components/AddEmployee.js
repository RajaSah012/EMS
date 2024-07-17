import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: new Date(), // Initialize with current date for Date of Birth
    password: "",
    fname: "",
    salary: "",
    address: "",
    jod: new Date(), // Initialize with current date for Date of Joining
    category_id: "",
    gender: "",
    marritalStatus: "",
    status: "",
    site: "",
    work: "",
    image: null,
  });
  const [category, setCategory] = useState([]);
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showJodPicker, setShowJodPicker] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          Alert.alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('dob', employee.dob.toISOString()); // Convert date to ISO string
    formData.append('password', employee.password);
    formData.append('fname', employee.fname);
    formData.append('address', employee.address);
    formData.append('jod', employee.jod.toISOString()); // Convert date to ISO string
    formData.append('salary', employee.salary);
    formData.append('gender', employee.gender);
    formData.append('marritalStatus', employee.marritalStatus);
    formData.append('status', employee.status);
    formData.append('site', employee.site);
    formData.append('work', employee.work);
    if (employee.image) {
      formData.append('image', {
        uri: employee.image.uri,
        name: employee.image.fileName,
        type: employee.image.type
      });
    }
    formData.append('category_id', employee.category_id);

    axios.post('http://localhost:3000/auth/add_employee', formData)
      .then(result => {
        if (result.data.Status) {
          navigation.navigate('EmployeeDashboard');
        } else {
          Alert.alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEmployee({ ...employee, image: result.assets[0] });
    }
  };

  const handleDobChange = (event, selectedDate) => {
    const currentDate = selectedDate || employee.dob;
    setShowDobPicker(false);
    setEmployee({ ...employee, dob: currentDate });
  };

  const handleJodChange = (event, selectedDate) => {
    const currentDate = selectedDate || employee.jod;
    setShowJodPicker(false);
    setEmployee({ ...employee, jod: currentDate });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Employee</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={employee.name}
        onChangeText={(text) => setEmployee({ ...employee, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={employee.email}
        onChangeText={(text) => setEmployee({ ...employee, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile No."
        value={employee.mobile}
        onChangeText={(text) => setEmployee({ ...employee, mobile: text })}
      />
      <TouchableOpacity onPress={() => setShowDobPicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Date of Birth"
          editable={false}
          value={employee.dob.toDateString()} // Display selected date
        />
      </TouchableOpacity>
      {showDobPicker && (
        <DateTimePicker
          value={employee.dob}
          mode="date"
          display="default"
          onChange={handleDobChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={employee.password}
        onChangeText={(text) => setEmployee({ ...employee, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Father's Name"
        value={employee.fname}
        onChangeText={(text) => setEmployee({ ...employee, fname: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Monthly Salary"
        value={employee.salary}
        onChangeText={(text) => setEmployee({ ...employee, salary: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={employee.address}
        onChangeText={(text) => setEmployee({ ...employee, address: text })}
      />
      <TouchableOpacity onPress={() => setShowJodPicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Date of Joining"
          editable={false}
          value={employee.jod.toDateString()} // Display selected date
        />
      </TouchableOpacity>
      {showJodPicker && (
        <DateTimePicker
          value={employee.jod}
          mode="date"
          display="default"
          onChange={handleJodChange}
        />
      )}
      <Picker
        selectedValue={employee.category_id}
        onValueChange={(itemValue) => setEmployee({ ...employee, category_id: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Select Category" value="" />
        {category.map((c) => (
          <Picker.Item key={c.id} label={c.name} value={c.id} />
        ))}
      </Picker>
      <View style={styles.genderContainer}>
        <Text>Select Gender:</Text>
        <Picker
          selectedValue={employee.gender}
          onValueChange={(itemValue) => setEmployee({ ...employee, gender: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Trans" value="trans" />
        </Picker>
      </View>
      <Picker
        selectedValue={employee.marritalStatus}
        onValueChange={(itemValue) => setEmployee({ ...employee, marritalStatus: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Select Marital Status" value="" />
        <Picker.Item label="Married" value="Married" />
        <Picker.Item label="Unmarried" value="Unmarried" />
        <Picker.Item label="Divorced" value="Divorced" />
      </Picker>
      <Picker
        selectedValue={employee.status}
        onValueChange={(itemValue) => setEmployee({ ...employee, status: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Select Status" value="" />
        <Picker.Item label="Current" value="Current" />
        <Picker.Item label="Ex-Employee" value="Ex-Employee" />
        <Picker.Item label="New Joining" value="New Joining" />
        <Picker.Item label="Transferred In" value="Transferred In" />
        <Picker.Item label="Transferred Out" value="Transferred Out" />
        <Picker.Item label="Exited Employee" value="Exited Employee" />
      </Picker>
      <Picker
        selectedValue={employee.site}
        onValueChange={(itemValue) => setEmployee({ ...employee, site: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Select Site" value="" />
        <Picker.Item label="New Delhi" value="New Delhi" />
        <Picker.Item label="Mumbai" value="Mumbai" />
        <Picker.Item label="Bangalore" value="Bangalore" />
        <Picker.Item label="Patna" value="Patna" />
        <Picker.Item label="Kolkata" value="Kolkata" />
        <Picker.Item label="Pune" value="Pune" />
      </Picker>
      <Picker
        selectedValue={employee.work}
        onValueChange={(itemValue) => setEmployee({ ...employee, work: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Select Work Type" value="" />
        <Picker.Item label="Permanent" value="Permanent" />
        <Picker.Item label="Full Time" value="Full Time" />
        <Picker.Item label="Part Time" value="Part Time" />
        <Picker.Item label="Contract Basis" value="Contract Basis" />
      </Picker>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.uploadButton}>Select Image</Text>
      </TouchableOpacity>
      {employee.image && (
        <Image source={{ uri: employee.image.uri }} style={styles.imagePreview} />
      )}
      <Button title="Add Employee" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  genderContainer: {
    marginBottom: 10,
  },
  uploadButton: {
    color: 'blue',
    textAlign: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default AddEmployee;
