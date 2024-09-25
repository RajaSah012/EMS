import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PayEmployees = () => {
  const navigation = useNavigation();

  const handleKycVerification = () => {
    navigation.navigate('kycVerification'); // Make sure the 'KycVerification' screen is added to your navigation stack
  };

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
        <TouchableOpacity onPress={handleKycVerification} style={styles.button}>
          <Text style={styles.buttonText}>Do KYC Verification</Text>
        </TouchableOpacity>
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
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PayEmployees;
