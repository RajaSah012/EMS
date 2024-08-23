import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Card, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { format } from 'date-fns';

const EmpholidayList = () => {
  const [events, setEvents] = useState([]);
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/holidays');
        const formattedEvents = response.data.map(record => ({
          title: record.name,
          date: format(new Date(record.date), 'yyyy-MM-dd'),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching holidays', error);
      }
    };
    fetchEvents();
  }, []);

  const addHoliday = async () => {
    try {
      const formattedDate = format(new Date(holidayDate), 'yyyy-MM-dd');
      const response = await axios.post('http://localhost:8080/holidays', {
        name: holidayName,
        date: formattedDate,
      });
      setEvents([...events, {
        title: response.data.name,
        date: response.data.date,
      }]);
      setHolidayName('');
      setHolidayDate('');
    } catch (error) {
      console.error('Error adding holiday', error);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={events.reduce((acc, event) => {
          acc[event.date] = { marked: true, dotColor: 'red' };
          return acc;
        }, {})}
        theme={{
          calendarBackground: 'white',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
        }}
      />
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            style={styles.input}
            value={holidayName}
            onChangeText={setHolidayName}
            placeholder="Holiday Name"
          />
          <TextInput
            style={styles.input}
            value={holidayDate}
            onChangeText={setHolidayDate}
            placeholder="Holiday Date"
            keyboardType="numeric"
          />
          <Button title="Add Holiday" onPress={addHoliday} />
        </Card.Content>
      </Card>
      <FlatList
        data={events}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph>{item.title}</Paragraph>
              <Paragraph>{item.date}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  card: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
});

export default EmpholidayList;
