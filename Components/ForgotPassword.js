import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post('https://emspro-production.up.railway.app/auth/forgot-password', { email });
      if (response.data.success) {
        setSuccessMessage('A reset link has been sent to your email.');
        setError('');
        setEmail(''); // Clear email field after success
      } else {
        setError('Unable to send reset link. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigation.goBack(); // Go back to the login screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.shapeBackgroundYellow} />
      <View style={styles.shapeBackgroundGreen} />
      <View style={styles.shapeBackgroundBlue} />

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
          <Text style={styles.resetButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapeBackgroundYellow: {
    position: 'absolute',
    width: width * 1.5,
    height: height * 0.6,
    backgroundColor: '#F7DC6F',
    top: 0,
    borderBottomRightRadius: width * 1.5,
  },
  shapeBackgroundGreen: {
    position: 'absolute',
    width: width,
    height: height * 0.6,
    backgroundColor: '#58D68D',
    top: height * 0.25,
    borderBottomLeftRadius: width * 2,
  },
  shapeBackgroundBlue: {
    position: 'absolute',
    width: width,
    height: height * 0.4,
    backgroundColor: '#5DADE2',
    top: height * 0.5,
    borderTopRightRadius: width * 1.5,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#e8f0fe',
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ForgotPassword;
