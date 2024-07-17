//AdminLogin

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [values, setValues] = useState({
    userName: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const navigation = useNavigation();
  axios.defaults.withCredentials = true;

  const handleSubmit = async () => {
    if (isChecked) {
      try {
        const response = await axios.post('https://emsproject-production.up.railway.app/auth/login', values);
        if (response.data) {
          await AsyncStorage.setItem("token", response.data);
          navigation.navigate('Home');
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        console.log(err);
        setError('An error occurred during login. Please try again.');
      }
    } else {
      setError('Please agree to the terms and conditions');
    }
  };
  

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={require('../assets/Images/base.png')} style={styles.logo} /> */}

        <Text style={styles.title}>Employee Management System</Text>
        <TouchableOpacity style={styles.registrationButton} onPress={() => navigation.navigate('AdminRegistration')}>
          <Text style={styles.registrationButtonText}>Registration</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={styles.formTitle}>Login Page</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={values.userName}
          onChangeText={(text) => setValues({ ...values, userName: text })}
          autoCompleteType="username"
          textContentType="username"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={values.password}
          onChangeText={(text) => setValues({ ...values, password: text })}
          textContentType="password"
        />
        <TouchableOpacity style={styles.checkbox} onPress={handleCheckboxClick}>
          <View style={[styles.checkboxInner, isChecked ? styles.checked : null]}>
            {isChecked && <Text style={styles.checkboxSymbol}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>You agree with our terms and conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  registrationButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  registrationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  formContainer: {
    width: '80%',
    paddingVertical: 30,
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#198754',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#198754', // Color when checkbox is checked
  },
  checkboxSymbol: {
    fontSize: 16,
    color: '#fff',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 14,
    color: '#f00',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Login;
