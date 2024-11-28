import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Camera from 'expo-camera';
import { Text } from 'react-native-paper';

// Import your components here
import Start from './Components/Start';

import AdminRegistration from './Components/AdminRegistration';
import Login from './Components/Login';
import Home from './Components/Home';
import AddCategory from './Components/AddCategory';
import Category from './Components/Category';
import EmployeeLogin from './Components/EmployeeLogin';
//import EmployeeDetail from './Components/EmployeeDetail';
import Support from './Components/Support';
import Dashboard from './Components/Dashboard';
import EmployeeMenu from './Components/EmployeeMenu';
import Profile from './Components/Profile';
import AdminProfile from './Components/AdminProfile';
import AdminEditProfile from './Components/AdminEditProfile';
import Attendance from './Components/Attendance';
import Notification from './Components/Notification';
import CalculateSalary from './Components/CalculateSalary';
import AddPayment from './Components/AddPayment';
import PayEmployees from './Components/PayEmployees';
import KycVerification from './Components/KycVerification';
import KycUpdate from './Components/KycUpdate';
import PaySalary from './Components/PaySalary';

import LiveLocation from './Components/LiveLocation';
import Document from './Components/Document';
import Settings from './Components/Settings';
import Employee from './Components/Employee';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import MarkAttendance from './Components/MarkAttendance';










import DailyRepoart from './Components/DailyRepoart';
import Report from './Components/Report';
import ReportFilter from './Components/ReportFilter';
import GeneratePayslip from './Components/GeneratePayslip';
import useLogout from './Components/useLogout';

import LogoutButton from './Components/LogoutButton';
import CurrentEmployee from './Components/CurrentEmployee';
import LeaveList from './Components/LeaveList';
import ListReimbursement from './Components/ListReimbursement';
import AttendanceFilter from './Components/AttendanceFilter';
import AttendanceRegularization from './Components/AttendanceRegularization';
import OdList from './Components/OdList';
import TaskList from './Components/TaskList';
import TaskListFilter from './Components/TaskListFilter';

// Import the new CompanyDetails component
import CompanyDetails from './Components/CompanyDetails';
import Branches from './Components/Branches';
import AddBranch from './Components/AddBranch';
import EmpDashboard from './Components/EmpDashboard';
import RequestLeave from './Components/RequestLeave';
import EmpViewAttendance from './Components/EmpViewAttendance';
import EmpDocument from './Components/EmpDocument';
import EmpHolidayList from './Components/EmpHolidayList';
import EmpTask from './Components/EmpTask';
import AddTask from './Components/AddTask';
import AssignTask from './Components/AssignTask';
import ForgotPassword from './Components/ForgotPassword';
import EmployeeEditProfile from './Components/EmployeeEditProfile';




const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('CompanyDetails')}>
        <MaterialIcons name="add" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LiveLocation')}>
        <MaterialIcons
          name="location-on"
          size={24}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <MaterialIcons
          name="notifications"
          size={24}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const [expandedSections, setExpandedSections] = useState({
    AdminTask: false,
    AdminRest: false,
    AllTask: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      heading: 'Admin Task',
      key: 'AdminTask',
      options: [
        { name: 'AdminRegistration', label: 'Admin Registration', icon: 'person-add' },
        { name: 'AdminLogin', label: 'Admin Login', icon: 'log-in' },
        { name: 'AddCategory', label: 'Add Category', icon: 'add' },
        { name: 'Category', label: 'Category', icon: 'albums' },
        { name: 'Home', label: 'AdminDashboard', icon: 'albums' },
        { name: 'EmployeeLogin', label: 'Employee Login', icon: 'person' },
        { name: 'Settings', label: 'Settings', icon: 'settings' },
        
      ],
      color: '#FFB6C1', // Pinkish color for admin section
    },
    {
      heading: 'Admin Rest',
      key: 'AdminRest',
      options: [
        { name: 'Support', label: 'Support', icon: 'chatbubbles-outline' },
        { name: 'Dashboard', label: 'Dashboard', icon: 'grid' },
        { name: 'Profile', label: 'Profile', icon: 'person-circle' },
        { name: 'AdminProfile', label: 'Admin Profile', icon: 'person' },
        { name: 'Attendance', label: 'Attendance', icon: 'accessibility' },
        { name: 'Notification', label: 'Notification', icon: 'notifications' },
        { name: 'CalculateSalary', label: 'Calculate Salary', icon: 'cash' },
        { name: 'AddPayment', label: 'Add Payment', icon: 'cash-outline' },
        { name: 'PayEmployees', label: 'Pay Employees', icon: 'cash-sharp' },
        { name: 'kycVerification', label: 'KYC Verification', icon: 'checkmark-circle' },
      ],
      color: '#B5FFFC', // Light blue for admin rest section
    },
    {
      heading: 'All Task',
      key: 'AllTask',
      options: [
        { name: 'EmpDashboard', label: 'Employee Dashboard', icon: 'grid' },
        { name: 'Employee', label: 'Employees', icon: 'grid' },
        { name: 'EmployeeMenu', label: 'EmployeeMenu', icon: 'grid' },
        { name: 'AddEmployee', label: 'AddEmployee', icon: 'grid' },
        { name: 'DailyReport', label: 'DailyReport', icon: 'grid' },
        { name: 'Report', label: 'Report', icon: 'grid' },
        { name: 'ReportFilter', label: 'ReportFilter', icon: 'grid' },
        { name: 'GeneratePayslip', label: 'GeneratePayslip', icon: 'grid' },
        { name: 'LogoutButton', label: 'LogoutButton', icon: 'grid' },
        { name: 'CurrentEmployee', label: 'CurrentEmployees', icon: 'grid' },
        { name: 'LeaveList', label: 'LeaveList', icon: 'grid' },
        
        { name: 'List Reimbursement', label: 'List Reimbursements', icon: 'grid' },
        { name: 'AttendanceFilter', label: 'AttendanceFilter', icon: 'grid' },
        { name: 'AttendanceRegularization', label: 'AttendanceRegularization', icon: 'grid' },
        { name: 'OdList', label: 'OdList', icon: 'grid' },
        { name: 'TaskList', label: 'TaskList', icon: 'grid' },
        { name: 'TaskListFilter', label: 'TaskListFilter', icon: 'grid' },
        { name: 'MarkAttendance', label: 'MarkAttendance', icon: 'grid' },
        { name: 'RequestLeave', label: 'Request Leave', icon: 'log-out-outline' },
        { name: 'ViewAttendance', label: 'Emp View Attendance', icon: 'calendar-outline' },
        { name: 'Document', label: 'Document', icon: 'document-outline' },
        { name: 'EmpHolidayList', label: 'Holiday List', icon: 'today-outline' },
        { name: 'My Document', label: 'My Documents', icon: 'clipboard-outline' },
        { name: 'Task', label: 'Task', icon: 'clipboard-outline' },
        { name: 'AddTask', label: 'Add Task', icon: 'add-outline' },
        
      ],
      color: '#FFD700', // Golden color for all tasks section
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('./assets/Images/Acetech-logo.png')}
          style={{ width: 70, height: 70, borderRadius: 60, marginBottom: 10 }}
        />
        <Text style={styles.username}>STAFF WORLD</Text>
      </View>
      {sections.map((section) => (
        <View key={section.key}>
          <TouchableOpacity
            style={[styles.sectionHeader, { backgroundColor: section.color }]}
            onPress={() => toggleSection(section.key)}
          >
            <Text style={styles.sectionHeading}>{section.heading}</Text>
            <MaterialIcons
              name={expandedSections[section.key] ? 'expand-less' : 'expand-more'}
              size={28}
              color="#000"
            />
          </TouchableOpacity>
          {expandedSections[section.key] &&
            section.options.map((option) => (
              <DrawerItem
                key={option.name}
                label={option.label}
                onPress={() => props.navigation.navigate(option.name)}
                icon={() => (
                  <Ionicons
                    name={option.icon}
                    size={24}
                    color={section.color}
                  />
                )}
                labelStyle={styles.drawerLabel}
                style={styles.drawerItem}
              />
            ))}
        </View>
      ))}
    </DrawerContentScrollView>
  );
};





const MainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Start"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#880808' },
        headerTintColor: 'white',
        headerRight: () => <CustomHeader navigation={navigation} />,
      })}
    >
      {/* Add your Drawer.Screen components here */}
      <Drawer.Screen name="Start" component={Start} />
      
      <Drawer.Screen name="AdminRegistration" component={AdminRegistration} />
      <Drawer.Screen name="AdminLogin" component={Login} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="AddCategory" component={AddCategory} />
      <Drawer.Screen name="Category" component={Category} />
      <Drawer.Screen name="EmployeeLogin" component={EmployeeLogin} />
    
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="AdminProfile" component={AdminProfile} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="CalculateSalary" component={CalculateSalary} />
      <Drawer.Screen name="AddPayment" component={AddPayment} />
      <Drawer.Screen name="PayEmployees" component={PayEmployees} />
      <Drawer.Screen name="kycVerification" component={KycVerification} />
     
      
      <Drawer.Screen name="LiveLocation" component={LiveLocation} />
      <Drawer.Screen name="Document" component={Document} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Employee" component={Employee} />
      <Drawer.Screen name="EmployeeMenu" component={EmployeeMenu} />
      <Drawer.Screen name="AddEmployee" component={AddEmployee} />
      
      
      
      
      
      
      
      
      
      
     
     
      
      <Drawer.Screen name="DailyReport" component={DailyRepoart} />
      <Drawer.Screen name="Report" component={Report} />
      <Drawer.Screen name="ReportFilter" component={ReportFilter} />
      <Drawer.Screen name="GeneratePayslip" component={GeneratePayslip} />
      <Drawer.Screen name="LogoutButton" component={LogoutButton} />
      <Drawer.Screen name="CurrentEmployee" component={CurrentEmployee} />
      <Drawer.Screen name="LeaveList" component={LeaveList} />
      <Drawer.Screen name="List Reimbursement" component={ListReimbursement} />
      <Drawer.Screen name="AttendanceFilter" component={AttendanceFilter} />
      <Drawer.Screen name="AttendanceRegularization" component={AttendanceRegularization} />
      <Drawer.Screen name="OdList" component={OdList} />
      <Drawer.Screen name="TaskList" component={TaskList} />
      <Drawer.Screen name="TaskListFilter" component={TaskListFilter} />
      <Drawer.Screen name="EmpDashboard" component={EmpDashboard} />
      <Drawer.Screen name="MarkAttendance" component={MarkAttendance} />
      <Drawer.Screen name="RequestLeave" component={RequestLeave} />
      <Drawer.Screen name="ViewAttendance" component={EmpViewAttendance} />
      <Drawer.Screen name="My Document" component={EmpDocument} />
      <Drawer.Screen name="HolidayList" component={EmpHolidayList} />
      <Drawer.Screen name="Task" component={EmpTask} />
      <Drawer.Screen name="AddTask" component={AddTask} />
     
      

    </Drawer.Navigator>
  );
};

function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert('Permission to access camera was denied');
        return;
      }

      let { status: backgroundLocationStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundLocationStatus !== 'granted') {
        Alert.alert('Permission to access background location was denied');
        return;
      }
    };
    requestPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#880808' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="MainDrawer"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditEmployee"
          component={EditEmployee}
          options={{ title: 'Edit Employee' }}
        />
        <Stack.Screen
          name="CompanyDetails"
          component={CompanyDetails}
          options={{ title: 'Company Details' }}
        />
        <Stack.Screen
          name="Branches"
          component={Branches}
          options={{ title: 'Branches' }}
        />
        <Stack.Screen
          name="AddBranch"
          component={AddBranch}
          options={{ title: 'Add Branch' }}
        />
      <Stack.Screen
          name="AssignTask"
          component={AssignTask}
          options={{ title: 'AssignTask' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: 'ForgotPassword' }}
        />
        <Stack.Screen
          name="KycUpdate"
          component={KycUpdate}
          options={{ title: 'kycUpdate' }}
        />

         <Stack.Screen
          name="paySalary"
          component={PaySalary}
          options={{ title: 'paySalary' }}
        />

        <Stack.Screen
          name="EmployeeEditProfile"
          component={EmployeeEditProfile}
          options={{ title: 'EmployeeEditProfile' }}
        /> 
        <Stack.Screen
          name="AdminEditProfile"
          component={AdminEditProfile}
          options={{ title: 'AdminEditProfile' }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginRight: 10,
  },
  icon: {
    marginLeft: 20,
  },
  drawerHeader: {
    backgroundColor: '#880808',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 60,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  drawerItem: {
    marginLeft: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  drawerContent: {
    flex: 1,
    marginTop: 30,
    marginLeft: 10,
  },
});

export default App;
