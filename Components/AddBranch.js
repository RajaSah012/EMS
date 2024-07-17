import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddBranch = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [radius, setRadius] = useState(100);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };

    getLocationPermission();
  }, []);

  const handleContinue = () => {
    setStep(2);
  };

  const handleAddBranch = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch('https://your-backend-api.com/branches', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          location,
          radius,
        }),
      });
      setShowConfirmation(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding branch:', error);
    }
  };

  const handleLocationChange = (e) => {
    const newLocation = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };
    setLocation(newLocation);
    setAddress(`${newLocation.latitude}, ${newLocation.longitude}`);
  };

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>Add New Branch</Text>
          <TextInput
            placeholder="Branch Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.stepContainer}>
          {showAutocomplete ? (
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={(data, details = null) => {
                const newLocation = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setLocation(newLocation);
                setAddress(details.formatted_address);
                setShowAutocomplete(false);
              }}
              query={{
                key: 'YOUR_GOOGLE_MAPS_API_KEY',
                language: 'en',
              }}
              fetchDetails={true}
              styles={{
                textInputContainer: {
                  width: '100%',
                },
                textInput: {
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
            />
          ) : (
            <>
              <MapView
                style={styles.map}
                onPress={handleLocationChange}
                initialRegion={{
                  latitude: currentLocation ? currentLocation.latitude : 37.78825,
                  longitude: currentLocation ? currentLocation.longitude : -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {location && (
                  <Marker coordinate={location} />
                )}
                {currentLocation && (
                  <Marker
                    coordinate={currentLocation}
                    pinColor="blue"
                    title="Current Location"
                  />
                )}
                {location && (
                  <Circle
                    center={location}
                    radius={radius}
                    strokeWidth={2}
                    strokeColor="rgba(0, 122, 255, 0.5)"
                    fillColor="rgba(0, 122, 255, 0.2)"
                  />
                )}
              </MapView>
              <View style={styles.infoContainer}>
                <Text style={styles.addressLabel}>Company Location</Text>
                <TextInput
                  style={styles.addressInput}
                  placeholder="Enter company address"
                  value={address}
                  onFocus={() => setShowAutocomplete(true)}
                />
                <View style={styles.currentLocationContainer}>
                  <Text style={styles.currentLocationLabel}>Current location:</Text>
                  <Text style={styles.currentLocationText}>
                    {currentLocation ? `${currentLocation.latitude}, ${currentLocation.longitude}` : 'Fetching current location...'}
                  </Text>
                </View>
                <Text style={styles.radiusLabel}>Maximum Attendance Radius</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={100}
                  maximumValue={1000}
                  value={radius}
                  onValueChange={setRadius}
                />
                <Text style={styles.radiusValue}>{radius} m</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => setShowConfirmation(true)}>
                  <Text style={styles.buttonText}>Add New Branch</Text>
                </TouchableOpacity>
              </View>
              <Modal
                transparent={true}
                visible={showConfirmation}
                animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text>Are you sure you want to add this branch?</Text>
                    <View style={styles.modalButtons}>
                      <TouchableOpacity style={styles.modalButton} onPress={() => setShowConfirmation(false)}>
                        <Text style={styles.buttonText}>No</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.modalButton} onPress={handleAddBranch}>
                        <Text style={styles.buttonText}>Yes</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#00C7BE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: -20,
  },
  addressLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  currentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentLocationLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  currentLocationText: {
    fontSize: 14,
  },
  radiusLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  radiusValue: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#00C7BE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  modalButton: {
    backgroundColor: '#00C7BE',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});

export default AddBranch;
