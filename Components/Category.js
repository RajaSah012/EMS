import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { IconButton, Card, Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editCategoryId]);

  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Fetched Token:", token); // Logging the token

      axios.get('https://mohitbyproject-production.up.railway.app/api/category/', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data) {
          setCategories(result.data);
        } else {
          Alert.alert("Error", result.data.Error);
        }
      })
      .catch(err => console.log(err));
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (id, name) => {
    setEditCategoryId(id);
    setNewCategoryName(name);
  };

  const handleSave = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Fetched Token:", token); // Logging the token

      axios.put(`https://mohitbyproject-production.up.railway.app/api/category/${id}`, { categoryName: newCategoryName }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data) {
          fetchCategories();
          setEditCategoryId(null);
          setNewCategoryName('');
        } else {
          Alert.alert("Error", result.data.Error);
        }
      })
      .catch(err => console.log(err));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Fetched Token:", token); // Logging the token

      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this category?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              axios.delete(`https://mohitbyproject-production.up.railway.app/api/category/${id}`, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              })
              .then(result => {
                if (result.data) {
                  fetchCategories();
                } else {
                  Alert.alert("Error", result.data.Error);
                }
              })
              .catch(err => console.log(err));
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const renderCategory = (category) => {
    return (
      <Card key={category.categoryId} style={styles.card}>
        <Card.Title
          title={
            <View style={styles.categoryContainer}>
              {editCategoryId === category.categoryId ? (
                <TextInput
                  style={styles.input}
                  value={newCategoryName}
                  onChangeText={setNewCategoryName}
                  ref={inputRef}
                  onBlur={() => handleSave(category.categoryId)}
                  placeholder="Enter category name"
                  placeholderTextColor="grey"
                />
              ) : (
                <Text>{category.categoryName}</Text>
              )}
            </View>
          }
          right={(props) => (
            <View style={styles.actions}>
              {editCategoryId === category.categoryId ? (
                <IconButton icon="content-save" onPress={() => handleSave(category.categoryId)} />
              ) : (
                <>
                  <IconButton icon="pencil" onPress={() => handleEdit(category.categoryId, category.categoryName)} />
                  <IconButton icon="delete" color="red" onPress={() => handleDelete(category.categoryId)} />
                </>
              )}
            </View>
          )}
        />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Category List" />
      </Appbar.Header>
      <ScrollView style={styles.tableContainer}>
        {categories.map(renderCategory)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: 8,
  },
  actions: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
    minWidth: 200,
  },
});

export default Category;
