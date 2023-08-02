import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';

import DistrictModal from '../search/DistrictModal';

const MapScreen = () => {
  const exhibitionLocation = {
    latitude: 37.541, // 전시회 위치 위도
    longitude: 126.986, // 전시회 위치 경도
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDistrictList, setSelectedDistrictList] = useState([]);
  

  function DistrictList({ districts }) {
    return (
      <View style={styles.districtItem}>
        <Text style={styles.districtText}>{districts}</Text>
      </View>
    );
  }

  function handleSelectedDistrictList(districtList) {
    setSelectedDistrictList(districtList);
  }

  function openModal() { // Modal 열기
    setModalVisible(true);
  }

  function closeModal() { // Modal 닫기
    setModalVisible(false);
  }

  function handleSelectedDistrictList(districtList) { // 선택된 지역구 리스트 핸들링 함수
    setSelectedDistrictList(districtList);
  }

  return (
    <View style={styles.container}>
      <View style={styles.subTitle2}>
      
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          horizontal={true}
        >
          {selectedDistrictList.map((item, index) => (<DistrictList key={index} districts={item} />))}
        </ScrollView>
        <Pressable onPress={openModal}>
          <Entypo name="triangle-right" size={24} color="#A3A098" />
        </Pressable>
      </View>
      <DistrictModal
        pressed={modalVisible}
        onCancel={closeModal}
        onSelectedDistrictList={handleSelectedDistrictList}
        district={selectedDistrictList}
        setDistrict={setSelectedDistrictList}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: exhibitionLocation.latitude,
          longitude: exhibitionLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={exhibitionLocation}
          title="전시회 위치"
          description="전시회 장소 설명"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start', // 컨테이너를 화면의 위쪽으로 정렬
    },
    map: {
      flex: 1,
    },
    subTitle2: {
      flexDirection: 'row',
      justifyContent: 'flex-start', // 가운데 정렬로 변경
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10, // 하단 여백 추가
    },
    scrollViewContent: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    districtItem: {
      backgroundColor: '#ECECEC',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 10,
    },
    districtText: {
      textAlign: 'left',
    },
  });
  
export default MapScreen;
