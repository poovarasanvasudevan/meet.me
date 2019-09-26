import React, {createContext, useContext, useReducer} from 'react';

export const EditorContext = createContext();

export const EditorProvider = ({reducer, initialState, children}) => (
    <EditorContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </EditorContext.Provider>
);
export const useStateValue = () => useContext(EditorContext);
