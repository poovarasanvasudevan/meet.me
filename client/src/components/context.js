import React, {createContext, useContext, useReducer} from 'react';

export const BaseContext = createContext();

export const BaseContextProvider = ({reducer, initialState, children}) => (
    <BaseContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </BaseContext.Provider>
);
export const useBaseStateValue = () => useContext(BaseContext);
