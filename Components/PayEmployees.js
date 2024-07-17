import React from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';

const PayEmployees = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/Images/pay-emp-bg.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
       <Text style={styles.title}>Pay your employees using EMS in simple steps</Text>
        <Text style={styles.subtitle}>Please complete your business KYC now to activate your EMS wallet</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Do KYC Verification" color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
});

export default PayEmployees;