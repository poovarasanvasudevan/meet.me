import React from "react";
import {createTheme} from '@atlaskit/theme';


const defaultButtonTheme = props => ({
    backgroundColor: props.hover ? '#ddd' : '#eee',
    textColor: '#333',
});

const Theme = createTheme(defaultButtonTheme);

const Base = props => (
    <Theme.Provider>{props.children}</Theme.Provider>
);

export default Base;
