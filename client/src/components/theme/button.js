import * as colors from '@atlaskit/theme/colors';
import Color from './color';
import Button from "@atlaskit/button";
import React from "react";
import styled, {css} from "styled-components";

const customButtonTheme = {
    default: {
        background: {
            default: colors.N30,
            hover: colors.N40,
            active: colors.N50,
        },
    },
    primary: {
        background: {
            default: Color.primaryColor,
            hover: Color.primaryColorDark,
            active: Color.primaryColorActive,
        },
    },
};


const ThemedButton = (props) => (
    <Button
        {...props}
        theme={(currentTheme, themeProps) => {
            const {buttonStyles, ...rest} = currentTheme(themeProps);
            return {
                buttonStyles: {
                    ...buttonStyles,
                    ...baseStyles,
                    ...extract(customButtonTheme, themeProps),
                },
                ...rest,
            };
        }}
    />
);

const AppButton = styled(ThemedButton)`
    height : 35px;
    border-radius : 3px;
    padding: '0px 15px',
    border: 'none',
    background : none;
    && {
       ${props => props.primary && css`background : ${props => Color.primaryColor} !important;`}
       ${props => props.primary && css`color : white !important;`}
       
       &:hover {
          ${props => props.primary && css`background : ${props => Color.primaryColorDark} !important;`}    
       }
       &.active {
          ${props => props.primary && css`background : ${props => Color.primaryColorActive} !important;`}
       }
    }
`;

function extract(newTheme, {mode, appearance, state}) {
    if (!newTheme[appearance]) {
        return undefined;
    }
    const root = newTheme[appearance];
    return Object.keys(root).reduce((acc, val) => {
        let node = root;
        [val, state, mode].forEach(item => {
            if (!node[item]) {
                return undefined;
            }
            if (typeof node[item] !== 'object') {
                acc[val] = node[item];
                return undefined;
            }
            node = node[item];
            return undefined;
        });
        return acc;
    }, {});
}

const baseStyles = {
    border: 'none',
    padding: '0px 15px',
    height: '35px'
};


export {
    customButtonTheme,
    ThemedButton,
    AppButton
};
