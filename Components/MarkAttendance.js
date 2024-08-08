import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, AppState } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import dayjs from 'dayjs';

const LOCATION_TASK_NAME = 'BACKGROUND_LOCATION_TASK';

const MarkAttendance = ({ navigation, employeeId }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState(null);
  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [locationLoggingInterval, setLocationLoggingInterval] = useState(null);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [isPunchedOut, setIsPunchedOut] = useState(false);
  const [punchInDate, setPunchInDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [warningMessage, setWarningMessage] = useState(null);
  const [punchOutButtonDisabled, setPunchOutButtonDisabled] = useState(true);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === 'granted');

      await AsyncStorage.setItem('employeeId', employeeId);

      if (locationStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
          timeInterval: 60000, // 1 minute
          distanceInterval: 0,
          showsBackgroundLocationIndicator: true,
        });
      }

      const storedPunchInDate = await AsyncStorage.getItem('punchInDate');
      if (storedPunchInDate && storedPunchInDate === dayjs().format('YYYY-MM-DD')) {
        setPunchInDate(storedPunchInDate);
        setIsPunchedIn(true);
        setPunchOutButtonDisabled(false);
      }

      const storedPunchOutDate = await AsyncStorage.getItem('punchOutDate');
      if (storedPunchOutDate && storedPunchOutDate === dayjs().format('YYYY-MM-DD')) {
        setIsPunchedOut(true);
        setPunchOutButtonDisabled(true);
      }
    })();
  }, [employeeId]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' && timerRunning) {
        setStartTime(Date.now() - timer * 1000);
      } else if (nextAppState === 'active' && timerRunning) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setTimer(elapsedTime);
        setStartTime(Date.now() - elapsedTime * 1000);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [timerRunning]);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!timerRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    const checkDateChange = setInterval(async () => {
      const today = dayjs().format('YYYY-MM-DD');
      if (today !== currentDate) {
        setCurrentDate(today);
        setIsPunchedIn(false);
        setIsPunchedOut(false);
        setPunchInDate(null);
        setPunchOutButtonDisabled(true);
        await AsyncStorage.removeItem('punchInDate');
        await AsyncStorage.removeItem('punchOutDate');
        setWarningMessage(null);
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkDateChange);
  }, [currentDate]);

  useEffect(() => {
    if (tracking && timerRunning) {
      const logInterval = setInterval(async () => {
        try {
          const locationResult = await Location.getCurrentPositionAsync({});
          console.log('Current location:', {
            latitude: locationResult.coords.latitude,
            longitude: locationResult.coords.longitude,
          });

          const storedEmployeeId = await AsyncStorage.getItem('employeeId');
          if (storedEmployeeId) {
            const response = await axios.post('YOUR_BACKEND_URL/location', {
              latitude: locationResult.coords.latitude,
              longitude: locationResult.coords.longitude,
              timestamp: new Date().toISOString(),
              employeeId: storedEmployeeId,
            });
            console.log('Location data sent:', response.data);
          } else {
            console.error('Employee ID not found in storage');
          }
        } catch (error) {
          console.error('Error fetching location or sending data:', error);
        }
      }, 60000); // Log and send every minute

      setLocationLoggingInterval(logInterval);
    } else if (!tracking) {
      clearInterval(locationLoggingInterval);
      setLocationLoggingInterval(null);
    }
  }, [tracking, timerRunning]);

  const startTimer = () => {
    setTimer(0);
    setStartTime(Date.now());
    setTimerRunning(true);
    setTracking(true);
    console.log('Timer started');
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTracking(false);
    console.log('Timer stopped');
  };

  const takePicture = async () => {
    if (camera) {
      try {
        const today = dayjs().format('YYYY-MM-DD');
        if (isPunchedIn && punchInDate === today) {
          setWarningMessage('You have already punched in today. You cannot take another punch-in snap.');
          return;
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const locationResult = await Location.getCurrentPositionAsync({});
          const currentLocation = {
            latitude: locationResult.coords.latitude,
            longitude: locationResult.coords.longitude,
          };

          startTimer();

          const data = await camera.takePictureAsync();
          setPicture({ uri: data.uri });

          const punchInTime = new Date().toLocaleString();

          const storedEmployeeId = await AsyncStorage.getItem('employeeId');
          await AsyncStorage.setItem('punchInDate', today);
          setPunchInDate(today);
          setIsPunchedIn(true);
          setPunchOutButtonDisabled(false);

          console.log('Sending punch-in data:', {
            time: punchInTime,
            location: currentLocation,
            pictureUri: data.uri,
            employeeId: storedEmployeeId,
          });
          const response = await axios.post('YOUR_BACKEND_URL/punchin', {
            time: punchInTime,
            location: currentLocation,
            pictureUri: data.uri,
            employeeId: storedEmployeeId,
          });
          console.log('Punch-in response:', response.data);
          console.log('Punch-in data sent successfully');

          setTracking(true);
        } else {
          console.error('Location permission not granted');
        }
      } catch (error) {
        console.error('Error taking picture or fetching location:', error);
      }
    }
  };

  const fetchLocation = async () => {
    try {
      const locationResult = await Location.getCurrentPositionAsync({});
      return {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      };
    } catch (error) {
      console.error('Error fetching location:', error);
      return null;
    }
  };

  const handlePunchOut = async () => {
    setTracking(false);
    stopTimer();
    const punchOutTime = new Date().toLocaleString();
    const currentLocation = await fetchLocation();
    const storedEmployeeId = await AsyncStorage.getItem('employeeId');
    console.log('Sending punch-out data:', {
      time: punchOutTime,
      location: currentLocation,
      employeeId: storedEmployeeId,
    });
    try {
      const response = await axios.post('YOUR_BACKEND_URL/punchout', {
        time: punchOutTime,
        location: currentLocation,
        employeeId: storedEmployeeId,
      });
      console.log('Punch-out response:', response.data);
      console.log('Punch-out data sent successfully');
    } catch (error) {
      console.error('Error sending punch-out data:', error);
    }

    // Resetting all relevant states
    setIsPunchedOut(true);
    await AsyncStorage.setItem('punchOutDate', dayjs().format('YYYY-MM-DD'));
    setPunchOutButtonDisabled(true);
  };

  // Format timer as hours:minutes:seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mark Attendance</Text>
      {hasCameraPermission === null || hasLocationPermission === null ? (
        <Text>Requesting permissions...</Text>
      ) : hasCameraPermission === false || hasLocationPermission === false ? (
        <Text>Permissions not granted.</Text>
      ) : (
        <>
          <Camera 
            style={styles.camera} 
            ref={(ref) => setCamera(ref)} 
            type={Camera.Constants.Type.front} // Use the front camera
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={takePicture}
              disabled={isPunchedIn && punchInDate === currentDate}
            >
              <Text style={styles.buttonText}>Punch In with Snap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, punchOutButtonDisabled && styles.disabledButton]}
              onPress={handlePunchOut}
              disabled={punchOutButtonDisabled}
            >
              <Text style={styles.buttonText}>Punch Out</Text>
            </TouchableOpacity>
          </View>
          {picture && <Image source={{ uri: picture.uri }} style={styles.preview} />}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Timer: {formatTime(timer)}</Text>
          </View>
          {warningMessage && <Text style={styles.warning}>{warningMessage}</Text>}
        </>
      )}
    </View>
  );
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Error in background location task:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    const [location] = locations;
    if (location) {
      const { latitude, longitude } = location.coords;
      const storedEmployeeId = await AsyncStorage.getItem('employeeId');
      if (storedEmployeeId) {
        const response = await axios.post('YOUR_BACKEND_URL/location', {
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
          employeeId: storedEmployeeId,
        });
        console.log('Background location data sent:', response.data);
      } else {
        console.error('Employee ID not found in storage');
      }
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  camera: {
    width: '80%',
    height: '40%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  timerContainer: {
    marginTop: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  warning: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default MarkAttendance;
