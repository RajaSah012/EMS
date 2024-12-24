import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const CustomFieldsScreen = () => {
  const [fields, setFields] = useState([]); // Stores the fields fetched from backend
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const [menuVisible, setMenuVisible] = useState(null);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [newFieldValue, setNewFieldValue] = useState('');

  // Fetch fields from the backend API
  const fetchFields = async () => {
    try {
      const response = await axios.get('https://your-backend-url.com/custom-fields');
      setFields(response.data); // Store the fetched data
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  // Handle Edit Field
  const handleEdit = (field) => {
    setSelectedField(field);
    setEditedValue(field.value);
    setMenuVisible(null);
    setModalVisible(true);
  };

  // Handle Delete Field
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://your-backend-url.com/custom-fields/${id}`);
      Alert.alert('Success', 'Field deleted successfully.');
      fetchFields(); // Refresh the fields after deletion
    } catch (error) {
      console.error('Error deleting field:', error);
    }
  };

  // Submit Edited Value
  const submitEdit = async () => {
    try {
      await axios.put(`https://your-backend-url.com/custom-fields/${selectedField.id}`, {
        value: editedValue,
      });
      Alert.alert('Success', 'Field updated successfully.');
      setModalVisible(false);
      fetchFields(); // Refresh fields after update
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  // Handle Add New Field
  const handleAddField = async () => {
    if (newFieldValue.trim() === '') {
      Alert.alert('Error', 'Field value cannot be empty.');
      return;
    }
    try {
      await axios.post('https://your-backend-url.com/custom-fields', {
        value: newFieldValue,
      });
      setAddModalVisible(false);
      setNewFieldValue('');
      fetchFields(); // Refresh after adding a new field
      Alert.alert('Success', 'Field added successfully.');
    } catch (error) {
      console.error('Error adding field:', error);
    }
  };

  // Fetch fields when the component mounts
  useEffect(() => {
    fetchFields();
  }, []);

  // Render each item in the list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.fieldText}>{item.value}</Text>
      <Menu
        visible={menuVisible === item.id}
        onDismiss={() => setMenuVisible(null)}
        anchor={
          <TouchableOpacity onPress={() => setMenuVisible(item.id)}>
            <MaterialIcons name="more-vert" size={24} color="#2980B9" />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => handleEdit(item)} title="Edit" />
        <Menu.Item onPress={() => handleDelete(item.id)} title="Delete" />
      </Menu>
    </View>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Custom Fields</Text>

        <FlatList
          data={fields}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />

        {/* Add Field Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Custom Field</Text>
        </TouchableOpacity>

        {/* Modal for Editing */}
        <Modal transparent={true} visible={isModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Field</Text>
              <TextInput
                style={styles.input}
                value={editedValue}
                onChangeText={setEditedValue}
                placeholder="Enter new value"
              />
              <TouchableOpacity style={styles.editButton} onPress={submitEdit}>
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for Adding New Field */}
        <Modal transparent={true} visible={isAddModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Custom Field</Text>
              <TextInput
                style={styles.input}
                value={newFieldValue}
                onChangeText={setNewFieldValue}
                placeholder="Enter field value"
              />
              <TouchableOpacity style={styles.editButton} onPress={handleAddField}>
                <Text style={styles.actionText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EBF5FB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2E86C1',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D6EAF8',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#AED6F1',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  fieldText: {
    fontSize: 18,
    color: '#21618C',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FDFEFE',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#154360',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A9CCE3',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    color: '#1B4F72',
    backgroundColor: '#F2F3F4',
  },
  actionText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  editButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default CustomFieldsScreen;
