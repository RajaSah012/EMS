import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const AddCategory = () => {
    const [category, setCategory] = useState('');

    const handleSubmit = () => {
        if (category.trim() === '') {
            Alert.alert('Error', 'Please enter a category');
            return;
        }
        
        axios.post('http://localhost:3000/auth/add_category', { category })
            .then(result => {
                if (result.data.Status) {
                    // Successfully added category, you can navigate here
                } else {
                    Alert.alert('Error', result.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Error', 'Something went wrong');
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Category</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Category:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Category'
                    onChangeText={(text) => setCategory(text)}
                    value={category}
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Category</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '100%',
    },
    addButton: {
        backgroundColor: 'green',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddCategory;
