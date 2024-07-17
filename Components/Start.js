import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Start = () => {
  const navigation = useNavigation();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigation.navigate('Dashboard');
          } else {
            navigation.navigate('EmployeeDetails', { id: result.data.id });
          }
        }
      }).catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.title}>Login As</Text>
        <View style={styles.buttonContainer}>
          <Button title="Employee" onPress={() => { navigation.navigate('EmployeeLogin') }} />
          <Button title="Admin" onPress={() => { navigation.navigate('AdminLogin') }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Background color for the entire screen
  },
  loginForm: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
    backgroundColor: '#ffffff', // Background color for the login form
    elevation: 5,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#00796b', // Title color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Start;