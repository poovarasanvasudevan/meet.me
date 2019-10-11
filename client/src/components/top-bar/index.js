import React from 'react';
import styled from 'styled-components';
import Color from '../theme/color';
import logo from '../../img/logo.svg';
import AppContext from "../../module/AppContext";
import Avatar, {AvatarItem} from '@atlaskit/avatar';
import {If, Then, Else} from 'react-if';
import {Search} from '@atlaskit/atlassian-navigation';
import {Flex, Box} from "@rebass/grid";
import {IoMdHelpCircleOutline} from 'react-icons/io';
import {useBaseStateValue} from "../context";

const MainBar = styled.div`
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 6px;
    padding-bottom: 6px;
    background : ${Color.primaryColor};
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    height: 40px;
`;

const MainBarAvatar = styled.div`
    float:right;
    padding: 4px;
`;

const MainAvatarOuter = styled.div`
    padding : 1px;
`;

const DefaultSearch = styled.input`
    border-radius: 6px;
    box-sizing: border-box;
    height: 32px;
    width: 220px;
    border: none;
    outline: none;
    background-color: ${Color.primaryColorDark};
    color: #FFFFFF;
    margin-left : 10px;
    margin-right: 10px;
    padding-left : 8px;
`;

const TempBox = styled.div`
    padding : 4px;
    margin-left : 6px;
    margin-right: 6px;
    cursor: pointer;
    border-radius: 3px;
    
    &:focus, &:hover, &:active {
        background : ${Color.primaryColorDark};
    }
   
`;
export default function (props) {

    const [user, setUser] = React.useState(null);
    const [{CurrentUser}, dispatch] = useBaseStateValue();

    return (
        <MainBar>
            <img alt={'Logo'} src={logo} height={40}/>
            
            <MainBarAvatar>
                <Flex>

                    <TempBox>
                        <IoMdHelpCircleOutline size={24} color={'#fff'}/>
                    </TempBox>

                    <DefaultSearch placeholder={'Search...'}/>

                    <If condition={CurrentUser !== null}>
                        <Then>
                            <MainAvatarOuter>
                                <Avatar
                                    name={CurrentUser ? CurrentUser.get('first_name') + ' ' + CurrentUser.get('last_name') : 'User'}
                                    size="small"
                                    src={CurrentUser ? CurrentUser.get('profile').get('avatar').url() : null}
                                />
                            </MainAvatarOuter>
                        </Then>
                    </If>
                </Flex>
            </MainBarAvatar>


        </MainBar>
    );
}
