import { View, Text, TextInput, Button, TouchableOpacity, Dimensions, StyleSheet, Alert, Image} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [agree, setAgree] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Terms and conditions
  const [rememberMe, setRememberMe] = useState(false); // Remember me
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // Check if terms and conditions are accepted
    if (!isChecked) {
      Alert.alert("Terms and Conditions", "You must agree to the terms and conditions.");
      return;
    }
  
    try {
      // Send a POST request for login
      const result = await axios.post('https://emspro-production.up.railway.app/auth/login', values);
      
      // Check if response contains token
      if (result.data && result.data.token) {
        // Store only the token in AsyncStorage
        await AsyncStorage.setItem("token", result.data.token);
        
        // Navigate to the Home screen after successful login
        navigation.navigate('Home');
      } else {
        // Set an error message if login is invalid
        setError('Invalid login credentials');
      }
    } catch (err) {
      // Log the error to the console for debugging
      console.error(err);
      // Set a generic error message
      setError('An error occurred during login. Please try again.');
    }
  };
  

  // const toggleCheckbox = () => {
  //   setIsChecked(!isChecked); // Toggle terms checkbox
  // };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked); // Toggle terms checkbox
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe); // Toggle remember me checkbox
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navigate to forgot password screen
  };

  const openTerms = () => {
    setModalVisible(true);
  };   

  return (
    <View style={styles.container}>
      <View style={styles.shapeBackgroundYellow} />
      <View style={styles.shapeBackgroundGreen} />
      <View style={styles.shapeBackgroundBlue} />
      <View style={styles.header}>
        {/* Add Local Image (Logo) in the header */}
        <Image
          source={require('../assets/Images/logo.jpg')}
          style={{ width: 100, height: 100, borderRadius: 60, marginBottom: 10 }}
        />
        <Text style={styles.headerText}>Employee Management</Text>
        {/* <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Registration</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.loginFormContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={styles.title}>Employee Login</Text>

        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}>Email:</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            placeholderTextColor="#ccc"
            autoCapitalize="none"
            onChangeText={(text) => setValues({ ...values, email: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}>Password:</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            onChangeText={(text) => setValues({ ...values, password: text })}
          />
        </View>

        {/* Terms and Conditions Checkbox */}
        {/* <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
          <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
            {isChecked && <MaterialIcons name="check" size={18} color="white" />}
          </View>
          <TouchableOpacity onPress={openTerms}>
            <Text style={[styles.checkboxLabel, { textDecorationLine: 'underline' }]}>
              I agree with the terms and conditions
            </Text>
          </TouchableOpacity>
        </TouchableOpacity> */}

<TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
  <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
    {isChecked && <MaterialIcons name="check" size={18} color="white" />}
  </View>
  <Text style={[styles.checkboxLabel, { textDecorationLine: 'underline' }]}>
    I agree with the terms and conditions
  </Text>
</TouchableOpacity>


        {/* Remember Me Checkbox */}
        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleRememberMe}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <MaterialIcons name="check" size={18} color="white" />}
            </View>
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => setAgree(!agree)}>
          <Text style={[styles.agreementText, agree && styles.agreedText]}>
            {agree ? "✓ " : ""}You agree with terms & conditions
          </Text>
        </TouchableOpacity> */}

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

        {/* <Button title="Login" onPress={handleSubmit} color="#28a745" /> */}

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => setAgree(!agree)}>
          <Text style={[styles.agreementText, agree && styles.agreedText]}>
            {agree ? "✓ " : ""}You agree with terms & conditions
          </Text>
        </TouchableOpacity> */}
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
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  registerButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#fff',
  },
  loginFormContainer: {
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
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
  agreementText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#888',
  },
  agreedText: {
    color: '#28a745',
  },
});

export default Login;