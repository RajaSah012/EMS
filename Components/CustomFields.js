import React, { useState } from 'react';
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

const CustomFields = () => {
  const [fields, setFields] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [fieldName, setFieldName] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [menuVisible, setMenuVisible] = useState(null);

  const handleSave = () => {
    if (fieldName.trim() === '') {
      Alert.alert('Error', 'Field name is required.');
      return;
    }

    if (currentField) {
      // Edit existing field
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.id === currentField.id
            ? { ...field, name: fieldName, value: fieldValue }
            : field
        )
      );
      Alert.alert('Success', 'Field updated successfully.');
    } else {
      // Add new field
      const newField = { id: Date.now(), name: fieldName, value: fieldValue };
      setFields([...fields, newField]);
      Alert.alert('Success', 'Field added successfully.');
    }

    setModalVisible(false);
    setFieldName('');
    setFieldValue('');
    setCurrentField(null);
  };

  const handleEdit = (field) => {
    setCurrentField(field);
    setFieldName(field.name);
    setFieldValue(field.value);
    setModalVisible(true);
    setMenuVisible(null);
  };

  const handleDelete = (id) => {
    setFields(fields.filter((field) => field.id !== id));
    setMenuVisible(null);
    Alert.alert('Success', 'Field deleted successfully.');
  };

  const renderField = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.fieldName}>Name: {item.name}</Text>
        <Text style={styles.fieldValue}>Value: {item.value}</Text>
      </View>
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
          renderItem={renderField}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No fields added yet!</Text>}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Custom Field</Text>
        </TouchableOpacity>

        {/* Modal for Adding/Editing Fields */}
        <Modal transparent={true} visible={modalVisible} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {currentField ? 'Edit Field' : 'Add Custom Field'}
              </Text>
              <TextInput
                style={styles.input}
                value={fieldName}
                onChangeText={setFieldName}
                placeholder="Enter field name"
              />
              <TextInput
                style={styles.input}
                value={fieldValue}
                onChangeText={setFieldValue}
                placeholder="Enter field value (optional)"
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
  fieldName: {
    fontSize: 18,
    color: '#21618C',
    fontWeight: '600',
  },
  fieldValue: {
    fontSize: 16,
    color: '#2874A6',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#7B8D93',
    textAlign: 'center',
    marginTop: 20,
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
  saveButton: {
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

export default CustomFields;
