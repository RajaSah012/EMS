import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogout = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error("No token found, cannot logout.");
        navigation.navigate('Login');
        return;
      }

      const response = await axios.post('https://emsproject-production.up.railway.app/auth/logout',
        {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
      );
      if (response.data) {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Error in logout request:", error);
    }
  };

  return handleLogout;
};

export default useLogout;