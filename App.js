import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Camera from 'expo-camera';
import { Text } from 'react-native-paper';

// Import your components here
import Start from './Components/Start';
import Welcome from './Components/Welcome';
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




const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('CompanyDetails')}>
        <MaterialIcons name="add" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LiveLocation')}>
        <MaterialIcons name="location-on" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <MaterialIcons name="notifications" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('./assets/Images/Acetech-logo.png')}
          style={{ width: 70, height: 70, borderRadius: 60, marginBottom: 10 }}
        />
        <Text style={styles.username}>STAFF WORLD</Text>
      </View>
      <View style={styles.drawerContent}>
        {props.state.routes.map((route, index) => {
          const { name } = route;
          const isFocused = props.state.index === index;

          return (
            <DrawerItem
              key={name}
              label={name}
              onPress={() => props.navigation.navigate(name)}
              icon={() => <MaterialIcons name={getIcon(name)} size={24} color={isFocused ? '#ff4c4c' : '#808080'} />}
              labelStyle={{ color: isFocused ? '#ff4c4c' : '#808080', marginLeft: -16 }}
              style={{ marginBottom: 8 }}
            />
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};

const getIcon = (name) => {
  switch (name) {
    case 'Start':
      return 'home';
    case 'Welcome':
      return 'info';
    case 'AdminRegistration':
      return 'person-add';
    case 'AdminLogin':
      return 'login';
    case 'Home':
      return 'home';
    case 'AddCategory':
      return 'category';
    case 'Category':
      return 'list';
    case 'EmployeeLogin':
      return 'login';
    case 'EmployeeDetail':
      return 'person';
    case 'Support':
      return 'support';
    case 'Dashboard':
      return 'dashboard';
    case 'Profile':
      return 'account-circle';
    case 'Attendance':
      return 'event';
    case 'Notification':
      return 'notifications';
    case 'CalculateSalary':
      return 'attach-money';
    case 'AddPayment':
      return 'payment';
    case 'PayEmployees':
      return 'payments';
    case 'LiveLocation':
      return 'location-on';
    case 'Document':
      return 'description';
    case 'Settings':
      return 'settings';
    case 'Employee':
      return 'people';
    case 'EmployeeMenu':
      return 'menu';
    case 'AddEmployee':
      return 'person-add';
    case 'MarkAttendance':
      return 'check-circle';
    case 'MyAttendance':
      return 'schedule';
    case 'OutDoorDuty':
      return 'hiking';
    case 'Reimburse':
      return 'receipt';
    case 'Apply':
      return 'assignment';
    case 'Holiday':
      return 'beach-access';
    case 'WeekOff':
      return 'weekend';
    case 'Payslip':
      return 'receipt';
    case 'TaskManagement':
      return 'task';
    case 'RequestForMe':
      return 'request-page';
    case 'MyTeam':
      return 'group';
    case 'Loan':
      return 'account-balance';
    case 'Advance':
      return 'money';
    case 'Recruitment':
      return 'work';
    case 'MyTaxation':
      return 'taxi-alert';
    case 'DailyReport':
      return 'bar-chart';
    case 'Report':
      return 'report';
    case 'ReportFilter':
      return 'filter-list';
    case 'GeneratePayslip':
      return 'receipt';
    default:
      return 'info';
  }
};

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Start"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#ff4c4c' },
        headerTintColor: 'white',
        headerRight: () => <CustomHeader navigation={navigation} />,
      })}
    >
      {/* Add your Drawer.Screen components here */}
      <Drawer.Screen name="Start" component={Start} />
      <Drawer.Screen name="Welcome" component={Welcome} />
      <Drawer.Screen name="AdminRegistration" component={AdminRegistration} />
      <Drawer.Screen name="AdminLogin" component={Login} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="AddCategory" component={AddCategory} />
      <Drawer.Screen name="Category" component={Category} />
      <Drawer.Screen name="EmployeeLogin" component={EmployeeLogin} />
    
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="CalculateSalary" component={CalculateSalary} />
      <Drawer.Screen name="AddPayment" component={AddPayment} />
      <Drawer.Screen name="PayEmployees" component={PayEmployees} />
      <Drawer.Screen name="kycVerification" component={KycVerification} />
      <Drawer.Screen name="kycUpdate" component={KycUpdate} />
      <Drawer.Screen name="paySalary" component={PaySalary} />
      
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
          headerStyle: { backgroundColor: '#ff4c4c' },
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
    backgroundColor: '#ff4c4c',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
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
