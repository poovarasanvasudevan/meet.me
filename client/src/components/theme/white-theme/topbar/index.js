import React from 'react';
import styled from 'styled-components';
import Color from '../../../theme/color';
import logo from '../../../../img/logo_blue.svg';
import AppContext from "../../../../module/AppContext";
import Avatar, {AvatarItem} from '@atlaskit/avatar';
import {If, Then, Else} from 'react-if';
import {Search} from '@atlaskit/atlassian-navigation';
import {Flex, Box} from "@rebass/grid";
import {IoMdHelpCircleOutline} from 'react-icons/io';

const MainBar = styled.div`
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 6px;
    padding-bottom: 6px;
   
    background: rgba(255,255,255,.97);
    box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);

    transition: top 0.2s ease-in-out
    
    min-height: 35px;
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
    border: 1px solid #dadada;
    outline: none;
    background-color: white;
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
        background : #eaeaea;
    }
   
`;
export default function (props) {

    const [user, setUser] = React.useState(null);
    const {Parse} = React.useContext(AppContext);

    React.useEffect(() => {
        const currentUser = Parse.User.current();

        if (currentUser != null) {
            const profile = currentUser.get('profile');
            profile
                .fetch()
                .then((data) => {
                    setUser(currentUser);
                    console.log(currentUser);
                });
        }

    }, []);


    return (
        <MainBar>
            <img alt={'Logo'} src={logo} height={40}/>


            <MainBarAvatar>
                <Flex>

                    <TempBox>
                        <IoMdHelpCircleOutline size={24} color={'#fff'}/>
                    </TempBox>

                    <DefaultSearch placeholder={'Search...'}/>

                    <If condition={user !== null}>
                        <Then>
                            <MainAvatarOuter>
                                <Avatar name={user ? user.get('first_name') + ' ' + user.get('last_name') : 'User'}
                                        size="small"
                                        src={user ? user.get('profile').get('avatar').url() : null}
                                />
                            </MainAvatarOuter>
                        </Then>
                    </If>
                </Flex>
            </MainBarAvatar>


        </MainBar>
    );
}
