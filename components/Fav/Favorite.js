import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ColorPicker } from 'react-native-color-picker';

const Favorite = ({ data, onColorBoxPress }) => {
  // 현재 날짜를 Date 객체로 얻습니다.
  const currentDate = new Date();

  // 'YYYY.MM.DD' 형식의 문자열을 Date 객체로 변환합니다.
  const startDate = new Date(data.startDate.split('.').join('-'));
  const endDate = new Date(data.endDate.split('.').join('-'));

  // 현재 날짜가 전시 시작일과 종료일 사이에 있는지 확인합니다.
  const isExhibiting = startDate <= currentDate && currentDate <= endDate;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onColorBoxPress}>
        <View style={[styles.colorBox, { backgroundColor: data.color }]}></View>
      </TouchableOpacity>
      <View style={styles.exInfo}>
        <Image style={styles.exImage} source={{ uri: data.imageUrl }} />
        <View style={styles.exText}>
          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {data.title}
          </Text>
          <Text
            style={styles.locationText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {data.location}
          </Text>
          <Text style={styles.text}>
            {data.startDate} ~ {data.endDate}
          </Text>
          {isExhibiting ? (
            <View style={styles.open}>
              <Text style={styles.openText}>전시중</Text>
            </View>
          ) : (
            <View style={styles.close}>
              <Text style={styles.closeText}>전시 종료</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    borderColor: '#CECCC8',
    borderBottomWidth: 2,
    backgroundColor: '#F6F5F5',
    width: 393,
    height: 133,
    flexDirection: 'row',
  },
  colorBox: {
    width: 20,
    height: 133,
    borderColor: '#CECCC8',
    borderBottomWidth: 2,
  },
  exInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  exImage: {
    width: 90,
    height: 113,
  },
  exText: {
    marginLeft: 10,
  },
  titleText: {
    color: '#4A4A4A',
    marginBottom: 30,
    width: 250,
    fontSize: 17,
  },
  text: {
    color: '#4A4A4A',
    fontSize: 14,
  },
  locationText: {
    color: '#4A4A4A',
    width: 250,
  },
  open: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ED7442',
    left: 205,
    top: 10,
  },
  openText: {
    color: '#ED7442',
    fontSize: 13,
  },
  close: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#727272',
    left: 188,
    top: 8,
  },
  closeText: {
    color: '#727272',
    fontSize: 13,
  },
});
