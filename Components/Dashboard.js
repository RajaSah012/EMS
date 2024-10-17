import React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, StyleSheet } from 'react-native';

import SelfServiceCategory from './SelfServiceCategory';
import ManagementCategory from './ManagementCategory';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView>
          
          <SelfServiceCategory />
          <ManagementCategory />
          
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    width: width,
  },
  additionalContent: {
    marginTop: 20,
    // Add styling for additional content if needed
  },
});

export default Dashboard;
