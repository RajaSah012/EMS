import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    category_id: '',
    image: null,
  });
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [category, setCategory] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const result = await axios.get('http://localhost:3000/auth/category');
      if (result.data.Status) {
        setCategory(result.data.Result);
      } else {
        Alert.alert('Error', result.data.Error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('image', employee.image);
    formData.append('category_id', employee.category_id);

    try {
      const result = await axios.post('http://localhost:3000/auth/add_employee', formData);
      if (result.data.Status) {
        Alert.alert('Success', 'Employee added successfully');
        navigation.navigate('Employee'); // Navigate to Employee screen
      } else {
        Alert.alert('Error', result.data.Error);
      }
    } catch (error) {
      console.error(error);
    }
  }

 const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission denied', 'Please grant media library permission to select an image.');
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    setSelectedImageUri(result.uri);
    setEmployee(prevState => ({ ...prevState, image: result.uri }));
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Employee</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setEmployee({ ...employee, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmployee({ ...employee, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setEmployee({ ...employee, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        onChangeText={(text) => setEmployee({ ...employee, salary: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setEmployee({ ...employee, address: text })}
      />
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Select Image</Text>
      </TouchableOpacity>
      {selectedImageUri && (
        <Image source={{ uri: selectedImageUri }} style={styles.image} />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add Employee</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePickerButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  imagePickerText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default AddEmployee;
