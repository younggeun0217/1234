import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  findNodeHandle,
} from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Favorite from './Favorite';
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { ColorPicker } from 'react-native-color-picker';

const Favorites = () => {
  const results = exhibitionList(); // 더미 데이터들
  const [exhibitionData, setExhibitionData] = useState(results);
  const [dragging, setDragging] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedExhibitionId, setSelectedExhibitionId] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  function exhibitionList() {
    const exhibition1 = {
      id: 1,
      title: '참조점',
      imageUrl:
        'https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/fa3fba495cdbf61d5d50f96c2315bf27_.jpg',
      location: '더레퍼런스/서울',
      startDate: '2023.05.19',
      endDate: '2024.05.28',
      color: '#F5E7CE',
    };
    const exhibition2 = {
      id: 2,
      title: '강우솔, 임아진:(불)응하는 몸',
      imageUrl:
        'https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/9d1b2eafad0bf994af86e2264f1101b5_aeba0a70bccda99b615dc39434ea5976_345622143_206535278842503_6575964803203688317_n.jpg',
      location: '스페이스 미라주/서울',
      startDate: '2023.05.18',
      endDate: '2024.06.01',
      color: '#F1C7C8',
    };
    const exhibition3 = {
      id: 3,
      title: '캐브 먼데이:Making a Scene',
      imageUrl:
        'https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/d77cf291d6214dadbf64b1d74d704203_.jpg',
      location: 'VIVIAN CHOI GALLERY(비비안초이갤러리)/서울',
      startDate: '2023.05.18',
      endDate: '2023.06.10',
      color: '#DDDBE8',
    };
    const exhibition4 = {
      id: 4,
      title: '봄의제전',
      imageUrl:
        'https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/6a11c73de2f36c10613ef5b859f17bad_.png',
      location: '프린트베이커리 더현대서울점/서울',
      startDate: '2023.05.18',
      endDate: '2023.06.07',
      color: '#A0C896',
    };
    const exhibition5 = {
      id: 5,
      title: '봄의제전',
      imageUrl:
        'https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/6a11c73de2f36c10613ef5b859f17bad_.png',
      location: '프린트베이커리 더현대서울점/서울',
      startDate: '2023.05.18',
      endDate: '2023.06.07',
      color: '#7C7773',
    };
    const exhibition6 = {
      id: 6,
      title: '봄의제전',
      imageUrl:
        'https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/6a11c73de2f36c10613ef5b859f17bad_.png',
      location: '프린트베이커리 더현대서울점/서울',
      startDate: '2023.05.18',
      endDate: '2023.06.07',
      color: '#F5E7CE',
    };
    const testData = [
      exhibition1,
      exhibition2,
      exhibition3,
      exhibition4,
      exhibition5,
      exhibition6,
    ];

    return testData;
  }

  const handleDeleteItem = useCallback((id) => {
    setExhibitionData((prevData) =>
      prevData.filter((exhibition) => exhibition.id !== id)
    );
  }, []);

  const toggleColorPicker = (id) => {
    const selectedExhibition = exhibitionData.find(
      (exhibition) => exhibition.id === id
    );

    if (selectedExhibition) {
      setSelectedColor(selectedExhibition.color);
    }

    setSelectedExhibitionId(id);
    setColorPickerVisible((prevVisible) => !prevVisible);
  };

  const handleColorChange = (color) => {
    setExhibitionData((prevData) =>
      prevData.map((exhibition) =>
        exhibition.id === selectedExhibitionId
          ? { ...exhibition, color: color }
          : exhibition
      )
    );
    toggleColorPicker(null);
  };

  const SwipeRowItem = useCallback(
    ({ item }) => {
      const swipeRowRef = useRef(null);

      const onDeleteItem = useCallback(() => {
        handleDeleteItem(item.id);
        if (swipeRowRef.current) {
          swipeRowRef.current.closeRow();
        }
      }, [handleDeleteItem, item.id]);

      return (
        <SwipeRow ref={swipeRowRef} rightOpenValue={-75} disableRightSwipe>
          <TouchableOpacity style={styles.rowBack} onPress={onDeleteItem}>
            <Text>Delete</Text>
          </TouchableOpacity>
          {/* <Favorite data={item} /> */}
          <Favorite
            data={item}
            onColorBoxPress={() => toggleColorPicker(item.id)}
          />
        </SwipeRow>
      );
    },
    [handleDeleteItem]
  );

  const handleDragEnd = useCallback(({ data }) => {
    setExhibitionData(data);
  }, []);

  const renderItem = useCallback(({ item, drag }) => {
    const onGestureEvent = (event) => {
      drag(event);
    };
    return (
      <View style={styles.item} key={item.key} onLongPress={drag}>
        <PanGestureHandler activeOffsetY={10} onGestureEvent={onGestureEvent}>
          <View>
            <SwipeRowItem item={item} />
          </View>
        </PanGestureHandler>
      </View>
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <DraggableFlatList
        data={exhibitionData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        onDragEnd={handleDragEnd}
      />
      <Modal isVisible={colorPickerVisible}>
        <ColorPicker
          defaultColor={selectedColor}
          onColorSelected={handleColorChange}
          style={{ flex: 1 }}
        />
      </Modal>
    </GestureHandlerRootView>
  );
};

// 스와이프용
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#AAAAAA',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
});

export default Favorites;
