import React from "react";
import {createTheme} from '@atlaskit/theme';
import {BaseContextProvider} from './context';
import Dialog from './dialog';
import UserContext from './user-context';
import AppContext from "../module/AppContext";

const defaultButtonTheme = props => ({
    backgroundColor: props.hover ? '#ddd' : '#eee',
    textColor: '#333',
});

const Theme = createTheme(defaultButtonTheme);


const Base = (props) => {

    const {Logout} = React.useContext(AppContext);

    const UserAvatarDropDown = [
        {
            "label": "Account Settings",
            "onClick": null,
        },
        {
            "label": "Notification",
            "onClick": null,
        },
        {
            "label": "Status",
            "onClick": null,
        },
        {
            "label": "Input/Output device Settings",
            "onClick": null,
        },
        {
            "label": "About",
            "onClick": null,
        },
        {
            "label": "Logout",
            "onClick": Logout,
        }
    ];

    const initialState = {
        model: false,
        modelData: {},
        UserAvatarDropDown: UserAvatarDropDown,
        CurrentUser: null,
        template: "white"
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
            case 'template':
                return {
                    ...state,
                    template: action.template
                };
            default:
                return state;
        }
    };

    return (
        <BaseContextProvider initialState={initialState} reducer={reducer}>
            <UserContext>
                <Theme.Provider>
                    {props.children}
                </Theme.Provider>

                <Dialog/>
            </UserContext>
        </BaseContextProvider>
    );
};

export default Base;
