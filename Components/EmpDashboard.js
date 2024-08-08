import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BarChart,
  LineChart,
  AreaChart,
  Grid,
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const EmpDashboard = () => {
  const [data, setData] = useState([
    { name: 'Ram', Jan_24: 1000, Feb_24: 2400, Mar_24: 2000, amt: 2400 },
    { name: 'Saroj', Jan_24: 3000, Feb_24: 1398, Mar_24: 2100, amt: 2210 },
    { name: 'Mohit', Jan_24: 2000, Feb_24: 9800, Mar_24: 1900, amt: 2290 },
    { name: 'Deepak', Jan_24: 2780, Feb_24: 3908, Mar_24: 7000, amt: 2000 },
    { name: 'Raushan', Jan_24: 1890, Feb_24: 4800, Mar_24: 2200, amt: 2181 },
    { name: 'Raja', Jan_24: 2390, Feb_24: 3800, Mar_24: 2300, amt: 2500 },
    { name: 'Dhirendra', Jan_24: 1490, Feb_24: 4300, Mar_24: 9800, amt: 2100 },
  ]);
  const [m, setM] = useState(0);
  const [f, setF] = useState(0);
  const [t, setT] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('your-token');
      axios
        .get("https://emsproject-production.up.railway.app/api/employee/", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
        .then((result) => {
          if (result.data) {
            setEmployee(result.data);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  useEffect(() => {
    employeeCount();
    GenderM();
    GenderF();
    GenderT();
  }, []);

  const employeeCount = async () => {
    const token = await AsyncStorage.getItem('your-token');
    axios
      .get("https://emsproject-production.up.railway.app/api/employee/count", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data) {
          setEmployeeTotal(result.data);
        }
      });
  };

  const GenderM = async () => {
    const token = await AsyncStorage.getItem('your-token');
    axios
      .get("https://emsproject-production.up.railway.app/api/employee/countm", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data) {
          setM(result.data);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const GenderF = async () => {
    const token = await AsyncStorage.getItem('your-token');
    axios
      .get("https://emsproject-production.up.railway.app/api/employee/countf", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data) {
          setF(result.data);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const GenderT = async () => {
    const token = await AsyncStorage.getItem('your-token');
    axios
      .get("https://emsproject-production.up.railway.app/api/employee/countt", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data) {
          setT(result.data);
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Employee Dashboard</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Attendance Report</Text>
        <BarChart
          style={styles.chart}
          data={data.map(item => item.Jan_24)}
          svg={{ fill: 'blue' }}
          contentInset={{ top: 10, bottom: 10 }}
        >
          <Grid />
        </BarChart>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Salary Report</Text>
        <LineChart
          style={styles.chart}
          data={data.map(item => item.Jan_24)}
          svg={{ stroke: 'purple' }}
          contentInset={{ top: 10, bottom: 10 }}
          curve={shape.curveNatural}
        >
          <Grid />
        </LineChart>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Task Report</Text>
        <AreaChart
          style={styles.chart}
          data={data.map(item => item.Jan_24)}
          svg={{ fill: 'green', stroke: 'green' }}
          contentInset={{ top: 10, bottom: 10 }}
          curve={shape.curveNatural}
        >
          <Grid />
        </AreaChart>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Month Attendance</Text>
          <Text>Present: {m}</Text>
          <Text>Absent: {f}</Text>
          <Text>Late: {t}</Text>
          <Text>Half Day: {t}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Last Month Salary</Text>
          <Text>Full Salary: {m}</Text>
          <Text>Paid Salary: {f}</Text>
          <Text>Deducted Salary: {t}</Text>
          <Text>Advance Salary: {t}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Month Tasks</Text>
          <Text>Overdue Task: {m}</Text>
          <Text>Today's Task: {f}</Text>
          <Text>This week's Due: {t}</Text>
          <Text>Pending Task: {t}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Month Holiday</Text>
          {employee.map((e, index) => (
            <View key={index} style={styles.row}>
              <Text>Sr. No.: {e.id}</Text>
              <Text>Name of Holiday: {e.reason}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    height: 200,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default EmpDashboard;
