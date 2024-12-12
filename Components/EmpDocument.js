import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { myAxios } from '../services/helper';
import { Button, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmpDocument = () => {
  const [documents, setDocuments] = useState({
    matric: null,
    inter: null,
    graduation: null,
    pg: null,
    aadhar: null,
    pan: null,
    dl: null,
  });

  const handlePickImage = async (key) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setDocuments({ ...documents, [key]: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(documents).forEach(key => {
      if (documents[key]) {
        formData.append(key, {
          uri: documents[key],
          type: 'image/jpeg',
          name: `${key}.jpg`,
        });
      }
    });

    const token = 'your-auth-token';

    try {
      const response = await myAxios.post(
        '/api/document/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        Alert.alert('Success', 'Documents uploaded successfully');
      } else {
        Alert.alert('Error', 'Failed to upload documents');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Upload Your Documents</Text>
        <Card style={styles.card}>
          {Object.keys(documents).map((key) => (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>
                <Icon name="insert-drive-file" size={20} color="#FF6347" />
                {' '}{key.replace(/([A-Z])/g, ' $1')}
              </Text>
              <Button
                mode="contained"
                onPress={() => handlePickImage(key)}
                style={styles.pickButton}
                labelStyle={styles.buttonText}
              >
                {documents[key] ? 'Change Image' : 'Pick Image'}
              </Button>
              {documents[key] && (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: documents[key] }}
                    style={styles.image}
                  />
                  <Text style={styles.imageName}>{`${key.replace(/([A-Z])/g, ' $1')} Image`}</Text>
                </View>
              )}
            </View>
          ))}
          <Button mode="contained" onPress={handleSubmit} style={styles.submitButton} labelStyle={styles.buttonText}>
            Submit Documents
          </Button>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  row: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickButton: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFDEE9',
    borderColor: '#FF6347',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6347',
  },
  imageName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#555555',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#B5FFFC',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6347',
  },
});

export default EmpDocument;
