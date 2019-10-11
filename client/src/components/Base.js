import React from "react";
import {createTheme} from '@atlaskit/theme';
import {BaseContextProvider} from './context';
import Dialog from './dialog';
import UserContext from './user-context';

const defaultButtonTheme = props => ({
    backgroundColor: props.hover ? '#ddd' : '#eee',
    textColor: '#333',
});

const Theme = createTheme(defaultButtonTheme);

const initialState = {
    model: false,
    modelData: {},
    CurrentUser: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'model':
            return {
                ...state,
                ...action
            };
        case 'setuser':
            return {
                ...state,
                CurrentUser: action.user
            };
        default:
            return state;
    }
};

const Base = props => (
    <BaseContextProvider initialState={initialState} reducer={reducer}>
        <UserContext>
            <Theme.Provider>
                {props.children}
            </Theme.Provider>

            <Dialog/>
        </UserContext>
    </BaseContextProvider>
);

export default Base;
