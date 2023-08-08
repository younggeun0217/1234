import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { Feather } from "@expo/vector-icons"; // 화살표 이미지
import MemoListModal from "../components/Calendar/MemoListModal";
import { getAllLikedExhibitions } from "../DB/localStorage";

function CalendarScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [exhibitionData, setExhibitionData] = useState([]); // 로컬 스토리지 데이터들

  useFocusEffect( // 화면 렌더링하기 위해 사용
    React.useCallback(() => {
      const fetchExhibitionData = async () => {
        const likedExhibitions = await getAllLikedExhibitions();
        setExhibitionData(likedExhibitions);
      };
  
      fetchExhibitionData();
    }, [])
  );

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsModalVisible(true);
  };

  const formatDate = (date) => {
    const parts = date.split('.');
    return `${parts[0]}-${parts[1]}-${parts[2]}`;
  };

  const exhibitionDataByDate = exhibitionData.filter((item) => {
    const formattedStartDate = formatDate(item.startDate);
    const formattedEndDate = formatDate(item.endDate);
    const selectedFormattedDate = formatDate(selectedDate);

    return (
      selectedFormattedDate >= formattedStartDate &&
      selectedFormattedDate <= formattedEndDate
    );
  });

  const getMarked = (schedules, highlightedDate) => {
    let marked = { ...highlightedDate };
  
    schedules.forEach((schedule) => {
      const { startingDay, duration, color } = schedule;
      const startingDate = new Date(startingDay.replace(/\./g, "-")); // Convert format
  
      for (let i = 0; i < duration; i++) {
        let day = new Date(startingDate);
        day.setDate(day.getDate() + i);
        let formattedDay = day.toISOString().split("T")[0];
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
    "2023-08-12": { selected: true, selectedColor: "#B8B5AD" },
    "2023-08-18": { selected: true, selectedColor: "#B8B5AD" },
  };

  // 여기에 하드코딩 된 객체 교체
  const markedDates = getMarked(
    exhibitionData.map((item) => ({
      startingDay: item.startDate, // Change this according to your data structure
      duration: item.duration, // You need to implement this function
      color: item.color,
    })),
    highlightedDate
  );

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.pageTitle}>My Exhibition</Text>
      </View>
      <View style={styles.table}>
        {exhibitionData.map((data) => (
          <View key={data.key} style={styles.content}>
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
          renderArrow={(direction) => {
            if (direction == "left")
              return <Feather name="arrow-left" size={30} color="skyblue" />;
            if (direction == "right")
              return <Feather name="arrow-right" size={30} color="skyblue" />;
          }}
        />
        {isModalVisible && (
          <MemoListModal
            selectedDate={selectedDate}
            onClose={() => setIsModalVisible(false)}
            exhibitionDataByDate={exhibitionDataByDate}
          />
        )}
      </View>
    </View>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: "10%",
    backgroundColor: "white",
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
