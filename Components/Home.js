import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [m, setM] = useState(0)
  const [f, setF] = useState(0)
  const [t, setT] = useState(0)
  const [o, setO] = useState(0)
  const [c, setC] = useState(0)
  const [ti, setTi] = useState(0)
  const [to, setTo] = useState(0)
  const [e, setE] = useState(0)
  const [n, setN] = useState(0)
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [time, setTime] = useState('');

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
    GenderM();
    GenderF();
    GenderT();
    OpeningEmployees();
    TransferredInEmployees();
    TransferredOutEmployees();
    NewJoinedEmployee();
    ExitedEmployees();
    ClosedEmployees();
  }, []);

  const AdminRecords = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/auth/getUsers/",
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
      .then(result => {
        if (result.data>=0) {
          setAdmins(result.data)
        } else {
          alert(result.data.Error)
        }
      })
  }
  const OpeningEmployees = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/countc", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data>=0) {
          setO(result.data)
        } else {
          alert("o")
        }
      })
  }
  const TransferredInEmployees = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/countti", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data>=0) {
          setTi(result.data)
        } else {
          alert("ti")
        }
      })
  }
  const TransferredOutEmployees = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/countto", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data>=0) {
          setTo(result.data)
        } else {
          alert("to")
        }
      })
  }
  const NewJoinedEmployee = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/countn", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data>=0) {
          setN(result.data)
        } else {
          alert("n")
        }
      })
  }
  const ExitedEmployees = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/countexit", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data>=0) {
          setE(result.data)
        } else {
          alert("exit")
        }
      })
  }
  const ClosedEmployees = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/countex", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data>=0) {
          setC(result.data)
        } else {
          alert("close")
        }
      })
  }

  const GenderM = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/countm", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data>=0) {
          setM(result.data)
        } else {
          alert("m")
        }
      })
  }
  const GenderF = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/countf", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data>=0) {
          setF(result.data)
        } else {
          alert("f")
        }
      })
  }
  const GenderT = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/countt", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => {
        if (result.data>=0) {
          setT(result.data)
        } else {
          alert("t")
        }
      })
  }

  const adminCount = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/auth/count",
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
      .then(result => {
        if (result.data>=0) {
          setAdminTotal(result.data)
        }
      })
  }

  const employeeCount = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/count",
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
      .then(result => {
        if (result.data>=0) {
          setEmployeeTotal(result.data)
        }
      })
  }

  const salaryCount = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get("https://mohitbyproject-production.up.railway.app/api/employee/total",
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
      .then(result => {
        if (result.data>=0) {
          setSalaryTotal(result.data)
        } else {
          alert(result.data.Error)
        }
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      axios
        .get("https://mohitbyproject-production.up.railway.app/api/employee/",
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
        .then((result) => {
          if (result.data>=0) {
            setEmployee(result.data);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log("Fetched Token:", token); // Logging the token

      axios.get('https://mohitbyproject-production.up.railway.app/api/category/', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((result) => {
          if (result.data>=0) {
            setCategory(result.data);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  const updateTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setTime(currentTime);
  }
  setInterval(updateTime, 1000);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.col, styles.bgTeal]}
          onPress={() => navigation.navigate('CurrentEmployee')}>
          <View style={styles.dash1}>
            <View style={styles.dash2}>
              <View style={styles.iconHome}>
                <Text style={styles.iconHomeText}>PE</Text>
              </View>
              <Text style={styles.dashFont}>Current Employees</Text>
            </View>
            <View style={styles.dashFont1}>
              <Text style={styles.dashFont1Text}>{employeeTotal}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Male: {m}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Female: {f}</Text>
            </View>
            <View style={styles.borderBottom}>
              <Text style={styles.dashFont}>Trans: {t}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.col, styles.bgTeal]}
          onPress={() => navigation.navigate('DailyReport')}>
          <View style={styles.dash1}>
            <View style={styles.dash3}>
              <View style={styles.iconPre}>
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
          style={[styles.col, styles.bgTeal]}
          onPress={() => navigation.navigate('LeaveList')}>
          <View style={styles.dash1}>
            <View style={styles.dash2}>
              <View style={styles.iconLeav}>
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
          style={[styles.col, styles.bgTeal]}
          onPress={() => navigation.navigate('GeneratePayslip')}>
          <View style={styles.dash1}>
            <View style={styles.dash3}>
              <View style={styles.iconPay}>
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
          style={[styles.col, styles.bgTeal]}
          onPress={() => navigation.navigate('List Reimbursement')}>
          <View style={styles.dash1}>
            <View style={styles.dash2}>
              <View style={styles.iconRei}>
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
          style={[styles.col, styles.bgTeal]}
          onPress={() => navigation.navigate('AttendanceRegularization')}>
          <View style={styles.dash1}>
            <View style={styles.dash3}>
              <View style={styles.iconHome}>
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
          style={[styles.col, styles.bgTeal]}
          onPress={() => navigation.navigate('OdList')}>
          <View style={styles.dash1}>
            <View style={styles.dash2}>
              <View style={styles.iconOd}>
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
          onPress={() => navigation.navigate('TaskList')}>
          <View style={styles.dash1}>
            <View style={styles.dash3}>
              <View style={styles.iconTask}>
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
            <View style={[styles.dash4, styles.bgTeal]}>
              <View style={styles.dash6}>
                <Text style={styles.dashFont}>Monthly Manpower Status</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Opening Employees: {o}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Transferred In Employees: {ti}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>New Joined Employees: {n}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Transferred Out Employees: {to}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Exited Employees: {e}</Text>
              </View>
              <View style={styles.borderBottom}>
                <Text style={styles.dashFont}>Closing Employees: {c}</Text>
              </View>
            </View>
          </View>
          <View style={styles.colSm7}>
            <View style={[styles.dash5, styles.bgTeal]}>
              <View style={styles.dash6}>
                <Text style={styles.dashFont}>Leave Request</Text>
              </View>
              <View style={styles.tableSizeArgs}>
                <ScrollView horizontal={true}>
                  <View>
                    <View style={styles.tableHeader}>
                      <View style={styles.tableHeaderContent}>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}>Code</Text>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}>Full Name</Text>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}>Reason</Text>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}>Applied From</Text>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}>Applied To</Text>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}>Status</Text>
                      </View>
                    </View>
                    <ScrollView style={styles.tableBody}>
                      {employee.map((employee) => (
                        <View key={employee.employeeId} style={styles.tableRow}>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.employeeId}</Text>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.name}</Text>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.fname}</Text>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.email}</Text>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.dob}</Text>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.status}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </ScrollView>
              </View>
              
            </View>
          </View>
        </View>
      </View>
      <View style={styles.dashContan}>
  <View style={styles.row}>
    <View style={[styles.colSm4, styles.bgTeal]}>
      <View style={styles.dash7}>
        <View style={styles.dash6}>
          <Text style={styles.dashFont}>Task List</Text>
        </View>
        <View style={styles.tableSizeArgs1}>
        <ScrollView horizontal={true}>
                  <View>
                    <View style={styles.tableHeader}>
                      <View style={styles.tableHeaderContent}>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}>Code</Text>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}> Name</Text>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}>Assigned By</Text>
                        <Text style={[styles.tableHeaderText, { width: 100 }]}> Status</Text>
                      </View>
                    </View>
                    <ScrollView style={styles.tableBody}>
                      {employee.map((employee) => (
                        <View key={employee.employeeId} style={styles.tableRow}>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.employeeId}</Text>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.name}</Text>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.fname}</Text>
                          <Text style={[styles.tableRowText, { width: 100 }]}>{employee.status}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </ScrollView>
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
    backgroundColor: '#e0f7fa',
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
  bgTeal: {
    backgroundColor: "#1799",
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dashFont: {
    fontSize: 14,
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
  tableHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  tableBody: {
    maxHeight: 200,
    overflow: 'scroll',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableRowText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
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