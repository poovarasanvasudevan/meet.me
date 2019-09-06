import React, {Component} from "react";
import Skeleton from './Skeleton';
import Base from "./Base";
import styled, {css} from 'styled-components';
import Button from "@atlaskit/button";
import * as colors from '@atlaskit/theme/colors';
import Icon from "@atlaskit/icon";

const Color = {
    primaryColor: '#053B8C',
    primaryColorDark: '#042D79',
    primaryColorActive: '#01195C'
};

const SkeletonComponent = loadingProp => WrappedComponent => {
    return class SkeletomComponentHOC extends Component {
        render() {
            return (
                <Skeleton>
                    <WrappedComponent {...this.props} />
                </Skeleton>
            );
        }
    };
};
const baseStyles = {
    border: 'none',
    padding: '0px 15px',
    height: '35px'
};


const BaseComponent = loadingProp => WrappedComponent => {
    return class SkeletomComponentHOC extends Component {
        render() {
            return (
                <Base>
                    <WrappedComponent {...this.props} />
                </Base>
            );
        }
    };
};


const customTheme = {
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

const ThemedButton = (props) => (
    <Button
        {...props}
        theme={(currentTheme, themeProps) => {
            const {buttonStyles, ...rest} = currentTheme(themeProps);
            return {
                buttonStyles: {
                    ...buttonStyles,
                    ...baseStyles,
                    ...extract(customTheme, themeProps),
                },
                ...rest,
            };
        }}
    />
);


// const AppButton = styled(Button)`
//     background-color : ${Color.primaryColor};
//     color : #fff;
//
//     &:focus, &:hover, &:active {
//         background-color: ${Color.primaryColorDark};
//         color : #fff;
//     }
// `;


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


const CreateIcon = (props) => {
    return <Icon glyph={() => props.children}
                 label="Custom icon"/>;
};
const Divider = (props) => {
    return (<div style={{width: '100%', borderBottom: '1px solid #eaeaea'}}/>);
};

export {
    SkeletonComponent,
    BaseComponent,
    Color,
    AppButton,
    Divider,
    CreateIcon,
    ThemedButton
};
