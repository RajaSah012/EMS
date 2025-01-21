import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainDrawerNavigation from './MainDrawerNavigation';

// App Entry Point
export default function App() {
  return (
    <NavigationContainer>
      {/* Main navigation of the app */}
      <MainDrawerNavigation />
    </NavigationContainer>
  );
}