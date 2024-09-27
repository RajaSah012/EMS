import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import Branches from './Branches'; // Ensure you have the Branches component

const Tab = createMaterialTopTabNavigator();

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessTypes, setBusinessTypes] = useState([]);
  const [companyAddress, setCompanyAddress] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [udyamNumber, setUdyamNumber] = useState('');
  const [companyCIN, setCompanyCIN] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyRepresentative, setCompanyRepresentative] = useState('');
  const [logoUri, setLogoUri] = useState('');

  useEffect(() => {
    fetchBusinessTypes();
  }, []);

  const fetchBusinessTypes = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://emsproject-production.up.railway.app/api/category/', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setBusinessTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your photos!");
      return;
    }

    Alert.alert(
      'Upload Logo',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {
          text: 'Gallery',
          onPress: () => openImagePicker(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setLogoUri(result.assets[0].uri);
    }
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setLogoUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!companyName || !businessType || !companyAddress || !gstNumber || !udyamNumber || !companyCIN || !companyEmail || !companyRepresentative) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!gstPattern.test(gstNumber)) {
      Alert.alert("Error", "Invalid GST Number.");
      return;
    }

    if (!emailPattern.test(companyEmail)) {
      Alert.alert("Error", "Invalid email address.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const data = {
        companyName,
        businessType,
        companyAddress,
        gstNumber,
        udyamNumber,
        companyCIN,
        companyEmail,
        companyRepresentative,
        logoUri,
      };

      const response = await axios.post('https://emsproject-production.up.railway.app/api/company/', data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      Alert.alert("Success", "Company details saved successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save company details.");
    }
  };

  const handleCancel = () => {
    setCompanyName('');
    setBusinessType('');
    setCompanyAddress('');
    setGstNumber('');
    setUdyamNumber('');
    setCompanyCIN('');
    setCompanyEmail('');
    setCompanyRepresentative('');
    setLogoUri('');
  };

  return (
    <LinearGradient
      colors={['#000', '#FF6347']} // Black to red gradient
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logoUri ? { uri: logoUri } : null} style={styles.logo} />
            <TouchableOpacity style={styles.addLogoButton} onPress={handleImagePicker}>
              <Text style={styles.addLogoText}>+</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            value={companyName}
            onChangeText={setCompanyName}
            placeholderTextColor="#999"
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={businessType}
              onValueChange={(itemValue) => setBusinessType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Business Type" value="" />
              {businessTypes.map((type) => (
                <Picker.Item key={type.id} label={type.name} value={type.name} />
              ))}
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Company Address"
            value={companyAddress}
            onChangeText={setCompanyAddress}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="GST Number"
            value={gstNumber}
            onChangeText={setGstNumber}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Udyam Registration Number"
            value={udyamNumber}
            onChangeText={setUdyamNumber}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Company Corporation Number (CIN)"
            value={companyCIN}
            onChangeText={setCompanyCIN}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Company Email"
            value={companyEmail}
            onChangeText={setCompanyEmail}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Company Representative"
            value={companyRepresentative}
            onChangeText={setCompanyRepresentative}
            placeholderTextColor="#999"
          />
          <View style={styles.buttonContainer}>
            <Button 
              mode="outlined" 
              style={styles.cancelButton} 
              labelStyle={styles.cancelButtonText}
              onPress={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              mode="contained" 
              style={styles.saveButton} 
              labelStyle={styles.saveButtonText}
              onPress={handleSave}
            >
              Save
            </Button>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const CompanyDetails = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#FF6347' },
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#000' },
      }}
    >
      <Tab.Screen name="COMPANY" component={CompanyForm} />
      <Tab.Screen name="BRANCHES" component={Branches} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addLogoButton: {
    position: 'absolute',
    top: 80, // Adjust this value to position the button just below the logo
    backgroundColor: '#FF6347',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Optional: Add elevation for shadow
  },
  addLogoText: {
    color: '#fff',
    fontSize: 20,
  },
  input: {
    height: 50,
    borderColor: '#FF6347',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#fff', // Adjust the text color
    backgroundColor: '#222', // Optional: Add a background color
  },
  pickerContainer: {
    borderColor: '#FF6347',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#ff7733',
    flex: 1,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#444444',
    borderColor: '#FF6347',
    flex: 1,
  },
  cancelButtonText: {
    color: '#fff',
  },
});

export default CompanyDetails;
