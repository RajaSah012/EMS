import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import * as Location from 'expo-location';
import axios from 'axios';

const LiveLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    requestPermissionAndStartLocationUpdates();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const requestPermissionAndStartLocationUpdates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
    startSendingLocation();
  };

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const newLocation = { latitude, longitude };
      
      if (!previousLocation || hasLocationChanged(previousLocation, newLocation)) {
        setPreviousLocation(newLocation);
        setCurrentLocation(newLocation); // Update current location state
        sendLocationToBackend(newLocation, true);
      } else {
        sendLocationToBackend(previousLocation, false);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const hasLocationChanged = (prevLocation, newLocation) => {
    const distance = calculateDistance(prevLocation, newLocation);
    return distance > 0.1; // Change threshold distance as needed (in kilometers)
  };

  const calculateDistance = (loc1, loc2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRad(loc2.latitude - loc1.latitude);
    const dLon = toRad(loc2.longitude - loc1.longitude);
    const lat1 = toRad(loc1.latitude);
    const lat2 = toRad(loc2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const sendLocationToBackend = async (location, hasMoved) => {
    try {
      await axios.post('http://your-spring-boot-server/api/location', {
        latitude: location.latitude,
        longitude: location.longitude,
        hasMoved
      });
      console.log('Location sent to backend');
    } catch (error) {
      console.error('Error sending location to backend:', error);
    }
  };

  const startSendingLocation = () => {
    getCurrentLocation(); // Initial fetch and send
    const id = setInterval(getCurrentLocation, 300000); // Check location every 5 minutes (300,000 ms)
    setIntervalId(id);
  };

  const openMaps = () => {
    const { latitude, longitude } = currentLocation || {};
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      Alert.alert('Location not available');
    }
  };

  return (
    <View>
      <Text>Get Coords</Text>
      <View style={{
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        alignContent: 'center'
      }}>
        <Text>Latitude: {currentLocation ? currentLocation.latitude : 'Loading...'}</Text>
        <Text>Longitude: {currentLocation ? currentLocation.longitude : 'Loading...'}</Text>
      </View>

      {currentLocation && (
        <TouchableOpacity onPress={openMaps}>
          <View style={{
            backgroundColor: 'red',
            padding: 10,
            alignItems: 'center',
            margin: 10,
          }}>
            <Text>Open Map</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LiveLocation;
