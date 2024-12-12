import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { myAxios } from '../services/helper';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';

const EmpViewAttendance = ({ employeeId }) => {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await myAxios.get(`/attendance/employee/${employeeId}`);
        const data = response.data;

        const newMarkedDates = {};

        data.forEach(record => {
          const date = format(new Date(record.date), 'yyyy-MM-dd');
          let color;

          if (record.status === 'absent') {
            color = 'red';
          } else if (record.status === 'present') {
            color = 'green';
          } else if (record.status === 'holiday') {
            color = 'black';
          } else if (record.status === 'half-time') {
            color = 'yellow';
          }

          newMarkedDates[date] = {
            customStyles: {
              container: {
                backgroundColor: color,
              },
            },
          };
        });

        setMarkedDates(newMarkedDates);
      } catch (error) {
        console.error('Error fetching attendance data', error);
      }
    };

    if (employeeId) {
      fetchAttendance();
    }
  }, [employeeId]);

  return (
    <LinearGradient
      colors={['#FFDEE9', '#B5FFFC']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Calendar
          markedDates={markedDates}
          markingType={'custom'}
          theme={{
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
          }}
        />
      </View>
    </LinearGradient>
  );
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
});

export default EmpViewAttendance;
