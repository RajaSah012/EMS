import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const MiniDropdown = ({ onClose }) => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          Alert.alert("Error", result.data.Error);
        }
      });
  };

  const modelRef = useRef();

  const closeModel = (e) => {
    if (modelRef.current && e.target === modelRef.current) {
      onClose();
    }
  };

  return (
    <View ref={modelRef} onStartShouldSetResponder={() => true} onResponderRelease={closeModel} style={styles.dropDownProfile}>
      <View style={styles.header}>
        {admins.map((admin, index) => (
          <Text key={index} style={styles.adminName}>{admin.name}</Text>
        ))}
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeIcon}>✖</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Profile clicked')}>
        <Text style={styles.itemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Logout clicked')}>
        <Text style={styles.itemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownProfile: {
    position: 'absolute',
    top: 50,
    right: 10,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1000,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingBottom: 5,
  },
  adminName: {
    fontSize: 16,
  },
  closeIcon: {
    fontSize: 18,
    color: '#ff0000',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default MiniDropdown;
