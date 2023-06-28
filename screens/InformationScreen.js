// 전시회 상세정보 screen
import { View, Text } from "react-native";

function InfromationScreen({route}) {
    const pressedExhibitionId = route.params?.exhibitionId; // 메인화면에서 클릭된 exhibition id 가져옴
    return (
        <View>
            <Text>전시회 상세 정보 페이지</Text>
            <Text>{pressedExhibitionId}</Text>
        </View>
    );
}

export default InfromationScreen;