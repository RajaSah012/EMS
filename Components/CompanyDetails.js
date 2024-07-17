import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Branches from './Branches';

const Tab = createMaterialTopTabNavigator();

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessTypes, setBusinessTypes] = useState([]);
  const [companyAddress, setCompanyAddress] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [udyamNumber, setUdyamNumber] = useState('');
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
    try {
      const token = await AsyncStorage.getItem('token');
      const data = {
        companyName,
        businessType,
        companyAddress,
        gstNumber,
        udyamNumber,
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
    setLogoUri('');
  };

  return (
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
      />
      <TextInput
        style={styles.input}
        placeholder="GST Number"
        value={gstNumber}
        onChangeText={setGstNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Udyam Registration Number"
        value={udyamNumber}
        onChangeText={setUdyamNumber}
      />
      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          style={styles.cancelButton} 
          labelStyle={styles.cancelButtonText} // Change here
          onPress={handleCancel}
        >
          Cancel
        </Button>
        <Button 
          mode="contained" 
          style={styles.saveButton} 
          labelStyle={styles.saveButtonText} // Change here
          onPress={handleSave}
        >
          Save
        </Button>
      </View>
    </View>
  );
};



const CompanyDetails = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#00cc00' },
        tabBarActiveTintColor: '#00cc00',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: { backgroundColor: '#f8f8f8' },
      }}
    >
      <Tab.Screen name="COMPANY" component={CompanyForm} />
      <Tab.Screen name="BRANCHES" component={Branches} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addLogoButton: {
    marginTop: -20,
    backgroundColor: '#00FA9A',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addLogoText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    width: '45%',
    borderColor: '#00FA9A',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  cancelButtonText: {
    color: '#00FA9A', // Set the text color for the Cancel button
  },
  saveButton: {
    width: '45%',
    backgroundColor: '#00FA9A',
  },
  saveButtonText: {
    color: '#000', // Set the text color for the Save button
  },
});

export default CompanyDetails;
