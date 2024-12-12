import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
  const navigation = useNavigation();

  // State to store data from the backend
  const [branchInfo, setBranchInfo] = useState({ name: '', branches: 0 });

  // Function to fetch data from the backend
  const fetchBranchData = async () => {
    try {
      const response = await fetch('https://example.com/api/branch-info'); // Replace with your API URL
      const data = await response.json();
      setBranchInfo({
        name: data.branchName, // Update these keys as per your API response
        branches: data.branchCount,
      });
    } catch (error) {
      console.error('Error fetching branch data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBranchData();
  }, []);

  const handleNavigation = (route) => {
    navigation.navigate(route);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
        <View>
          <Text style={styles.branchName}>{branchInfo.name || 'Loading...'}</Text>
          <Text style={styles.branchDetail}>
            {branchInfo.branches > 0
              ? `${branchInfo.branches} branches added`
              : 'No branches added'}
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Suggested Features */}
      <Text style={styles.sectionTitle}>Suggested Features</Text>
      <View style={styles.features}>
        {[
          { name: 'Staff App', icon: 'https://via.placeholder.com/50', route: 'StaffApp' },
          { name: 'Attendance Kiosk', icon: 'https://via.placeholder.com/50', route: 'AttendanceKiosk' },
          { name: 'Refer & Earn', icon: 'https://via.placeholder.com/50', route: 'ReferEarn' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            onPress={() => handleNavigation(item.route)}
          >
            <Image source={{ uri: item.icon }} style={styles.featureIcon} />
            <Text style={styles.featureText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Company Info */}
      <View style={styles.info}>
        <Text style={styles.infoLabel}>Company Code:</Text>
        <Text style={styles.infoValue}>YFHIUK</Text>
        <TouchableOpacity>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      {[
        { name: 'VIP Membership', route: 'VipMembership' },
        { name: 'Wallet', route: 'Wallet' },
        { name: 'Background Verification', route: 'BackgroundVerification' },
        { name: 'Users & Permissions', route: 'UsersPermissions' },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => handleNavigation(item.route)}
        >
          <Text style={styles.menuText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  logo: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  branchName: { fontSize: 18, fontWeight: 'bold' },
  branchDetail: { fontSize: 14, color: 'gray' },
  editButton: { marginLeft: 'auto' },
  editText: { color: '#00f', fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', padding: 16 },
  features: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  featureCard: { alignItems: 'center' },
  featureIcon: { width: 50, height: 50 },
  featureText: { fontSize: 12, marginTop: 5 },
  info: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  infoLabel: { fontWeight: 'bold' },
  infoValue: { marginLeft: 8 },
  shareText: { color: '#00f', marginLeft: 'auto' },
  menuItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuText: { fontSize: 16 },
});

export default Setting;
