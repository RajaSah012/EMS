import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const KycUpdate = () => {
  const route = useRoute();
  const { employeeId } = route.params;
  const navigation = useNavigation();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    fname: "",
    salary: "",
    address: "",
    jod: "",
    category: "",
    gender: "",
    marritalStatus: "",
    status: "",
    site: "",
    work: "",
    ifsc: ""
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    setEmployee({
      name: "",
      email: "",
      mobile: "",
      dob: "",
      fname: "",
      salary: "",
      address: "",
      jod: "",
      category: "",
      gender: "",
      marritalStatus: "",
      status: "",
      site: "",
      work: "",
      ifsc: ""
    });

    axios.get(`https://mohitbyproject-production.up.railway.app/api/employee/${employeeId}`)
      .then(result => {
        setEmployee(result.data);
      }).catch(err => console.log(err));

    setImages([]);
  }, [employeeId]);

  const handleImagePick = async (type) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera roll permissions are required to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(prevImages => [...prevImages, { uri: result.assets[0].uri, name: type, id: Date.now() }]);
    }
  };

  const handleRemoveImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleSubmit = () => {
    axios.put(`https://mohitbyproject-production.up.railway.app/api/employee/${employeeId}`, employee)
      .then(result => {
        Alert.alert("Success", "KYC updated successfully!");
        navigation.navigate('kycVerification');
      }).catch(err => console.log(err));
  };

  const bankNames = [
    "State Bank Of India", "Bank Of India", "Bank Of Baroda", "Central Bank Of India", 
    "HDFC Bank Limited", "IDFC FIRST Bank Limited", "Yes Bank Limited", "AXIS Bank Limited", 
    "ICICI Bank Limited", "Indusland Bank Limited", "Bandhan Bank Limited", 
    "CSB Bank Limited", "DCB Bank Limited", "RBL Bank Limited", "City Union Bank Limited"
  ];

  const kycStatuses = [
    "Pending", "Verified", "Document Incomplete", "Rejected"
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FFDEE9', '#B5FFFC']}
        style={styles.headerContainer}
      >
        <Text style={styles.header}>Update KYC of {employee.name} (ID: {employeeId})</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Aadhar Card No.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhar card No."
          value={employee.name}
          onChangeText={(value) => setEmployee({ ...employee, name: value })}
        />

        <TouchableOpacity style={styles.imagePicker} onPress={() => handleImagePick('Aadhar Card')}>
          <Text style={styles.imagePickerText}>Upload Aadhar Card</Text>
        </TouchableOpacity>

        {images.filter(img => img.name === 'Aadhar Card').map((img) => (
          <View key={img.id} style={styles.imageContainer}>
            <Image source={{ uri: img.uri }} style={styles.image} />
            <Text style={styles.imageName}>Aadhar Card</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(img.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.label}>Pan Card No.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pan Card No."
          value={employee.email}
          onChangeText={(value) => setEmployee({ ...employee, email: value })}
        />

        <TouchableOpacity style={styles.imagePicker} onPress={() => handleImagePick('Pan Card')}>
          <Text style={styles.imagePickerText}>Upload Pan Card</Text>
        </TouchableOpacity>

        {images.filter(img => img.name === 'Pan Card').map((img) => (
          <View key={img.id} style={styles.imageContainer}>
            <Image source={{ uri: img.uri }} style={styles.image} />
            <Text style={styles.imageName}>Pan Card</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(img.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.label}>Bank Account No.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account No."
          value={employee.mobile}
          onChangeText={(value) => setEmployee({ ...employee, mobile: value })}
        />

        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter IFSC Code"
          value={employee.dob}
          onChangeText={(value) => setEmployee({ ...employee, dob: value })}
        />

        <Text style={styles.label}>Select Bank Name</Text>
        <Picker
          selectedValue={employee.marritalStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setEmployee({ ...employee, marritalStatus: itemValue })}
        >
          <Picker.Item label="Select Bank" value="" />
          {bankNames.map((bank, index) => (
            <Picker.Item key={index} label={bank} value={bank} />
          ))}
        </Picker>

        <Text style={styles.label}>Bank Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Bank Address"
          value={employee.jod}
          onChangeText={(value) => setEmployee({ ...employee, jod: value })}
        />

        <TouchableOpacity style={styles.imagePicker} onPress={() => handleImagePick('Passbook')}>
          <Text style={styles.imagePickerText}>Upload Passbook</Text>
        </TouchableOpacity>

        {images.filter(img => img.name === 'Passbook').map((img) => (
          <View key={img.id} style={styles.imageContainer}>
            <Image source={{ uri: img.uri }} style={styles.image} />
            <Text style={styles.imageName}>Passbook</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(img.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.label}>Select KYC Status</Text>
        <Picker
          selectedValue={employee.status}
          style={styles.picker}
          onValueChange={(itemValue) => setEmployee({ ...employee, status: itemValue })}
        >
          <Picker.Item label="Select Status" value="" />
          {kycStatuses.map((status, index) => (
            <Picker.Item key={index} label={status} value={status} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update KYC</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imagePicker: {
    backgroundColor: '#FFC300',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageName: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 16,
    color: '#555',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default KycUpdate;
