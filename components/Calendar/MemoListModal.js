import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MemoModal from './MemoModal'; 

function MemoListModal({ selectedDate, onClose }) {
  const [selectedMemo, setSelectedMemo] = useState([]);
  const [memoText, setMemoText] = useState('');
  const [memoModalVisible, setMemoModalVisible] = useState(false);
  const [memoListVisible, setMemoListVisible] = useState(true);
  const [savedMemo, setSavedMemo] = useState(''); 
  const [selectedScheduleTitle, setSelectedScheduleTitle] = useState('');

  const formattedDate = selectedDate.split('-').join('.');
  console.log(formattedDate); 

  const schedule = [
    { id: 1, title: 'Param', memo: '이날 관람하기' },
    { id: 2, title: '피카소와 20세기 거장들', memo: '커피 먹기' },
    { id: 3, title: '알렉스 도지 : 퍼스널 데이', memo: '' },
  ];

  const handleMemoPress = (id) => {
    setSelectedMemo((prevSelectedMemoIds) =>
      prevSelectedMemoIds.includes(id)
        ? prevSelectedMemoIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedMemoIds, id]
    );
  };

  const toggleMemoModal = () => {
    setMemoModalVisible(!memoModalVisible);
  };

  const handleMemoTextChange = (text) => {
    setMemoText(text);
  };

  const handleEditMemo = (schedule) => {
    console.log('선택된 일정 제목:', schedule.title);
    setSelectedScheduleTitle(schedule.title);
    setSelectedMemo([]);
    setMemoText('');

    setMemoModalVisible(true); 
  };
  const handleSaveMemo = () => {
    setSavedMemo(memoText); 
    toggleMemoModal(); 
  };

  function memoList() {
    if (!memoListVisible) return null;
    return schedule.map((item) => (
      <View key={item.id} style={styles.memoContainer}>
        <View style={styles.memoHeader}>
          <TouchableOpacity onPress={() => handleEditMemo(item)}>
            <Text style={styles.memoText}>{item.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMemoPress(item.id)}>
            <AntDesign
              name={selectedMemo.includes(item.id) ? 'down' : 'right'}
              size={16}
              color="black"
              style={{ paddingTop: 5, paddingLeft: 5, width: '100%' }}
            />
          </TouchableOpacity>
        </View>
        {selectedMemo.includes(item.id) && <Text style={styles.memoText}>메모 : {savedMemo}</Text>}
      </View>
    ));
  }

 
 

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>{formattedDate}</Text>
           
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.headerText, { color: 'rgba(206, 204, 200, 1)' }, { fontSize: 32 }]}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={{ borderTopWidth: 1.5, borderTopColor: 'rgba(163, 160, 152, 0.8)' }}></View>
          {memoList()}

          
          <MemoModal
            memoModalVisible={memoModalVisible}
            toggleMemoModal={toggleMemoModal}
            formattedDate={formattedDate}
            memoText={memoText}
            handleMemoTextChange={handleMemoTextChange}
            onSave={handleSaveMemo}
            selectedScheduleTitle={selectedScheduleTitle}
          />
        </View>
      </View>
    </Modal>
  );
}

export default MemoListModal;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    marginTop: '60%',
    marginBottom: '26%',
    marginHorizontal: '10%',
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
    borderRadius: 10,
  },
  modalHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
  },
  memoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 26,
  },
  memoContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(163, 160, 152, 0.8)',
  },
  memoText: {
    marginHorizontal: 4,
    marginVertical: 5,
  },
  memoModalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  memoModalContent: {
    marginTop: '60%',
    marginBottom: '26%',
    marginHorizontal: '10%',
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.5,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
    borderRadius: 10,
  },
  memoModalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memoInput: {
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
