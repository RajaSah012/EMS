import React from 'react';
import { View, SafeAreaView } from 'react-native';
import DashboardHeader from './DashboardHeader';
import ImageSlider from './ImageSlider';
import SelfServiceCategory from './SelfServiceCategory';
import ManagementCategory from './ManagementCategory';

const Dashboard = () => {
  const notificationsCount = 0;

  return (
    <View style={{ flex: 1 }}>
      {/* <DashboardHeader notifications={notificationsCount} /> */}
      <SafeAreaView>
        <ImageSlider />
        <SelfServiceCategory />
        <ManagementCategory />
      </SafeAreaView>
    </View>
  );
};

export default Dashboard;
