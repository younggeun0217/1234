import React, { useState } from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons'; // 화살표 이미지
import MemoListModal from '../components/Calendar/MemoListModal';


function CalendarScreen() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const exhibitionList = [
    {
      id: 1,
      title: "참조점",
      color: "#A0C896",
    },
    {
      id: 2,
      title: "강우솔, 임아진:(불)응하는 몸",
      color: "#F1C7C8",
    },
    {
      id: 3,
      title: "Param",
      color: "#DDDBE8",
    },
    {
      id: 4,
      title: "피카소와 20세기 거장들",
      color: "#F5E7CE",
    },
  ];

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsModalVisible(true);
  };

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
    "2023-07-08": { selected: true, selectedColor: "#B8B5AD" },
    "2023-07-18": { selected: true, selectedColor: "#B8B5AD" },
  };

  // 여기에 하드코딩 된 객체 교체
  const markedDates = getMarked(
    [
      { startingDay: "2023-07-02", duration: 12, color: "#A0C896",},
      { startingDay: "2023-07-07", duration: 10, color: "#F1C7C8",},
      { startingDay: "2023-07-10", duration: 20, color: "#DDDBE8" },
      { startingDay: "2023-07-20", duration: 30, color: "#F5E7CE" },
    ],
    highlightedDate
  );

  return (
      <View style={styles.root}>
        <View>
          <Text style={styles.pageTitle}>My Exhibition</Text>
        </View>
        <View style={styles.table}>
          {exhibitionList.map((data) => (
            <View key={data.id} style={styles.content}>
              <View style={styles.titleContainer}>
                <Text style={styles.contentTitle}>{data.title}</Text>
              </View>
              <View
                style={[styles.contentColor, { backgroundColor: data.color }]}
              ></View>
            </View>
          ))}
        </View>
      <View>
      <Calendar
            markingType="multi-period"
            onDayPress={handleDayPress}
            markedDates={markedDates}
            theme={{
              "stylesheet.marking": {
                // 기간(bar)
                period: {
                  height: 13, // bar 크기 조정
                },
              },
            }}

      /> 
        {isModalVisible && (
          <MemoListModal selectedDate={selectedDate} onClose={() => setIsModalVisible(false)} />
        )}
      </View>
    </View>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: 'white'
  },
  pageTitle: {
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 30,
    fontWeight: "100",
    color: "#A3A098",
  },
  table: {
    marginTop: 10,
  },
  content: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#CCC9C1",
    borderBottomWidth: 0.5,
  },
  contentTitle: {
    fontSize: 16,
    color: "#4A4A4A",
    marginRight: 5,
  },
  titleContainer: {
    flex: 1,
  },
  contentColor: {
    flex: 1,
    height: 10,
  },  
});
