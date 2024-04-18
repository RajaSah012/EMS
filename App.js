import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

import Start from './Components/Start';
import Welcome from './Components/Welcome';
import Registration from './Components/Registration';
import Login from './Components/Login';
import AddCategory from './Components/AddCategory';
import Category from './Components/Category';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import Support from './Components/Support';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import EmployeeMenu from './Components/EmployeeMenu';
import Profile from './Components/Profile';
import Attendance from './Components/Attendance';
import Notification from './Components/Notification';
import CalculateSalary from './Components/CalculateSalary';
import AddPayment from './Components/AddPayment';
import PayEmployees from './Components/PayEmployees';
import LiveLocation from './Components/LiveLocation';
import Document from './Components/Document';
import Settings from './Components/Settings';
import Employee from './Components/Employee';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import MarkAttendance from './Components/MarkAttendance';
import MyAttendance from './Components/MyAttendance';
import OutDoorDuty from './Components/OutDoorDuty';
import Reimburse from './Components/Reimburse';
import Apply from './Components/Apply';
import Holiday from './Components/Holiday';
import WeekOff from './Components/WeekOff';
import Payslip from './Components/Payslip';
import TaskManagement from './Components/TaskManagement';
import RequestForMe from './Components/RequestForMe';
import MyTeam from './Components/MyTeam';
import Loan from './Components/Loan';
import Advance from './Components/Advance';
import Recruitment from './Components/Recruitment';
import MyTaxation from './Components/MyTaxation';
import DailyReport from './Components/DailyReport';
import Report from './Components/Report';
import ReportFilter from './Components/ReportFilter';
const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('LiveLocation')}>
        <MaterialIcons name="location-on" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <MaterialIcons name="notifications" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Welcome"
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: 'skyblue' },
          headerTintColor: 'white',
          headerRight: () => <CustomHeader navigation={navigation} />,
        })}>
        <Drawer.Screen name="Start" component={Start} />
        <Drawer.Screen name="Welcome" component={Welcome} />
        <Drawer.Screen name="Registration" component={Registration} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="AddCategory" component={AddCategory} />
        <Drawer.Screen name="Category" component={Category} />
        <Drawer.Screen name="EmployeeLogin" component={EmployeeLogin} />
        <Drawer.Screen name="EmployeeDetail" component={EmployeeDetail} />
        <Drawer.Screen name="EmployeeMenu" component={EmployeeMenu} />
        <Drawer.Screen name="Support" component={Support} />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Attendance" component={Attendance} />
        <Drawer.Screen name="Notification" component={Notification} />
        <Drawer.Screen name="CalculateSalary" component={CalculateSalary} />
        <Drawer.Screen name="AddPayment" component={AddPayment} />
        <Drawer.Screen name="PayEmployees" component={PayEmployees} />
        <Drawer.Screen name="LiveLocation" component={LiveLocation} />
        <Drawer.Screen name="Document" component={Document} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Employee" component={Employee} />
        <Drawer.Screen name="AddEmployee" component={AddEmployee} />
        <Drawer.Screen name="EditEmployee" component={EditEmployee} />
        <Drawer.Screen name="MarkAttendance" component={MarkAttendance} />
        <Drawer.Screen name="MyAttendance" component={MyAttendance} />
        <Drawer.Screen name="OutDoorDuty" component={OutDoorDuty} />
        <Drawer.Screen name="Reimburse" component={Reimburse} />
        <Drawer.Screen name="Apply" component={Apply} />
        <Drawer.Screen name="Holiday" component={Holiday} />
        <Drawer.Screen name="WeekOff" component={WeekOff} />
        <Drawer.Screen name="Payslip" component={Payslip} />
        <Drawer.Screen name="TaskManagement" component={TaskManagement}/>
        <Drawer.Screen name="RequestForMe" component={RequestForMe}/>
        <Drawer.Screen name="MyTeam" component={MyTeam}/>
        <Drawer.Screen name="Loan" component={Loan}/>
        <Drawer.Screen name="Advance" component={Advance}/>
        <Drawer.Screen name="Recruitment" component={Recruitment}/>
        <Drawer.Screen name="MyTaxation" component={MyTaxation}/>
        <Drawer.Screen name="DailyReport" component={DailyReport}/>
        <Drawer.Screen name="Report" component={Report}/>
        <Drawer.Screen name=" ReportFilter" component={ ReportFilter}/>

      </Drawer.Navigator>
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
});

export default App;