import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

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

  const chartConfig = {
    backgroundGradientFrom: '#fffbf5',
    backgroundGradientTo: '#f9f9f9',
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Employee Dashboard</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Attendance Report</Text>
        <BarChart
          data={{
            labels: ['Ram', 'Saroj', 'Mohit', 'Deepak', 'Raushan', 'Raja', 'Dhirendra'],
            datasets: [
              {
                data: data.map(item => item.Jan_24),
              },
            ],
          }}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Salary Report</Text>
        <LineChart
          data={{
            labels: ['Ram', 'Saroj', 'Mohit', 'Deepak', 'Raushan', 'Raja', 'Dhirendra'],
            datasets: [
              {
                data: data.map(item => item.Feb_24),
              },
            ],
          }}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Task Report</Text>
        <ProgressChart
          data={{
            labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
            data: [0.4, 0.6, 0.8, 1],
          }}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
        />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Month Attendance</Text>
          <Text style={styles.cardText}>Present: {m}</Text>
          <Text style={styles.cardText}>Absent: {f}</Text>
          <Text style={styles.cardText}>Late: {t}</Text>
          <Text style={styles.cardText}>Half Day: {t}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Last Month Salary</Text>
          <Text style={styles.cardText}>Full Salary: {m}</Text>
          <Text style={styles.cardText}>Paid Salary: {f}</Text>
          <Text style={styles.cardText}>Deducted Salary: {t}</Text>
          <Text style={styles.cardText}>Advance Salary: {t}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Month Tasks</Text>
          <Text style={styles.cardText}>Overdue Task: {m}</Text>
          <Text style={styles.cardText}>Today's Task: {f}</Text>
          <Text style={styles.cardText}>This week's Due: {t}</Text>
          <Text style={styles.cardText}>Pending Task: {t}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Month Holiday</Text>
          {employee.map((e, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cardText}>Sr. No.: {e.id}</Text>
              <Text style={styles.cardText}>Name of Holiday: {e.reason}</Text>
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
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2196F3',
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: '#2196F3',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2196F3',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default EmpDashboard;
