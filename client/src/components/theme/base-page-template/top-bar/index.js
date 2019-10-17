import React from 'react';
import styled from 'styled-components';
import Color from '../../color';
import Avatar, {AvatarItem} from '@atlaskit/avatar';
import {If, Then, Else} from 'react-if';
import {Search} from '@atlaskit/atlassian-navigation';
import {Flex, Box} from "@rebass/grid";
import {IoMdHelpCircleOutline} from 'react-icons/io';
import {useBaseStateValue} from "../../../context";
import Logo from '../../../logo/new-logo';
import {PrimaryButton} from "office-ui-fabric-react";
import {MLink} from "../../link";

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

const CustomLogo = () => (
    <span>
        <Logo
            width={172}
            style={{paddingRight: 10, borderRight: "1px solid #222"}}
            color={'#ffffff'}
        />
    </span>
);
export default function (props) {

    const [{CurrentUser}, dispatch] = useBaseStateValue();

    return (
        <MainBar>
            <CustomLogo/>

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
                        <Else>
                            <MLink to={'/login'}>
                                <PrimaryButton text={'Login'}/>
                            </MLink>
                        </Else>
                    </If>
                </Flex>
            </MainBarAvatar>
        </MainBar>
    );
}
