import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmployeeMenu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Manage Employee</Text>
      </View>
      <View style={styles.menu}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Employee Details</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Attendance Details</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Bank Details</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Salary Details</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Leave Balance & Policy</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Penalty & Overtime</Text>
        </View>
      </View>
      <View style={styles.empMenu}>
        <View style={styles.imageContainer}>
          <Image source={require('../Images/emp-bg.png')} style={styles.image} />
        </View>
        <Text style={styles.addStaffHeader}>Add your Staff</Text>
        <Text style={styles.addStaffText}>Add your staff to get started.</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEmployee')}>
            <Text style={styles.buttonText}>Add Employee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Multiple Employee</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    fontSize: 16,
  },
  empMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  addStaffHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addStaffText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EmployeeMenu;
