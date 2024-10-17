import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AdminEditProfile = ({ route, navigation }) => {
  const { profileData } = route.params;

  const [name, setName] = useState(profileData.name);
  const [designation, setDesignation] = useState(profileData.designation);
  const [phone, setPhone] = useState(profileData.phone);
  const [address, setAddress] = useState(profileData.address);
  const [notes, setNotes] = useState(profileData.notes);
  const [profileImage, setProfileImage] = useState(profileData.profilePicture);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('designation', designation);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('notes', notes);

      if (profileImage !== profileData.profilePicture) {
        const imageUriParts = profileImage.split('.');
        const fileType = imageUriParts[imageUriParts.length - 1];

        formData.append('profilePicture', {
          uri: profileImage,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      await axios.put('https://mohitbyproject-production.up.railway.app/api/adminprofile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: profileImage || 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.changeImageText}>Change Profile Picture</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Enter your name" />

      <Text style={styles.label}>Designation</Text>
      <TextInput value={designation} onChangeText={setDesignation} style={styles.input} placeholder="Enter your designation" />

      <Text style={styles.label}>Admin ID</Text>
      <TextInput value={profileData.adminId} editable={false} style={styles.disabledInput} />

      <Text style={styles.label}>Joining Date</Text>
      <TextInput value={profileData.joiningDate} editable={false} style={styles.disabledInput} />

      <Text style={styles.label}>Phone</Text>
      <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="Enter your phone number" keyboardType="phone-pad" />

      <Text style={styles.label}>Address</Text>
      <TextInput value={address} onChangeText={setAddress} style={styles.textArea} placeholder="Enter your address" multiline={true} />

      <Text style={styles.label}>Notes</Text>
      <TextInput value={notes} onChangeText={setNotes} style={styles.textArea} placeholder="Any additional notes" multiline={true} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFDEE9', // Updated background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#4A90E2',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: 'center',
    marginBottom: 15,
    borderColor: '#fff',
    borderWidth: 3,
    backgroundColor: '#e0e0e0',
  },
  changeImageText: {
    textAlign: 'center',
    color: '#FF6347', // Vibrant color for image change text
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '600',
  },
  label: {
    fontSize: 18,
    color: '#4A4A4A',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  disabledInput: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#E0E0E0',
    color: '#757575',
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
    height: 100, // Larger area for multiline input
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminEditProfile;
