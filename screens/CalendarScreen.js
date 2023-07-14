import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

function CalendarScreen() {
  const getMarked = (schedules) => {
    let marked = {};
    schedules.forEach((schedule) => {
      const { startingDay, duration, color } = schedule; // Destructure the text from the schedule
      for (let i = 0; i < duration; i++) {
        let day = new Date(startingDay);
        day.setDate(day.getDate() + i);
        let formattedDay = day.toISOString().split('T')[0];
        let periods = [
          {
            startingDay: i === 0,
            endingDay: i === duration - 1,
            color, // Use the color provided in the schedule
          },
        ];
        if (marked[formattedDay]) {
          marked[formattedDay].periods.push(...periods);
        } else {
          marked[formattedDay] = { periods };
        }
      }
    });
    return marked;
  };

  return (
    <View style={styles.root}>
      <Calendar
        markingType="multi-period"
        markedDates={getMarked([
          { startingDay: '2023-05-05', duration: 62, color: 'red'},
          { startingDay: '2023-06-20', duration: 10, color: 'blue'},
          // Add more schedules here
        ])}
      />
    </View>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 150,
  },
});
