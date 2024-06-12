import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const AdminRegistration = () => {
  const [registration, setRegistration] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    agree: false,
  });

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!registration.agree) {
      Alert.alert('Error', 'Please agree to terms and conditions');
      return;
    }

    try {
      const formData = {
        name: registration.name,
        phoneNumber: registration.phoneNumber,
        email: registration.email,
        password: registration.password,
      };

      const response = await axios.post('https://emsproject-production.up.railway.app/api/user/', formData);
      if (response.data) {
        // Clear all fields after successful submission
        setRegistration({
          name: '',
          phoneNumber: '',
          email: '',
          password: '',
          agree: false,
        });

        navigation.navigate('AdminLogin');
      } else {
        Alert.alert('Error', response.data.Error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAgreement = () => {
    setRegistration({ ...registration, agree: !registration.agree });
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.header}>Registration Page</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={registration.name}
          onChangeText={(text) => setRegistration({ ...registration, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile"
          value={registration.phoneNumber}
          onChangeText={(text) => setRegistration({ ...registration, phoneNumber: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={registration.email}
          onChangeText={(text) => setRegistration({ ...registration, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={registration.password}
          onChangeText={(text) => setRegistration({ ...registration, password: text })}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={toggleAgreement} style={styles.checkboxContainer}>
          {registration.agree ? (
            <FontAwesome name="check-square-o" size={24} color="#4CAF50" />
          ) : (
            <FontAwesome name="square-o" size={24} color="#ccc" />
          )}
          <Text style={styles.checkboxText}>You agree with our terms and conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loginForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AdminRegistration;
