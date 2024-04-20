import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setemployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [calDate, setCalDate] = useState(new Date());

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
  }
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp)
        } else {
          alert(result.data.Error)
        }
      })
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [date, setDate] = useState(new Date())
  const handleDate = (dt) => {
    setDate(dt)
  }

  let time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  }
  setInterval(updateTime, 1000);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.col, styles.bgPurple]}
          onPress={() => console.log('Current Employees')}>
          <View style={styles.dash1}>
            <View style={styles.dash2}>
              <View style={[styles.iconHome, styles.bgPurpleLight]}>
                <Text style={styles.iconHomeText}>PE</Text>
              </View>
              <Text style={styles.dashFont}>Current Employees</Text>
            </View>
            <View style={styles.dashFont1}>
              <Text style={styles.dashFont1Text}>{employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Male: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Female: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Trans: {employeeTotal}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.col, styles.bgBlue]}
          onPress={() => console.log('Present')}>
          <View style={styles.dash1}>
            <View style={styles.dash3}>
              <View style={[styles.iconPre, styles.bgBlueLight]}>
                <Text style={styles.iconPreText}>PR</Text>
              </View>
              <Text style={styles.dashFont}>Present</Text>
            </View>
            <View style={styles.dashFont1}>
              <Text style={styles.dashFont1Text}>{employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>OD: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Leave: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Absent: {employeeTotal}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.col, styles.bgGreen]}
          onPress={() => console.log('Leaves')}>
          <View style={styles.dash1}>
            <View style={styles.dash2}>
              <View style={[styles.iconLeav, styles.bgGreenLight]}>
                <Text style={styles.iconLeavText}>LV</Text>
              </View>
              <Text style={styles.dashFont}>Leaves</Text>
            </View>
            <View style={styles.dashFont1}>
              <Text style={styles.dashFont1Text}>{employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Approved: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Pending: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Rejected: {employeeTotal}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.col, styles.bgOrange]}
          onPress={() => console.log('Payments')}>
          <View style={styles.dash1}>
            <View style={styles.dash3}>
              <View style={[styles.iconPay, styles.bgOrangeLight]}>
                <Text style={styles.iconPayText}>PY</Text>
              </View>
              <Text style={styles.dashFont}>Payments</Text>
            </View>
            <View style={styles.dashFont1}>
              <Text style={styles.dashFont1Text}>INR {salaryTotal} Crore</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Salaries: INR {salaryTotal} Crore</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Expenses: INR {salaryTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>In Hand: INR {salaryTotal}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.col, styles.bgPink]}
          onPress={() => console.log('Reimbursements')}>
          <View style={styles.dash1}>
            <View style={styles.dash2}>
              <View style={[styles.iconRei, styles.bgPinkLight]}>
                <Text style={styles.iconReiText}>RE</Text>
              </View>
              <Text style={styles.dashFont}>Reimbursements</Text>
            </View>
            <View style={styles.dashFont1}>
              <Text style={styles.dashFont1Text}>INR {employeeTotal} K</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Approved: INR {employeeTotal} Lac</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Pending: INR {employeeTotal} K</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>In Salary: INR {employeeTotal} K</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.col, styles.bgYellow]}
          onPress={() => console.log('AR')}>
          <View style={styles.dash1}>
            <View style={styles.dash3}>
              <View style={[styles.iconHome, styles.bgYellowLight]}>
                <Text style={styles.iconHomeText}>AR</Text>
              </View>
              <Text style={styles.dashFont}>AR</Text>
            </View>
            <View style={styles.dashFont1}>
              <Text style={styles.dashFont1Text}>{employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Approved: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Pending: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Rejected: {employeeTotal}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.col, styles.bgRed]}
          onPress={() => console.log('OD')}>
          <View style={styles.dash1}>
            <View style={styles.dash2}>
              <View style={[styles.iconOd, styles.bgRedLight]}>
                <Text style={styles.iconOdText}>OD</Text>
              </View>
              <Text style={styles.dashFont}>OD</Text>
            </View>
            <View style={styles.dashFont1}>
              <Text style={styles.dashFont1Text}>{employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Approved: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Pending: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Rejected: {employeeTotal}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.col, styles.bgTeal]}
          onPress={() => console.log('Task')}>
          <View style={styles.dash1}>
            <View style={styles.dash3}>
              <View style={[styles.iconTask, styles.bgTealLight]}>
                <Text style={styles.iconTaskText}>TS</Text>
              </View>
              <Text style={styles.dashFont}>Task</Text>
            </View>
            <View style={styles.dashFont1}>
              <Text style={styles.dashFont1Text}>{employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Overdue: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Today's Due: {employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>This week's Due: {employeeTotal}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.dashContan}>
        <View style={styles.row}>
          <View style={styles.colSm5}>
            <View style={styles.dash4}>
              <View style={styles.dash6}>
                <Text style={styles.dashFont}>Monthly Manpower Status ({date.getMonth() + 1} {date.getFullYear()})</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Opening Employees: {employeeTotal}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Transferred In Employees: {employeeTotal}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>New Joined Employees: {employeeTotal}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Transferred Out Employees: {employeeTotal}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Exited Employees: {employeeTotal}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Closing Employees: {employeeTotal}</Text>
              </View>
            </View>
          </View>
          <View style={styles.colSm7}>
            <View style={styles.dash5}>
              <View style={styles.dash6}>
                <Text style={styles.dashFont}>Leave Request</Text>
              </View>
              <View style={styles.tableSizeArgs}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Code</Text>
                  <Text style={styles.tableHeaderText}>Full Name</Text>
                  <Text style={styles.tableHeaderText}>Reason</Text>
                  <Text style={styles.tableHeaderText}>Applied From</Text>
                  <Text style={styles.tableHeaderText}>Applied To</Text>
                  <Text style={styles.tableHeaderText}>Status</Text>
                </View>
                <View style={styles.tableBody}>
                  {employee.map((e) => (
                    <View style={styles.tableRow}>
                      <Text style={styles.tableRowText}>{e.id}</Text>
                      <View style={styles.fullNameContainer}>
                        <View style={styles.imageContainer}>
                          <Image
                            source={{ uri: `http://localhost:3000/Images/` + e.image }}
                            style={styles.homeLeaveImage}
                          />
                        </View>
                        <View style={styles.fullNameTextContainer}>
                          <Text style={styles.fullNameText}>{e.name}</Text>
                          <Text style={styles.designationText}>{e.designation}General Manager</Text>
                        </View>
                      </View>
                      <Text style={styles.tableRowText}>{e.reason}</Text>
                      <Text style={styles.tableRowText}>{e.from_date}</Text>
                      <Text style={styles.tableRowText}>{e.to_date}</Text>
                      <Text style={styles.tableRowText}>{e.status}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.dashFontBorderTop}>
                <TouchableOpacity
                  onPress={() => console.log('View Leave Requests')}>
                  <Text style={styles.navLink}>View Leave Requests</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.dashContan}>
        <View style={styles.row}>
          <View style={styles.colSm4}>
            <View style={styles.dash7}>
              <View style={styles.dash6}>
                <Text style={styles.dashFont}>Calendar</Text>
                <Text style={styles.dashFont1}>{calDate.toDateString()}, {time}</Text>
              </View>
              <View style={styles.calendr}>
                <Calendar
                  style={styles.calendr1}
                  onDayPress={(day) => console.log(day)}
                />
              </View>
            </View>
          </View>
          <View style={styles.colSm8}>
            <View style={styles.dash7}>
              <View style={styles.dash6}>
                <Text style={styles.dashFont}>Task List</Text>
              </View>
              <View style={styles.tableSizeArgs1}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Code</Text>
                  <Text style={styles.tableHeaderText}>Name</Text>
                  <Text style={styles.tableHeaderText}>Assigned By</Text>
                  <Text style={styles.tableHeaderText}>Duration</Text>
                  <Text style={styles.tableHeaderText}>Status</Text>
                </View>
                <View style={styles.tableBody}>
                  {employee.map((e) => (
                    <View style={styles.tableRow}>
                      <Text style={styles.tableRowText}>{e.id}</Text>
                      <View style={styles.fullNameContainer}>
                        <View style={styles.fullNameTextContainer}>
                          <Text style={styles.fullNameText}>{e.name}</Text>
                          <Text style={styles.designationText}>{e.task_name}Task : Testing</Text>
                        </View>
                      </View>
                      <Text style={styles.tableRowText}>{e.assigned_by}</Text>
                      <Text style={styles.tableRowText}>{e.duration}</Text>
                      <Text style={styles.tableRowText}>{e.status}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.dashFontBorderTop}>
                <TouchableOpacity
                  onPress={() => console.log('View Leave Requests')}>
                  <Text style={styles.navLink}>View Leave Requests</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  col: {
    width: '48%',
    marginBottom: 10,
  },
  bgPurple: {
    backgroundColor: '#8e44ad',
  },
  bgPurpleLight: {
    backgroundColor: '#9b59b6',
  },
  bgBlue: {
    backgroundColor: '#3498db',
  },
  bgBlueLight: {
    backgroundColor: '#5dade2',
  },
  bgGreen: {
    backgroundColor: '#27ae60',
  },
  bgGreenLight: {
    backgroundColor: '#2ecc71',
  },
  bgOrange: {
    backgroundColor: '#d35400',
  },
  bgOrangeLight: {
    backgroundColor: '#e67e22',
  },
  bgPink: {
    backgroundColor: '#FFC0CB',
  },
  bgPinkLight: {
    backgroundColor: '#FFB6C1',
  },
  bgYellow: {
    backgroundColor: '#FFFF00',
  },
  bgYellowLight: {
    backgroundColor: '#FFFFE0',
  },
  bgRed: {
    backgroundColor: '#FF0000',
  },
  bgRedLight: {
    backgroundColor: '#FFC0CB',
  },
  bgTeal: {
    backgroundColor: '#008080',
  },
  bgTealLight: {
    backgroundColor: '#20b2aa',
  },


  dash1: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  dash2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconHome: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHomeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dashFont: {
    fontSize: 16,
    color: '#fff',
  },
  dashFont1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dashFont1Text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 5,
  },
  iconPre: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconLeav: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeavText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconPay: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconRei: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconReiText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconOd: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconOdText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconTask: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTaskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  colSm5: {
    width: '48%',
    marginBottom: 10,
  },
  dash4: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  dash6: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dashFont: {
    fontSize: 16,
    color: '#fff',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 5,
  },
  colSm7: {
    width: '48%',
    marginBottom: 10,
  },
  dash5: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  tableSizeArgs: {
    maxHeight: 200,
    overflow: 'scroll',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  tableBody: {},
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableRowText: {
    fontSize: 16,
    color: '#fff',
  },
  fullNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  homeLeaveImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  fullNameTextContainer: {},
  fullNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  designationText: {
    fontSize: 14,
    color: '#fff',
  },
  dashFontBorderTop: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 5,
    alignItems: 'center',
  },
  navLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  dashContan: {
    marginBottom: 10,
  },
  colSm4: {
    width: '48%',
    marginBottom: 10,
  },
  dash7: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  calendr: {
    marginTop: 10,
  },
  calendr1: {
    borderRadius: 5,
  },
  colSm8: {
    width: '48%',
    marginBottom: 10,
  },
  tableSizeArgs1: {
    maxHeight: 200,
    overflow: 'scroll',
  },
});

export default Home;