import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { myAxios } from '../services/helper';

const AssignTask = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { employeeId } = route.params || {};
  const [employee, setEmployee] = useState({
    name: "",
  });
  const [taskName, setTaskName] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAbout, setTaskAbout] = useState('');

  useEffect(() => {
    if (!employeeId) {
      Alert.alert('Error', 'Employee ID is missing');
      navigation.goBack();
      return;
    }

    myAxios.get('/api/employee/' + employeeId)
      .then(result => {
        setEmployee({
          ...employee,
          name: result.data.name,
        });
      }).catch(err => console.log(err));
  }, [employeeId]);

  const handleSubmit = async () => {
    const newTask = {
      taskName,
      taskTitle,
      taskAbout,
      employeeId,
      name: employee.name,
    };
  
    try {
      const response = await myAxios.post('/api/tasks', newTask);
      console.log('Response:', response); // Log the response for debugging
  
      if (response.status === 201) {  // Check for status 201 for successful creation
        Alert.alert('Success', 'Task added successfully!');
        navigation.navigate('TaskList');
        setTaskName('');
        setTaskTitle('');
        setTaskAbout('');
      } else {
        console.error('Unexpected response status:', response.status);
        Alert.alert('Error', 'Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error); // Log the full error for debugging
      Alert.alert('Error', 'Error adding task');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Assigning Task to '{employee.name}' (ID: '{employeeId}')</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Task Title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Task Name"
          value={taskName}
          onChangeText={setTaskName}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Task Details"
          value={taskAbout}
          onChangeText={setTaskAbout}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AssignTask;
