import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const EmployeeLogin = ({ navigation }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    if (isChecked) {
      axios.post('http://localhost:3000/employee/employee_login', values)
        .then(result => {
          if (result.data.loginStatus) {
            navigation.navigate('EmployeeDetails', { id: result.data.id });
          } else {
            setError(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    } else {
      setError('Please agree to the terms and conditions');
    }
  }

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../Images/EMS.png')} style={styles.logo} />
        <Text style={styles.headerText}>Employee Management System</Text>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.errorText}>{error && error}</Text>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={email => setValues({ ...values, email })}
          value={values.email}
          autoCompleteType="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={password => setValues({ ...values, password })}
          value={values.password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.checkbox} onPress={handleCheckboxClick}>
          <View style={styles.checkboxInner}>
            {isChecked && <Text style={styles.checkboxSymbol}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>I Agree to the Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
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
});

export default EmployeeLogin;
