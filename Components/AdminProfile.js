import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { myAxios } from '../services/helper';
import { useNavigation } from '@react-navigation/native'; // For navigation

const AdminProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Use for navigation

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await myAxios.get('/api/adminprofile/');
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Admin Profile</Text>
        <Card containerStyle={styles.card}>
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: profileData?.profilePicture || 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{profileData?.name || 'N/A'}</Text>
            <Text style={styles.designationText}>{profileData?.designation || 'N/A'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="id-badge" size={22} color="#fff" />
              <Text style={styles.infoText}>Admin ID: {profileData?.adminId || 'N/A'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={22} color="#fff" />
              <Text style={styles.infoText}>Joining Date: {profileData?.joiningDate || 'N/A'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="call" size={22} color="#fff" />
              <Text style={styles.infoText}>Mobile No.: {profileData?.phone || 'N/A'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location" size={22} color="#fff" />
              <Text style={styles.infoText}>Address: {profileData?.address || 'N/A'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="book" size={22} color="#fff" />
              <Text style={styles.infoText}>Notes: {profileData?.notes || 'N/A'}</Text>
            </View>
          </View>

          {/* Edit Button */}
          <Button
            title="Edit Profile"
            onPress={() => navigation.navigate('AdminEditProfile', { profileData })}
          />
        </Card>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  card: {
    borderRadius: 20,
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  designationText: {
    fontSize: 18,
    color: '#b3c6ff',
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminProfile;
