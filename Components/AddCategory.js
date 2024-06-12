import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const navigation = useNavigation();

    const handleSubmit = () => {
        axios.post('https://emsproject-production.up.railway.app/api/category/', { categoryName: category })
            .then(result => {
                if (result.data) {
                    navigation.navigate('Category');
                    // Fetch categories again to update the list
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Category' }],
                    });
                } else {
                    Alert.alert('Error', result.data);
                }
            })
            .catch(err => console.log(err));
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
                        onChangeText={setCategory}
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
        fontWeight: 'bold', // Use fontWeight to make text bold
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
});

export default AddCategory;
