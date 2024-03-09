import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import Start from './Components/Start';
import AdminRegistration from './Components/AdminRegistration';
import Login from './Components/Login';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import Support from './Components/Support';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import EmployeeMenu from './Components/EmployeeMenu';
import Profile from './Components/Profile';
import Attendance from './Components/Attendance';
import Report from './Components/Report';
import Notification from './Components/Notification';
import CalculateSalary from './Components/CalculateSalary';
import AddPayment from './Components/AddPayment';
import PayEmployees from './Components/PayEmployees';
import LiveLocation from './Components/LiveLocation';
import Document from './Components/Document';
import Settings from './Components/Settings';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DashboardTabs() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="EmployeeMenu" component={EmployeeMenu} />
    {/* Add other tabs/screens as needed */}
  </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Start" component={Start} />
        <Drawer.Screen name="AdminRegistration" component={AdminRegistration} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="EmployeeLogin" component={EmployeeLogin} />
        <Drawer.Screen name="EmployeeDetail" component={EmployeeDetail} />
        <Drawer.Screen name="EmployeeMenu" component={EmployeeMenu} />
        <Drawer.Screen name="Support" component={Support} />
        <Drawer.Screen name="Dashboard" component={DashboardTabs} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Attendance" component={Attendance} />
        <Drawer.Screen name="Report" component={Report} />
        <Drawer.Screen name="Notification" component={Notification} />
        <Drawer.Screen name="CalculateSalary" component={CalculateSalary} />
        <Drawer.Screen name="AddPayment" component={AddPayment} />
        <Drawer.Screen name="PayEmployees" component={PayEmployees} />
        <Drawer.Screen name="LiveLocation" component={LiveLocation} />
        <Drawer.Screen name="Document" component={Document} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="AddEmployee" component={AddEmployee} />
        <Drawer.Screen name="EditEmployee" component={EditEmployee} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Define your styles here using the StyleSheet component
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Example background color
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Example text color
  },
});

export default App;
