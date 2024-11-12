import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {
  const [qrAttendanceEnabled, setQrAttendanceEnabled] = useState(false);
  const [autoLiveTrackEnabled, setAutoLiveTrackEnabled] = useState(false);
  const [autoPresentEnabled, setAutoPresentEnabled] = useState(false);
  const [multiplePunchInEnabled, setMultiplePunchInEnabled] = useState(false);
  const [selfieAttendanceEnabled, setSelfieAttendanceEnabled] = useState(false);
  const [companyName, setCompanyName] = useState("Your Company Name");

  const handleToggle = (setting) => {
    Alert.alert(`${setting} toggled`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Company Details Section */}
      <View style={styles.settingSection}>
        <Text style={styles.sectionHeader}>Company Details</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="image" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Add Logo</Text>
              <Text style={styles.settingSubText}>Upload your company logo</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Company Name</Text>
          <TextInput 
            style={styles.input} 
            value={companyName} 
            onChangeText={setCompanyName} 
          />
          <Text style={styles.settingSubText}>Edit Company Details</Text>
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="pricetag" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>My Branches</Text>
              <Text style={styles.settingSubText}>Add or remove branches</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>My Departments</Text>
              <Text style={styles.settingSubText}>Add or remove departments</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="document-text" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>My Company Reports</Text>
              <Text style={styles.settingSubText}>Generate different types of reports</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* My Team Section */}
      <View style={styles.settingSection}>
        <Text style={styles.sectionHeader}>My Team</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Admins</Text>
              <Text style={styles.settingSubText}>Add or remove admins to your company</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Employees and Managers</Text>
              <Text style={styles.settingSubText}>Manage your staff</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Attendance & Leaves Section */}
      <View style={styles.settingSection}>
        <Text style={styles.sectionHeader}>Attendance & Leaves</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="qr-code" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>QR Code Attendance</Text>
              <Text style={styles.settingSubText}>Mark attendance using QR code</Text>
            </View>
          </View>
          <Switch 
            value={qrAttendanceEnabled} 
            onValueChange={() => {
              setQrAttendanceEnabled(!qrAttendanceEnabled);
              handleToggle('QR Code Attendance');
            }} 
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Auto Live Track</Text>
              <Text style={styles.settingSubText}>Track employees' live location</Text>
            </View>
          </View>
          <Switch 
            value={autoLiveTrackEnabled} 
            onValueChange={() => {
              setAutoLiveTrackEnabled(!autoLiveTrackEnabled);
              handleToggle('Auto Live Track');
            }} 
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Auto Present</Text>
              <Text style={styles.settingSubText}>Employee will mark present automatically</Text>
            </View>
          </View>
          <Switch 
            value={autoPresentEnabled} 
            onValueChange={() => {
              setAutoPresentEnabled(!autoPresentEnabled);
              handleToggle('Auto Present');
            }} 
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="arrow-redo" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Multiple Punch In</Text>
              <Text style={styles.settingSubText}>Employee can punch in multiple times</Text>
            </View>
          </View>
          <Switch 
            value={multiplePunchInEnabled} 
            onValueChange={() => {
              setMultiplePunchInEnabled(!multiplePunchInEnabled);
              handleToggle('Multiple Punch In');
            }} 
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="camera" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Selfie Attendance</Text>
              <Text style={styles.settingSubText}>Mark attendance using selfie</Text>
            </View>
          </View>
          <Switch 
            value={selfieAttendanceEnabled} 
            onValueChange={() => {
              setSelfieAttendanceEnabled(!selfieAttendanceEnabled);
              handleToggle('Selfie Attendance');
            }} 
          />
        </View>
      </View>

      {/* Salary Settings Section */}
      <View style={styles.settingSection}>
        <Text style={styles.sectionHeader}>Salary Settings</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Set Company Salary Heads</Text>
              <Text style={styles.settingSubText}>Create allowance heads for payroll processing</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="document" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Create Salary Template</Text>
              <Text style={styles.settingSubText}>Define templates for splitting Employee CTC</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </View>
      </View>

      {/* Alert & Notification Section */}
      <View style={styles.settingSection}>
        <Text style={styles.sectionHeader}>Alert & Notification</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="notifications" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>App Notifications</Text>
              <Text style={styles.settingSubText}>Get important alerts on App</Text>
            </View>
          </View>
          <Switch 
            value={true} 
            onValueChange={() => handleToggle('App Notifications')} 
          />
        </View>
      </View>

      {/* Other Settings Section */}
      <View style={styles.settingSection}>
        <Text style={styles.sectionHeader}>Other Settings</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="arrow-undo" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Change Company</Text>
              <Text style={styles.settingSubText}>Change current company</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="star" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Request A Feature</Text>
              <Text style={styles.settingSubText}>Give your valuable feedback</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="log-out" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.settingText}>Logout</Text>
              <Text style={styles.settingSubText}>Logout from device</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingSubText: {
    fontSize: 12,
    color: '#777',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default Settings;