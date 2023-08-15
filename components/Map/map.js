import React, { useState,useCallback,useEffect,useRef   } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image,TouchableOpacity  } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import DistrictModal from '../search/DistrictModal';
import { fetchExhibitions } from "../../DB/firebase";
import InfromationScreen from "../../screens/InformationScreen";
import { Modal } from "react-native";

const markerImage = require('../../assets/Marker.png');

const MapScreen = () => {
  
  const [showInformation, setShowInformation] = useState(false);

  const mapRef = useRef(null);
  const [exhibitionData, setExhibitions] = useState([]);
  const [district, setDistrict] = useState([]);

  const [modalIsVisible, setModalIsVisible] = useState(false); // 구 input칸 클릭 시 나오는 modal (true / false)

    useEffect(() => {
      async function fetchData() {
          try {
              const data = await fetchExhibitions();
              setExhibitions(data);
              
          } catch (error) {
              console.error("전시회 정보를 가져오는 중 에러가 발생했습니다:", error);
          }
      }
      fetchData();
      if (!district.length) {
        setDistrict([]); // 초기화하지 않도록 변경
      }
  }, []);
  useEffect(() => {
    generateMarkers();
    
  }, [district]);
  const exhibitionLocation = {
    latitude: 37.541, 
    longitude: 126.986, 
  };
  

  const [showExhibitionList, setShowExhibitionList] = useState(false);
  const navigation = useNavigation(); 
  const [zoomLevel, setZoomLevel] = useState(0); // 초기 줌 레벨 설정
  const handleRegionChange = useCallback(region => {
    setZoomLevel(region.latitudeDelta); // 줌 레벨을 현재 지도의 latitudeDelta로 설정
  }, []);

  function DistrictList({districts}) { // 서울 지역구 출력 함수
    return <Text style={styles.districtItems}>{districts}</Text>;
}

function goToPredefinedLocation() {
  if (mapRef.current) { // mapRef가 유효한지 확인
    mapRef.current.animateToRegion({
      latitude: 37.541,
      longitude: 126.986,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }
}
function NoneDistrict() {
    if (district === undefined) 
        return <Text style={styles.noneDistrictText}>지역구를 선택해주세요.(선택)</Text>;
}

function openModal() { // Modal 열기
    setModalIsVisible(true);
}

function closeModal() { // Modal 닫기
    setModalIsVisible(false);
}

function handleSetDistrict(districts) { // district 상태를 handling하는 함수
    setDistrict(districts);
    
}


  function handleCalloutPress(marker) {
    navigation.navigate(InfromationScreen, { exhibitionId: marker.id });
  }

  function handleShowExhibitionList() {
    setShowExhibitionList(!showExhibitionList);
  }

  const openInformation = (exhibitionData) => {
    setShowInformation(true);
};

const closeInformation = () => {
    setShowInformation(false);
};
  const generateMarkers = () => {
    const maxMarkers = Math.ceil( 1/  zoomLevel); // 줌 레벨에 따라 표시할 최대 마커 개수 조절
    const markers = [];

    for (let i = 0; i < Math.min(maxMarkers, exhibitionData.length); i++) {
      const marker = exhibitionData[i];
      if (!district.length || district.includes(marker.location)) {
      
       markers.push(
         <Marker
           key={marker.id}
           coordinate={{
             latitude: marker.latitude,
             longitude: marker.longitude,
           }}
           title={marker.Title}
           Exhibition={marker.location}
           StartDate={marker.StartDate}
           calloutOffset={{ x: -8, y: 32 }}
          calloutAnchor={{ x: 0.5, y: 0.4 }}
         >
           <Image source={markerImage} style={styles.marker} />
           <Text style={styles.markerTitle}>{marker.Title}</Text>
 
           <Callout style={styles.calloutContainer} onPress={() => openInformation(marker)}>
               <View style={styles.calloutContent}>
                <View> 
                 <WebView style={styles.exhibitionItemImage}
                  source={{ uri: marker.thumbnail }} /> 
                 </View>
                 <View style={styles.calloutTextContainer}>
                 <Text style={styles.calloutSubtitle}>
                  {marker.title.length > 20 ? marker.title.substring(0, 20) + '...' : marker.title}</Text>
                   <Text style={styles.calloutSubtitle}>{marker.title.length > 20 ? marker.location.substring(0, 20) + '...' : marker.location}</Text>
                   <Text style={styles.calloutSubtitle}>{marker.startDate}{'-'}{marker.endDate}</Text>
                  
                 </View>
               </View>
               {showInformation && <Modal>
                        <InfromationScreen datas={marker} onCancel={closeInformation} />
                    </Modal>
                }
             </Callout>
          </Marker>
        );
      }
    }

    return markers;
  };
  return (
    <View style={styles.container}>
      <View style={styles.subTitle2}>
       {!showExhibitionList && ( // <-- 추가
        <>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          horizontal={true}
         >
            <NoneDistrict />
              {district && district.map((item, index) => (<DistrictList key={index} districts={item} />))}
        </ScrollView>

          <Text style={styles.titleText}>지역 검색</Text>
          <Pressable onPress={openModal}>
            <Entypo name="triangle-right" size={24} color="#A3A098" />
          </Pressable>
        </>
     )} 
    </View>
      <DistrictModal
       pressed={modalIsVisible} 
       onCancel={closeModal}
       onSelectedDistrictList={handleSetDistrict}
       district={district}
       setDistrict={setDistrict}
   />
      <MapView
        ref={mapRef} 
        style={styles.map}
        initialRegion={{
          latitude: exhibitionLocation.latitude,
          longitude: exhibitionLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      
        onRegionChangeComplete={handleRegionChange} // 줌 레벨 변경 시 호출
        >
        {generateMarkers()}
        
      </MapView>
      {!showExhibitionList && ( // <-- 추가
        <View>
         <Pressable style={styles.goButton} onPress={goToPredefinedLocation}>
            <Text style={styles.goButtonText}>기본 위치</Text>
         </Pressable>
       </View>
      )}

      <View style={styles.showButtonContainer}>
      <Pressable style={styles.showButton} onPress={handleShowExhibitionList}>
        <Text style={styles.showButtonText}>
          {showExhibitionList ? '전시회 목록 숨기기' : '전시회 목록 보기'}
        </Text>
      </Pressable>
      
    </View>

    {showExhibitionList && (
  <ScrollView style={styles.exhibitionListContainer}>
    {exhibitionData.map((exhibition) => (
      <TouchableOpacity 
        key={exhibition.id} 
        onPress={() => openInformation(exhibition)}>
        <View style={styles.exhibitionItem}>
          <View style={styles.exhibitionItemContent}>
            <Image
              style={styles.exhibitionItemImage}
              source={{ uri: exhibition.thumbnail }}
            />
            <View style={styles.exhibitionItemText}>
              <Text>{exhibition.title.length > 20 ? exhibition.title.substring(0, 20) + '...' : exhibition.title}</Text>
              <Text style={styles.calloutSubtitle}>{exhibition.title.length > 20 ? exhibition.location.substring(0, 20) + '...' : exhibition.location}</Text>
              <Text style={styles.calloutSubtitle}>{exhibition.startDate}{'-'}{exhibition.endDate}</Text>
            </View>
          </View>
        </View>
        {showInformation && <Modal>
                        <InfromationScreen datas={exhibition} onCancel={closeInformation} />
                    </Modal>
                }
      </TouchableOpacity>
    ))}
  </ScrollView>
)}


      
    </View>
  );
};


const styles = StyleSheet.create({
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#FFF',
    marginLeft: 5,
  },
    container: {
      flex: 1,
      justifyContent: 'flex-start', 
    },
    map: {
      flex: 1,
    },
    subTitle2: {
      flexDirection: 'row',
      justifyContent: 'flex-start', 
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10, 
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
    calloutContainer: {
      width: 300,
      height: 300,
      borderRadius: 10,
      
      resizeMode: 'contain',
    },
    
    calloutContent: {
      flexDirection: 'row',
      alignItems: 'center',
      resizeMode: 'contain',
      
    },
    calloutTextContainer: {
      flex: 1,
      resizeMode: 'contain',
      
    },
    calloutTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    calloutSubtitle: {
      fontSize: 14,
    },
    image:{
      width: 150,
      height: 150,
      marginRight: 10,
      resizeMode: 'contain',
      
    },
    exhibitionListContainer: {
      marginTop: 20,
      paddingHorizontal: 10,
    },
    exhibitionItem: {
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#DDD',
      flexDirection: 'row', // 이미지와 텍스트를 가로로 나란히 배치하기 위해 추가
      flex: 1,
      flexDirection: 'column',
    },
    exhibitionItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    exhibitionItemImage: {
      width: 150,
      height: 150,
      marginRight: 10,
      resizeMode: 'contain',
    },
    
    exhibitionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      
    },
    exhibitionSubtitle: {
      fontSize: 14,
      
      
    },
    
    showButtonContainer: {
      marginTop: 20,
      paddingHorizontal: 10,
    },
    showButton: {
      backgroundColor: '#A3A098',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    showButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    markerTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    exhibitionItemText: {
      flex: 1,
      flexWrap: 'wrap',
      
    },
    goButton: {
      position: 'absolute',
      bottom: 10,
      left: 3,
      backgroundColor: '#A3A098',
      borderRadius: 4,
      paddingVertical: 5, // 작게 조절
      paddingHorizontal: 15, // 작게 조절
      alignItems: 'center', // 수평 가운데 정렬
      justifyContent: 'center', // 수직 가운데 정렬
    },
    goButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 12, // 작게 조절
    },
  });
  


export default MapScreen;
