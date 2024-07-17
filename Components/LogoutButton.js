// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("No token found, cannot logout.");
      navigation.navigate('Login');
      return;
    }

    try {
      const result = await axios.post('https://emsproject-production.up.railway.app/auth/logout', {}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (result.data) {
        console.log("Token before removal:", token);
        await AsyncStorage.removeItem("token");
        console.log("Token after removal:", await AsyncStorage.getItem("token"));
        navigation.navigate('AdminLogin');
      } else {
        console.error("Logout failed:", result.data);
      }
    } catch (err) {
      console.error("Error in logout request:", err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#d9534f',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});
