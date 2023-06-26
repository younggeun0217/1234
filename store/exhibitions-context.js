// 일단 보류
// 캘린더 or 즐겨찾기에 사용할 수도 있음
// Context API
import { createContext, useReducer } from "react";

export const ExhibitionsContext = createContext({
    exhibitions: [],
});

function exhibitionsReducer(state, action) {

}

function ExhibitionsContextProvider({children}) {
    useReducer();

    return <ExhibitionsContext.Provider>{children}</ExhibitionsContext.Provider>
}

export default ExhibitionsContextProvider;