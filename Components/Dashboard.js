import React from 'react';
import { View, Text } from 'react-native';
import DashboardHeader from './DashboardHeader';

const Dashboard = () => {
  // Dummy notifications count for demonstration
  const notificationsCount = 0;

  return (
    <View>
      <DashboardHeader notifications={notificationsCount} />
      
    </View>
  );
};

export default Dashboard;
