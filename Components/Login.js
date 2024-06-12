import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Dimensions, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (isChecked) {
      try {
        const response = await axios.post('http://localhost:3000/auth/adminlogin', values);
        if (response.data.loginStatus) {
          navigation.navigate('Dashboard');
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setError('Please agree to the terms and conditions');
    }
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../Images/EMS.png')} style={styles.logo} />
        <Text style={styles.title}>Employee Management System</Text>
      </View>
      <TouchableOpacity style={styles.registrationButton} onPress={() => navigation.navigate('AdminRegistration')}>
        <Text style={styles.registrationButtonText}>Registration</Text>
      </TouchableOpacity>
      <View style={styles.formContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={styles.formTitle}>Login Page</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={values.email}
          onChangeText={(text) => setValues({ ...values, email: text })}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
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
          <View style={styles.checkboxInner}>
            {isChecked && <Text style={styles.checkboxSymbol}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>I Agree to the Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.termsContainer}>
          <TouchableOpacity>
            <Text style={styles.termsText}>You agree with our terms and conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  registrationButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
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
    backgroundColor: '#2196F3',
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
  checkboxSymbol: {
    fontSize: 16,
    color: '#4CAF50',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#555',
  },
  termsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#f00',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Login;
