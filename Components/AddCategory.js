import React, { useState } from 'react';
import { View, StyleSheet, Animated, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [animatedValue] = useState(new Animated.Value(0));

  const handleAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = () => {
    if (!categoryName.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill out all fields');
    } else {
      console.log('Category Name:', categoryName);
      console.log('Description:', description);
      Alert.alert('Success', 'Form data has been logged to console');
      handleAnimation(); // Start the animation

      // You can uncomment the below code to simulate sending data to a server using Axios
      // const endpoint = 'YOUR_BACKEND_ENDPOINT';
      // axios.post(endpoint, { categoryName, description })
      //   .then(response => {
      //     console.log('Response:', response.data);
      //     Alert.alert('Success', 'Category added successfully');
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //     Alert.alert('Error', 'Failed to add category');
      //   });
    }
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Input
        placeholder="Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
        inputContainerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        inputContainerStyle={styles.inputContainer}
      />
      <Button
        title="Add Category"
        onPress={handleSubmit}
        buttonStyle={styles.submitButton}
        containerStyle={styles.submitButtonContainer}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#ff6347', // Coral color
    borderRadius: 10,
  },
  submitButtonContainer: {
    width: '50%',
  },
});

export default AddCategory;
