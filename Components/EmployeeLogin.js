import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    userName: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const navigation = useNavigation();
  
  axios.defaults.withCredentials = true;

  const handleSubmit = async () => {
    if (!isChecked) {
      Alert.alert('Terms and Conditions', 'You must agree to the terms and conditions to continue.');
      return;
    }

    try {
      const response = await axios.post('https://emsproject-production.up.railway.app/auth/login', values);
      if (response.data) {
        await AsyncStorage.setItem("token", response.data);
        if (rememberMe) {
          await AsyncStorage.setItem('savedUserName', values.userName);
          await AsyncStorage.setItem('savedPassword', values.password);
        } else {
          await AsyncStorage.removeItem('savedUserName');
          await AsyncStorage.removeItem('savedPassword');
        }
        navigation.navigate('Employee');
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred during login. Please try again.');
    }
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const openTerms = () => {
    setModalVisible(true); // Open the modal
  };

  const closeTerms = () => {
    setModalVisible(false); // Close the modal
  };

  return (
    <LinearGradient colors={['#000000', '#8B0000']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Employee Management System</Text>
      </View>
      <View style={styles.formContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={styles.formTitle}>Employee Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#ccc"
          value={values.userName}
          onChangeText={(text) => setValues({ ...values, userName: text })}
          autoCompleteType="username"
          textContentType="username"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={values.password}
          onChangeText={(text) => setValues({ ...values, password: text })}
          textContentType="password"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Terms and Conditions Modal */}
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    width: '80%',
    paddingVertical: 30,
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#ff4c4c',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#ff4c4c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
    color: '#f00',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff4c4c',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default EmployeeLogin;
