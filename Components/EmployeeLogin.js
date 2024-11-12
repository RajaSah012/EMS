// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions, Modal, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MaterialIcons } from '@expo/vector-icons';

// const { width, height } = Dimensions.get('window');

// const EmployeeLogin = () => {
//   const [values, setValues] = useState({
//     userName: '',
//     password: ''
//   });
//   const [error, setError] = useState(null);
//   const [isChecked, setIsChecked] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const navigation = useNavigation();

//   axios.defaults.withCredentials = true;

//   const handleSubmit = async () => {
//     if (!isChecked) {
//       Alert.alert('Terms and Conditions', 'You must agree to the terms and conditions to continue.');
//       return;
//     }
  
//     try {
//       const response = await axios.post('https://emspro-production.up.railway.app/api/employee/login', values);
//       if (response.data) {
//         await AsyncStorage.setItem("token", response.data.token);
  
//         if (rememberMe) {
//           await AsyncStorage.setItem('savedUserName', values.userName);
//           await AsyncStorage.setItem('savedPassword', values.password);
//         } else {
//           await AsyncStorage.removeItem('savedUserName');
//           await AsyncStorage.removeItem('savedPassword');
//         }
  
//         navigation.navigate('Employee');
//       } else {
//         if (response.data.Error) {
//           setError(response.data.Error);
//         } else {
//           setError('Invalid username or password. Please try again.');
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       setError('An error occurred during login. Please try again.');
//     }
//   };

//   const handleInputChange = (field, text) => {
//     setValues({ ...values, [field]: text });
//     setError(null); // Clear error message when typing
//   };

//   const toggleCheckbox = () => {
//     setIsChecked(!isChecked);
//   };

//   const toggleRememberMe = () => {
//     setRememberMe(!rememberMe);
//   };

//   const openTerms = () => {
//     setModalVisible(true);
//   };

//   const closeTerms = () => {
//     setModalVisible(false);
//   };

//   const handleForgotPassword = () => {
//     navigation.navigate('ForgotPassword');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Custom Shape Background */}
//       <View style={styles.shapeBackgroundYellow} />
//       <View style={styles.shapeBackgroundGreen} />
//       <View style={styles.shapeBackgroundBlue} />

//       <View style={styles.content}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Employee Management</Text>
//         </View>

//         <View style={styles.formContainer}>
//           {error && <Text style={styles.errorText}>{error}</Text>}
//           <Text style={styles.formTitle}>Employee Login</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Username"
//             placeholderTextColor="#ccc"
//             value={values.userName}
//             onChangeText={(text) => handleInputChange('userName', text)} // Update this line
//             autoCompleteType="username"
//             textContentType="username"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Password"
//             placeholderTextColor="#ccc"
//             secureTextEntry={true}
//             value={values.password}
//             onChangeText={(text) => handleInputChange('password', text)} // Update this line
//             textContentType="password"
//           />

//           <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
//             <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
//               {isChecked && <MaterialIcons name="check" size={18} color="white" />}
//             </View>
//             <TouchableOpacity onPress={openTerms}>
//               <Text style={[styles.checkboxLabel, { textDecorationLine: 'underline' }]}>
//                 I agree with the terms and conditions
//               </Text>
//             </TouchableOpacity>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.checkboxContainer} onPress={toggleRememberMe}>
//             <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
//               {rememberMe && <MaterialIcons name="check" size={18} color="white" />}
//             </View>
//             <Text style={styles.checkboxLabel}>Remember Me</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleForgotPassword}>
//             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={closeTerms}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <ScrollView>
//               <Text style={styles.modalTitle}>Terms and Conditions</Text>
//               <Text style={styles.modalText}>
//                 By using this system, you agree to the following terms:
//                 {"\n"}• All activities performed using this system are monitored and logged.
//                 {"\n"}• Confidentiality of the company and personal data must be maintained.
//                 {"\n"}• Unauthorized use of this system or tampering with data is prohibited.
//                 {"\n"}• Users are responsible for maintaining the security of their login credentials.
//                 {"\n"}• Any violation of these terms may result in disciplinary actions or termination.
//                 {"\n"}• The company reserves the right to amend these terms at any time.
//                 {"\n"}• By continuing to use this system, you agree to abide by all company policies and regulations.
//               </Text>
//               <TouchableOpacity onPress={closeTerms} style={styles.closeButton}>
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f8ff',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   // Reduce the size of the yellow shape
//   shapeBackgroundYellow: {
//     position: 'absolute',
//     width: width * 1.2,
//     height: height * 0.5,
//     backgroundColor: '#F7DC6F',
//     top: 0,
//     borderBottomRightRadius: width * 1.2,
//   },
//   // Reduce the size of the green shape and adjust position to avoid overlap
//   shapeBackgroundGreen: {
//     position: 'absolute',
//     width: width * 1.1,
//     height: height * 0.4,
//     backgroundColor: '#58D68D',
//     top: height * 0.3,
//     borderBottomLeftRadius: width * 1.5,
//   },
//   // Reduce the size of the blue shape and adjust position to avoid overlap
//   shapeBackgroundBlue: {
//     position: 'absolute',
//     width: width * 0.9,
//     height: height * 0.3,
//     backgroundColor: '#5DADE2',
//     top: height * 0.55,
//     borderTopRightRadius: width * 1.2,
//   },
//   header: {
//     width: '100%',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 10,
//   },
//   formContainer: {
//     width: '80%',
//     paddingVertical: 30,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   formTitle: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 45,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     borderRadius: 8,
//     backgroundColor: '#e8f0fe',
//     color: '#333',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   checkboxChecked: {
//     backgroundColor: '#5DADE2',
//   },
//   checkboxLabel: {
//     fontSize: 16,
//     color: '#333',
//   },
//   forgotPasswordText: {
//     color: '#5DADE2',
//     textDecorationLine: 'underline',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   loginButton: {
//     backgroundColor: '#5DADE2',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   closeButton: {
//     backgroundColor: '#5DADE2',
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default EmployeeLogin;import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [agree, setAgree] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (!agree) {
            Alert.alert("Terms and Conditions", "You must agree to the terms and conditions.");
            return;
        }

        try {
            const result = await axios.post('https://emspro-production.up.railway.app/api/employee/login', values);
            if (result.data) {
              await AsyncStorage.setItem("token", JSON.stringify(result.data));
              await AsyncStorage.setItem("employeeId", JSON.stringify(result.data));
              
                navigation.navigate('EmpDashboard');
            } else {
                setError('Invalid login credentials');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Employee Management System</Text>
                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Registration</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.loginFormContainer}>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <Text style={styles.title}>Login Page</Text>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        autoCapitalize="none"
                        onChangeText={(text) => setValues({ ...values, email: text })}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        secureTextEntry
                        onChangeText={(text) => setValues({ ...values, password: text })}
                    />
                </View>
                
                <Button title="Log in" onPress={handleSubmit} color="#28a745" />
                
                <TouchableOpacity onPress={() => setAgree(!agree)}>
                    <Text style={[styles.agreementText, agree && styles.agreedText]}>
                        {agree ? "✓ " : ""}You agree with terms & conditions
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
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
        backgroundColor: '#fff',
        padding: 20,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
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

export default EmployeeLogin;
