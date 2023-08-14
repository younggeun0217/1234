import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MemoModal from "./MemoModal";
import { getMemoData } from "../../DB/localStorage";

function MemoListModal({ selectedDate, onClose, exhibitionDataByDate }) {
  const [memoText, setMemoText] = useState("");
  const [memoModalVisible, setMemoModalVisible] = useState(false);
  const [memoListVisible, setMemoListVisible] = useState(true);
  const [savedMemos, setSavedMemos] = useState({});
  const [selectedScheduleTitle, setSelectedScheduleTitle] = useState("");
  const [currentScheduleId, setCurrentScheduleId] = useState(null);
  const [memoDataMap, setMemoDataMap] = useState({});
  console.log(memoDataMap);
  const formattedDate = selectedDate.split("-").join(".");

  useEffect(() => {
    async function fetchMemoData() {
      const memoData = {};
      await Promise.all(
        exhibitionDataByDate.map(async (item) => {
          const memoText = await getMemoData(item.title, formattedDate);
          memoData[item.title] = memoText;
        })
      );
      setMemoDataMap(memoData);
    }

    fetchMemoData();
  }, [selectedDate, exhibitionDataByDate]);

  const toggleMemoModal = () => {
    setMemoModalVisible(!memoModalVisible);
  };

  const handleMemoTextChange = (text) => {
    const updatedMemoDataMap = { ...memoDataMap }; 
    updatedMemoDataMap[selectedScheduleTitle] = text; 
    setMemoDataMap(updatedMemoDataMap);
  };

  const handleEdit = (schedule) => {
    // console.log("선택된 일정 제목:", schedule.title);
    setCurrentScheduleId(schedule.id);
    setSelectedScheduleTitle(schedule.title);
    setMemoText(savedMemos[schedule.id] || "");
    setMemoModalVisible(true);
  };

  const getTrimmedMemo = (memo) => {
    const lines = memo.split("\n");
    if (lines.length <= 3) return memo;
    return lines.slice(0, 3).join("\n") + "...";
  };

  function memoList() {
    if (!memoListVisible) return null;
  
    return exhibitionDataByDate.map((item) => (
      <View key={item.title} style={styles.memoContainer}>
        <View style={styles.memoHeader}>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Text style={styles.memoText}>{item.title}</Text>
          </TouchableOpacity>
        </View>
        {memoDataMap[item.title] && (
          <Text style={styles.memoText}>메모 : {memoDataMap[item.title]}</Text>
        )}
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
              <Text
                style={[
                  styles.headerText,
                  { color: "rgba(206, 204, 200, 1)" },
                  { fontSize: 32 },
                ]}
              >
                X
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderTopWidth: 1.5,
              borderTopColor: "rgba(163, 160, 152, 0.8)",
            }}
          ></View>
          {memoList()}

          <MemoModal
            memoModalVisible={memoModalVisible}
            toggleMemoModal={toggleMemoModal}
            formattedDate={formattedDate}
            memoText={memoText}
            handleMemoTextChange={handleMemoTextChange}
            selectedScheduleTitle={selectedScheduleTitle}
            currentScheduleId={currentScheduleId}
            handleEdit={handleEdit}
            memoDataMap={memoDataMap}
          />
        </View>
      </View>
    </Modal>
  );
}

export default MemoListModal;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    marginTop: "60%",
    marginBottom: "26%",
    marginHorizontal: "10%",
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.5,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
    borderRadius: 10,
  },
  modalHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 30,
  },
  memoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 26,
  },
  memoContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(163, 160, 152, 0.8)",
  },
  memoText: {
    marginHorizontal: 4,
    marginVertical: 5,
  },
  memoModalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  memoModalContent: {
    marginTop: "60%",
    marginBottom: "26%",
    marginHorizontal: "10%",
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.5,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
    borderRadius: 10,
  },
  memoModalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  memoInput: {
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
