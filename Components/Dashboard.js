import React from 'react';
import { View, Text, SafeAreaView } from 'react-native'; // Import Text component
import DashboardHeader from './DashboardHeader';
import ImageSlider from './ImageSlider'; // Import the ImageSlider component

const Dashboard = () => {
  // Dummy notifications count for demonstration
  const notificationsCount = 0;

  // Dummy images for demonstration
  

  return (
    <View style={{ flex: 1 }}>
      <DashboardHeader notifications={notificationsCount} />
      <SafeAreaView>
				<ImageSlider />
			</SafeAreaView>
    </View>
  );
};


export default Dashboard;
