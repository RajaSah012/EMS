import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

const Settings = () => {
  const navigation = useNavigation();

  const [branchInfo, setBranchInfo] = useState({ name: '', branches: 0, companyCode: '' });
  const [loading, setLoading] = useState(true);

  const fetchBranchData = async () => {
    try {
      const response = await fetch('https://example.com/api/branch-info'); 
      const data = await response.json();
      setBranchInfo({
        name: data.branchName || 'N/A',
        branches: data.branchCount || 0,
        companyCode: data.companyCode || 'N/A',
      });
    } catch (error) {
      console.error('Error fetching branch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranchData();
  }, []);

  const handleNavigation = (route) => {
    navigation.navigate(route);
  };

  const handleShareAppLink = async () => {
    const appLink = 'https://example.com/app-download'; 
    try {
      await Linking.openURL(`sms:?body=${appLink}`);
    } catch (error) {
      console.error('Error sharing app link:', error);
    }
  };

  const suggestedFeatures = [
    { name: 'Staff App', icon: 'user', route: 'StaffApp', iconColor: '#1abc9c' },
    { name: 'Attendance Kiosk', icon: 'clock', route: 'AttendanceKiosk', iconColor: '#3498db' },
    { name: 'Refer & Earn', icon: 'gift', route: 'ReferEarn', iconColor: '#e74c3c' },
    { name: 'Certificate Generator', icon: 'school', route: 'CertificateGenerator', iconColor: '#f39c12' },
    { name: 'Hire Staff', icon: 'briefcase', route: 'HireStaff', iconColor: '#9b59b6' },
    { name: 'Greetings', icon: 'smile', route: 'Greetings', iconColor: '#2ecc71' },
  ];

  const menuOptions = [
    
    
    { name: 'Custom Fields', route: 'CustomFields', icon: 'edit', iconColor: '#9b59b6' },
    { name: 'Salary Settings', route: 'SalarySettings', icon: 'money-bill', iconColor: '#f39c12' },
    { name: 'Reports', route: 'DailyReport', icon: 'file-alt', iconColor: '#1abc9c' },
    { name: 'Business Contracts', route: 'BusinessContracts', icon: 'business', iconColor: '#2c3e50' },
   
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }}
          style={styles.companyLogo}
        />
        <View style={styles.branchDetailsContainer}>
          <Text style={styles.branchName}>{branchInfo.name || 'Loading...'}</Text>
          <Text style={styles.branchCount}>
            {branchInfo.branches > 0
              ? `${branchInfo.branches} Branches Added`
              : 'No Branches Added'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleNavigation('CompanyDetails')}
        >
          <MaterialIcons name="edit" size={20} color="#3182CE" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00ADEF" style={styles.loader} />
      ) : (
        <>
          <Text style={styles.sectionTitle}>Suggested Features</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featureList}>
            {suggestedFeatures.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={() => handleNavigation(feature.route)}
              >
                <FontAwesome5
                  name={feature.icon}
                  size={40}
                  color={feature.iconColor}
                />
                <Text style={styles.featureText}>{feature.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.companyInfoContainer}>
            <View style={styles.companyCodeRow}>
              <Text style={styles.infoLabel}>Company Code:</Text>
              <Text style={styles.infoValue}>{branchInfo.companyCode}</Text>
            </View>
            <TouchableOpacity style={styles.shareContainer} onPress={handleShareAppLink}>
              <MaterialIcons name="share" size={20} color="#3182CE" />
              <Text style={styles.shareText}>Share App</Text>
            </TouchableOpacity>
          </View>

          {menuOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleNavigation(item.route)}
            >
              {item.icon === 'business' || item.icon === 'more-horiz' ? (
                <MaterialIcons name={item.icon} size={20} color={item.iconColor} />
              ) : (
                <FontAwesome5 name={item.icon} size={20} color={item.iconColor} />
              )}
              <Text style={styles.menuText}>{item.name}</Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#000"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#EEF2F7' 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 5,
  },
  companyLogo: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#3498db'
  },
  branchDetailsContainer: { 
    flex: 1 
  },
  branchName: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#2C3E50' 
  },
  branchCount: { 
    fontSize: 14, 
    color: '#7F8C8D', 
    marginTop: 5 
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#EAF6FF',
    elevation: 2,
  },
  editText: { 
    fontSize: 14, 
    color: '#3498DB', 
    marginLeft: 5 
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
    color: '#2C3E50',
  },
  featureList: { 
    flexDirection: 'row', 
    paddingHorizontal: 20 
  },
  featureCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginRight: 15,
    width: 100,
    height: 120,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureText: { 
    fontSize: 14, 
    textAlign: 'center', 
    color: '#2980B9', 
    fontWeight: 'bold' 
  },
  companyInfoContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 10, 
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyCodeRow: {
    flexDirection: 'column',
    flex: 1,
  },
  infoLabel: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#2C3E50', 
    marginBottom: 5 
  },
  infoValue: { 
    fontSize: 14, 
    color: '#34495E' 
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shareText: { 
    fontSize: 14, 
    color: '#3498DB', 
    fontWeight: 'bold', 
    marginLeft: 5 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
    color: '#2C3E50',
  },
  arrowIcon: {
    marginLeft: 5,
  },
  loader: {
    marginTop: 20,
  },
});

export default Settings;
