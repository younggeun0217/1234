import React from 'react';
import { View, StyleSheet, Text  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons'; // 화살표 이미지


function CalendarScreen() {
  const getMarked = (schedules, highlightedDate) => {
    let marked = { ...highlightedDate };

    schedules.forEach((schedule) => {
      const { startingDay, duration, color } = schedule;
      for (let i = 0; i < duration; i++) {
        let day = new Date(startingDay);
        day.setDate(day.getDate() + i);
        let formattedDay = day.toISOString().split('T')[0];
        let periods = [
          {
            startingDay: i === 0,
            endingDay: i === duration - 1,
            color,
          },
        ];
        if (marked[formattedDay]) {
          if (marked[formattedDay].periods) {
            marked[formattedDay].periods.push(...periods);
          } else {
            marked[formattedDay].periods = periods;
          }
        } else {
          marked[formattedDay] = { periods };
        }
      }
    });

    return marked;
  };

  // 강조 07월 04일
  // 여기에 하드코딩 된 객체 교체
  const highlightedDate = { 
    '2023-07-04': { selected: true, selectedColor: 'yellow' },
  };

  // 여기에 하드코딩 된 객체 교체
  const markedDates = getMarked(
    [
      { startingDay: '2023-05-05', duration: 62, color: 'rgba(255, 0, 0, 0.5)' },
      { startingDay: '2023-06-20', duration: 10, color: 'rgba(0, 0, 255, 0.5)' },
      { startingDay: '2023-07-25', duration: 20, color: '#A0C896'}
    ],
    highlightedDate
  );

  return (
      <View style={styles.root}>
      <View>
        <Text style={styles.paramText}>전시회 일정</Text>
        <View style={[styles.paramBox, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}, {borderBottomWidth: 0}]}>
          <Text style={styles.paramTexts}>Param</Text>
        </View>
        <View style={[styles.paramBox, {backgroundColor: 'rgba(0, 0, 255, 0.5)'}]}>
        <Text style={styles.paramTexts}>피카소와 20세기 거장들</Text>
        </View>
        <View style={[styles.paramBox, {backgroundColor: '#A0C896'}, {borderTopWidth: 0}]}>
        <Text style={styles.paramTexts}>알렉스 도지 : 퍼스널 데이</Text>
        </View>
      </View>
      <View>
        <Calendar
          style={{ // 캘린더 자체 스타일
            width: '100%',
            height: '93%',
            backgroundColor: 'white'
          }}
          theme={{
            'stylesheet.calendar.header': {
              monthText: { // July 2023
                fontSize: 25
              },
              dayTextAtIndex0: { // 월요일
                color: 'red'
              },
              dayTextAtIndex6: { // 토요일
                color: 'blue'
              },
              dayHeader: { // 월화수목금토일
                width: 29
              }
            },
            'stylesheet.day.basic': {
              base: { // 캘린더 콘테이너
                height: 38,
                width: 38,
              },
              text: { // (Day) 1일, 2일, 3일...
                fontSize: 23,
                textAlign: 'center',
              }
            },
            'stylesheet.marking': { // 기간(bar)
              period: {
                height: 10 // bar 크기 조정
              }
            }
          }}
          onDayPress={(day) => console.log('onDayPress', day.dateString)}
          markingType="multi-period"
          markedDates={markedDates}
          renderArrow={(direction) => {
            if (direction == "left")
              return (
                <Feather name="arrow-left" size={30} color="black" />
              );
            if (direction == "right")
              return (
                <Feather name="arrow-right" size={30} color="black" />
              );
          }}
        />
      </View>
    </View>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: '10%'
  },
  paramText: { // 전시회 일정
    fontSize: 26,
    color: '#A3A098',
    marginBottom: '3%'
  },
  paramBox: { // 인덱스 박스
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  paramTexts: { // 인덱스 텍스트
    fontSize: 20,
  },
  
});
