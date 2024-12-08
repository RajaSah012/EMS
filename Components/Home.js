import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString();
      setTime(currentTime);
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#232526', '#414345']}
        style={styles.header}
        start={[0, 0]}
        end={[1, 1]}
      >
        <Text style={styles.headerText}>Dashboard</Text>
        <Text style={styles.timeText}>Current Time: {time}</Text>
      </LinearGradient>

      {/* Dashboard Items */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CurrentEmployee')}
        >
          <FontAwesome name="users" size={50} color="#FFA07A" />
          <Text style={styles.cardText}>Current Employees</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('DailyReport')}
        >
          <Ionicons name="checkmark-circle-outline" size={50} color="#7FFFD4" />
          <Text style={styles.cardText}>Daily Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('LeaveList')}
        >
          <Ionicons name="calendar" size={50} color="#FF6347" />
          <Text style={styles.cardText}>Leaves</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('GeneratePayslip')}
        >
          <FontAwesome name="money" size={50} color="#FFD700" />
          <Text style={styles.cardText}>Payments</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('List Reimbursement')}
        >
          <FontAwesome name="file-text" size={50} color="#4682B4" />
          <Text style={styles.cardText}>Reimbursements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('AttendanceRegularization')}
        >
          <Ionicons name="time-outline" size={50} color="#8A2BE2" />
          <Text style={styles.cardText}>Attendance Regularization</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('OdList')}
        >
          <FontAwesome name="briefcase" size={50} color="#FF6347" />
          <Text style={styles.cardText}>On-Duty</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TaskList')}
        >
          <Ionicons name="list-outline" size={50} color="#32CD32" />
          <Text style={styles.cardText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1c1c1c',
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700', // Golden Yellow for header text
  },
  timeText: {
    marginTop: 5,
    fontSize: 16,
    color: '#87CEEB', // Sky Blue for the time
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#333333',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFDAB9', // Peach Puff for card text
    textAlign: 'center',
  },
});

export default Home;
