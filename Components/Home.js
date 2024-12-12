import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <Text style={styles.timeText}>Current Time: {time}</Text>
      </View>

      {/* Dashboard Items */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CurrentEmployee')}
        >
          <LinearGradient
            colors={['#6A11CB', '#2575FC']}
            style={styles.cardBackground}
          >
            <FontAwesome name="users" size={50} color="#fff" />
            <Text style={styles.cardText}>Current Employees</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('DailyReport')}
        >
          <LinearGradient
            colors={['#11998e', '#38ef7d']}
            style={styles.cardBackground}
          >
            <Ionicons name="checkmark-circle-outline" size={50} color="#fff" />
            <Text style={styles.cardText}>Daily Report</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('LeaveList')}
        >
          <LinearGradient
            colors={['#FF512F', '#DD2476']}
            style={styles.cardBackground}
          >
            <Ionicons name="calendar" size={50} color="#fff" />
            <Text style={styles.cardText}>Leaves</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('GeneratePayslip')}
        >
          <LinearGradient
            colors={['#F7971E', '#FFD200']}
            style={styles.cardBackground}
          >
            <FontAwesome name="money" size={50} color="#fff" />
            <Text style={styles.cardText}>Payments</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('List Reimbursement')}
        >
          <LinearGradient
            colors={['#4568DC', '#B06AB3']}
            style={styles.cardBackground}
          >
            <FontAwesome name="file-text" size={50} color="#fff" />
            <Text style={styles.cardText}>Reimbursement</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('AttendanceRegularization')}
        >
          <LinearGradient
            colors={['#1D4350', '#A43931']}
            style={styles.cardBackground}
          >
            <Ionicons name="time-outline" size={50} color="#fff" />
            <Text style={styles.cardText}>Attendance Regularization</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('OdList')}
        >
          <LinearGradient
            colors={['#24C6DC', '#514A9D']}
            style={styles.cardBackground}
          >
            <FontAwesome name="briefcase" size={50} color="#fff" />
            <Text style={styles.cardText}>On-Duty</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TaskList')}
        >
          <LinearGradient
            colors={['#00C9FF', '#92FE9D']}
            style={styles.cardBackground}
          >
            <Ionicons name="list-outline" size={50} color="#fff" />
            <Text style={styles.cardText}>Tasks</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#333333', // Light black background color
    paddingBottom: 10,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timeText: {
    marginTop: 5,
    fontSize: 16,
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  card: {
    width: '46%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Home;
