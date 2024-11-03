import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions, Modal, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [values, setValues] = useState({
    userName: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false); // Terms and conditions
  const [rememberMe, setRememberMe] = useState(false); // Remember me
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  axios.defaults.withCredentials = true;

  const handleSubmit = async () => {
    if (!isChecked) {
      Alert.alert('Terms and Conditions', 'You must agree to the terms and conditions to continue.');
      return;
    }
  
    try {
      const response = await axios.post('https://emspro-production.up.railway.app/api/employee/login', values);
      
      // Check if the response contains the expected data
      if (response.data && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        if (rememberMe) {
          await AsyncStorage.setItem('savedUserName', values.userName);
          await AsyncStorage.setItem('savedPassword', values.password);
        } else {
          await AsyncStorage.removeItem('savedUserName');
          await AsyncStorage.removeItem('savedPassword');
        }
        navigation.navigate('Home');
      } else {
        // Display invalid username or password message
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred during login. Please try again.');
    }
  };
  
  const handleChange = (field, text) => {
    // Clear error message when the user types in the input field
    if (error) setError(null);
    setValues({ ...values, [field]: text });
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked); // Toggle terms checkbox
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe); // Toggle remember me checkbox
  };

  const openTerms = () => {
    setModalVisible(true);
  };

  const closeTerms = () => {
    setModalVisible(false);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navigate to forgot password screen
  };

  return (
    <View style={styles.container}>
      {/* Custom Shape Background */}
      <View style={styles.shapeBackgroundYellow} />
      <View style={styles.shapeBackgroundGreen} />
      <View style={styles.shapeBackgroundBlue} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Admin Portal</Text>
        </View>

        <View style={styles.formContainer}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Text style={styles.formTitle}>Admin Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            placeholderTextColor="#ccc"
            value={values.userName}
            onChangeText={(text) => handleChange('userName', text)} // Updated to handleChange
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#ccc"
            secureTextEntry={true}
            value={values.password}
            onChangeText={(text) => handleChange('password', text)} // Updated to handleChange
          />

          {/* Terms and Conditions Checkbox */}
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && <MaterialIcons name="check" size={18} color="white" />}
            </View>
            <TouchableOpacity onPress={openTerms}>
              <Text style={[styles.checkboxLabel, { textDecorationLine: 'underline' }]}>
                I agree with the terms and conditions
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Remember Me Checkbox */}
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleRememberMe}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <MaterialIcons name="check" size={18} color="white" />}
            </View>
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Terms and Conditions */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeTerms}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Terms and Conditions</Text>
              <Text style={styles.modalText}>
                By using this system, you agree to the following terms:
                {"\n"}• All activities performed using this system are monitored and logged.
                {"\n"}• Confidentiality of the company and personal data must be maintained.
                {"\n"}• Unauthorized use of this system or tampering with data is prohibited.
                {"\n"}• Users are responsible for maintaining the security of their login credentials.
                {"\n"}• Any violation of these terms may result in disciplinary actions or termination.
                {"\n"}• The company reserves the right to amend these terms at any time.
                {"\n"}• By continuing to use this system, you agree to abide by all company policies and regulations.
              </Text>
              <TouchableOpacity onPress={closeTerms} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Reduce the size of the yellow shape
  shapeBackgroundYellow: {
    position: 'absolute',
    width: width * 1.2, // Reduced width
    height: height * 0.5, // Reduced height
    backgroundColor: '#F7DC6F',
    top: 0,
    borderBottomRightRadius: width * 1.2, // Adjusted radius
  },
  // Reduce the size of the green shape and adjust position to avoid overlap
  shapeBackgroundGreen: {
    position: 'absolute',
    width: width * 1.1, // Reduced width
    height: height * 0.4, // Reduced height
    backgroundColor: '#58D68D',
    top: height * 0.3, // Adjusted position to avoid overlap
    borderBottomLeftRadius: width * 1.5, // Adjusted radius
  },
  // Reduce the size of the blue shape and adjust position to avoid overlap
  shapeBackgroundBlue: {
    position: 'absolute',
    width: width * 0.9, // Reduced width
    height: height * 0.3, // Reduced height
    backgroundColor: '#5DADE2',
    top: height * 0.55, // Adjusted position to avoid overlap
    borderTopRightRadius: width * 1.2, // Adjusted radius
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  formContainer: {
    width: '80%',
    paddingVertical: 30,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#5DADE2',
    borderColor: '#5DADE2',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  forgotPasswordText: {
    color: '#5DADE2',
    textAlign: 'center',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#5DADE2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#5DADE2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;
