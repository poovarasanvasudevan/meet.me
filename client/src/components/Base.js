import React from "react";
import {createTheme} from '@atlaskit/theme';
import {BaseContextProvider} from './context';
import Dialog from './dialog';

const defaultButtonTheme = props => ({
    backgroundColor: props.hover ? '#ddd' : '#eee',
    textColor: '#333',
});

const Theme = createTheme(defaultButtonTheme);

const initialState = {
    model: false,
    modelType: null,
    modelTitle: '',
    modelContent: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'model':
            return {
                ...state,
                ...action
            };
        default:
            return state;
    }
};

const Base = props => (
    <BaseContextProvider initialState={initialState} reducer={reducer}>
        <Theme.Provider>
            {props.children}
        </Theme.Provider>

        <Dialog/>
    </BaseContextProvider>
);

export default Base;
