// 일단 보류
// 캘린더 or 즐겨찾기에 사용할 수도 있음
// Context API
import { createContext, useReducer } from "react";

export const ExhibitionsContext = createContext({
    exhibitions: [],
    setExhibitions: (exhibitions) => {},
});

function exhibitionsReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return action.payload;
        default:
            return state;
    }
}

function ExhibitionsContextProvider({children}) {
    const [exhibitionsState, dispatch] = useReducer(exhibitionsReducer, []);

    function setExhibitions(exhibitions) {
        dispatch({type: 'SET', payload: exhibitions});
    }

    const value = {
        exhibitions: exhibitionsState,
        setExhibitions: setExhibitions,
    };

    return (
        <ExhibitionsContext.Provider value={value}>
            {children}
        </ExhibitionsContext.Provider>
    );
}

export default ExhibitionsContextProvider;