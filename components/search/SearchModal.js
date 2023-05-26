import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, Dimensions, ScrollView } from "react-native";

import {DISTRICT} from '../../data/seoulDistrict';

function SearchModal({pressed, onCancel}) {
    const [selectedDistrictList, setSelectedDistrictList] = useState([]);
    const [seoulDistrict, setSeoulDistrict] = useState([])

    return( 
        <Modal visible={pressed} animationType="slide" transparent={false}>
            <View style={styles.screen}>
                <ScrollView>
                    <View style={styles.districtList}>
                        {DISTRICT.map(district => <Text style={styles.districtText} key={district.id}>{district.name}</Text>)}    
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Pressable onPress={onCancel}>
                        <View style={styles.footerBox}>
                            <Text style={styles.footerText}>적용하기</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

export default SearchModal;

const devideWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    districtList: {
        width: devideWidth,
        height: (deviceHeight*0.92),
    },
    districtText: {
        fontSize: 40
    },
    footer: {
        width: devideWidth,
        height: (deviceHeight*0.08),
        borderTopColor: '#A3A098',
        borderTopWidth: 3,
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 120
    },
    footerBox: {
        backgroundColor: '#A3A098',
        borderColor: '#A3A098',
        borderWidth: 1,
        borderRadius: 16,
    },
    footerText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    }
});