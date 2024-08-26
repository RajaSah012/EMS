import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';

const EmpholidayList = () => {
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/holidays'); // Replace with your API endpoint
        const fetchedEvents = response.data.reduce((acc, record) => {
          const formattedDate = format(new Date(record.date), 'yyyy-MM-dd');
          acc[formattedDate] = {
            marked: true,
            dotColor: '#FF5733',
            activeOpacity: 0,
            disableTouchEvent: true,
          };
          return acc;
        }, {});
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching holidays', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text style={styles.loaderText}>Loading Holidays...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Holiday Calendar</Text>
        <Calendar
          style={[styles.calendar, { width: screenWidth - 50 }]}
          markedDates={events}
          theme={calendarTheme}
          enableSwipeMonths={true}
        />
      </View>
    </LinearGradient>
  );
};

const calendarTheme = {
  backgroundColor: 'transparent',
  calendarBackground: 'transparent',
  textSectionTitleColor: '#ff6347',
  selectedDayBackgroundColor: '#ff69b4',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#ff6347',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#ff6347',
  selectedDotColor: '#ffffff',
  arrowColor: '#ff6347',
  monthTextColor: '#ff69b4',
  indicatorColor: '#ff69b4',
  textDayFontFamily: 'monospace',
  textMonthFontFamily: 'monospace',
  textDayHeaderFontFamily: 'monospace',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 20,
  textDayHeaderFontSize: 14,
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  calendar: {
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2C3E50',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 20,
    color: '#2C3E50',
  },
});

export default EmpholidayList;
