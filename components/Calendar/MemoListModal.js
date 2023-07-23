import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; // 이미지

function MemoListModal({ selectedDate, onClose }) {

    const [selectedMemo, setSelectedMemo] = useState([]);

    const formattedDate = selectedDate.split('-').join('.');
    console.log(formattedDate); // 2023.07.07

    // 데이터 하드코딩
    const schedule = [
        { id: 1, title: 'Param', memo: '이날 관람하기'},
        { id: 2, title: '피카소와 20세기 거장들', memo: '커피 먹기'},
        { id: 3, title: '알렉스 도지 : 퍼스널 데이', memo: ''},
    ];

    const handleMemoPress = (id) => {
        setSelectedMemo((prevSelectedMemoIds) =>
            prevSelectedMemoIds.includes(id)
                ? prevSelectedMemoIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedMemoIds, id]
        );
    };

    function meomoList() {
        return schedule.map((item) => (
            <View key={item.id} style={styles.memoContainer}>
                <View style={styles.memoHeader}>
                    <Text style={styles.memoText}>{item.title}</Text>
                    <TouchableOpacity onPress={() => handleMemoPress(item.id)}>
                        <AntDesign
                            name={selectedMemo.includes(item.id) ? 'down' : 'right'}
                            size={16}
                            color="black"
                            style={{ paddingTop: 5, paddingLeft: 5, width: '100%' }}
                        />
                    </TouchableOpacity>
                </View>
                {selectedMemo.includes(item.id) && item.memo && <Text style={styles.memoText}>메모 : {item.memo}</Text>}
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
                            <Text style={[styles.headerText, {color : 'rgba(206, 204, 200, 1)'}, {fontSize: 32}]}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderTopWidth: 1.5, borderTopColor: 'rgba(163, 160, 152, 0.8)'}}></View>
                    {meomoList()}
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
        width: deviceWidth*0.8,
        height: deviceHeight*0.5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 20,
        borderRadius: 10,
    },
    modalHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 30
    },
    memoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        marginVertical: 5
    },
});
