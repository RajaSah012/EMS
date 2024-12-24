import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AttendanceSettings = () => {
  const [isAutoLiveEnabled, setIsAutoLiveEnabled] = useState(false);
  const toggleSwitch = () => setIsAutoLiveEnabled(!isAutoLiveEnabled);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Attendance Settings</Text>

      {/* Shifts and Breaks */}
      <SectionTitle title="Shifts and Breaks" />
      <MenuItem title="Shifts" isNew={true} iconName="time-outline" />
      <MenuItem title="Breaks" isNew={true} iconName="cafe-outline" />

      {/* Attendance Modes */}
      <SectionTitle title="Attendance Modes" />
      <MenuItem title="AI Face Recognition" isNew={true} iconName="scan-outline" disabled />
      <MenuItem title="QR Codes" iconName="qr-code-outline" />
      <MenuItem title="Biometric Devices" iconName="finger-print-outline" />
      <MenuItem title="Attendance Kiosk" iconName="person-outline" />
      <MenuItem title="Device Verification" iconName="tablet-portrait-outline" />

      {/* Leaves & Holidays */}
      <SectionTitle title="Leaves & Holidays" />
      <MenuItem title="Leave Requests" iconName="clipboard-outline" />
      <MenuItem title="Holiday List" iconName="calendar-outline" />
      <MenuItem title="Custom Paid Leaves" iconName="clipboard-outline" />

      {/* Automation */}
      <SectionTitle title="Automation" />
      <View style={styles.menuItem}>
        <View style={styles.left}>
          <Icon name="location-outline" size={24} color="#555" />
          <Text style={styles.menuText}>Auto-Live Track</Text>
        </View>
        <Switch value={isAutoLiveEnabled} onValueChange={toggleSwitch} />
      </View>
    </ScrollView>
  );
};

// Section Title Component
const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

// Menu Item Component
const MenuItem = ({ title, isNew, iconName, disabled }) => (
  <TouchableOpacity disabled={disabled} style={[styles.menuItem, disabled && styles.disabled]}>
    <View style={styles.left}>
      <Icon name={iconName} size={24} color="#555" />
      <Text style={styles.menuText}>{title}</Text>
      {isNew && <Text style={styles.newBadge}>New</Text>}
    </View>
    {!disabled && <Icon name="chevron-forward-outline" size={20} color="#999" />}
  </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: '#444',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  newBadge: {
    backgroundColor: 'red',
    color: '#fff',
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AttendanceSettings;