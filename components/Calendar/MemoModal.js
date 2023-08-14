import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { addMemoToExhibition } from '../../DB/localStorage';

function MemoModal({ memoModalVisible, toggleMemoModal, formattedDate, memoText, handleMemoTextChange, selectedScheduleTitle, memoDataMap }) {
  
  const handleSaveMemo = async () => {
    try {
      await addMemoToExhibition(selectedScheduleTitle, formattedDate, memoText);
  
      toggleMemoModal();
    } catch (error) {
      console.log("Error saving memo:", error);
    }
  };
  
  return (
    <Modal animationType="fade" transparent={true} visible={memoModalVisible}>
      <View style={styles.memoModalContainer}>
        <View style={styles.memoModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>{formattedDate}</Text>
            
            <TouchableOpacity onPress={toggleMemoModal} style={styles.closeButton}>
              <Text style={[styles.headerText, { color: 'rgba(206, 204, 200, 1)' }, { fontSize: 32 ,}]}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>{selectedScheduleTitle}</Text>
          <Text style={{fontSize:16}}>메모</Text>
          <TextInput
            style={styles.memoInput}
            placeholder="메모를 입력하세요."
            value={memoDataMap[selectedScheduleTitle]}
            onChangeText={handleMemoTextChange}
            multiline
          />
          <TouchableOpacity onPress={handleSaveMemo} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default MemoModal;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
  modalHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 26,
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
