import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const navigation = useNavigation();

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); // Await the AsyncStorage call

            const response = await axios.post(
                "https://emsproject-production.up.railway.app/api/category/",
                {
                    categoryName: category // Adjust as per your API's expected data structure
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.data) {
                // Reset navigation stack to 'Category' screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Category' }],
                });
            } else {
                Alert.alert('Error', response.data); // Handle error response
            }
        } catch (error) {
            console.log('Error:', error);
            Alert.alert('Error', 'An error occurred. Please try again.'); // Generic error message
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.heading}>Add Category</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Category'
                        onChangeText={text => setCategory(text)}
                    />
                </View>
                <Button title='Add Category' onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
});

export default AddCategory;
