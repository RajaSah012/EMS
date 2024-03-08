import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Start from './Components/Start';
import AdminRegistration from './Components/AdminRegistration';
import Login from './Components/Login';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import Support from './Components/Support';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import EmployeeMenu from './Components/EmployeeMenu';
import Employee from './Components/Employee';
import Category from './Components/Category';
import AddCategory from './Components/AddCategory';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="EmployeeMenu" component={EmployeeMenu} />
      {/* Add other tabs as needed */}
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="AdminRegistration" component={AdminRegistration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EmployeeLogin" component={EmployeeLogin} />
        <Stack.Screen name="EmployeeDetail" component={EmployeeDetail} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="CalculateSalary" component={CalculateSalary} />
        <Stack.Screen name="AddPayment" component={AddPayment} />
        <Stack.Screen name="PayEmployees" component={PayEmployees} />
        <Stack.Screen name="LiveLocation" component={LiveLocation} />
        <Stack.Screen name="Document" component={Document} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} />
        <Stack.Screen name="EditEmployee" component={EditEmployee} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
