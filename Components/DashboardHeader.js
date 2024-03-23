import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';

const DashboardHeader = ({ notifications }) => {
  return (
    <Header
      containerStyle={styles.headerContainer}
      placement="left"
      leftContainerStyle={styles.leftContainer}
       leftComponent={<Icon name="menu" onPress={() => {/* handle menu press */}} />}
      centerComponent={
        <View style={styles.centerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.dashboardText}></Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.officeText}>.</Text>
          </View>
        </View>
      }
      rightComponent={
        <View style={styles.notificationContainer}>
          <Icon
            name="location-on"
            onPress={() => {/* handle location icon press */}}
            color="#fff"
            size={24}
            containerStyle={styles.iconContainer}
          />
          <Icon
            name="notifications"
            onPress={() => {/* handle notification icon press */}}
            color="#fff"
            size={24}
            containerStyle={styles.iconContainer}
          />
          {notifications > 0 && <Badge value={notifications} status="error" containerStyle={styles.badge} />}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2f95dc',
    justifyContent: 'space-between',
    paddingTop: 0, 
  },
  centerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardText: {
    color: '#fff',
    fontSize: 20,
  },
  officeText: {
    color: '#fff',
    fontSize: 15.5, 
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  leftContainer: {
    paddingRight: 20, 
  },
  iconContainer: {
    marginLeft: 30, 
  },
});

export default DashboardHeader;
