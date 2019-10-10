import React from 'react';
import styled from 'styled-components';
import MainBar from './topbar'

const FullPage = styled.div`
    display : flex;
    flex-direction : column;
    height: 100%;
`;

const Header = styled.div`
    flex: 0 0 auto;
`;
const Body = styled.div`
    flex: 1 1 auto; 
    position: relative;
    overflow-y: auto;
    
    &::-webkit-scrollbar-track
    {
        background-color: #F5F5F5;
    }
        
    &::-webkit-scrollbar
    {
        width: 13px;
        background-color: #F5F5F5;
        border: 1px solid #000;
    }
        
    &::-webkit-scrollbar-thumb
    {
        background-color: #cccccc;
    }
`;


export default function (props) {
    return (
        <FullPage>
            <Header>
                <MainBar />
            </Header>
            <Body>
            {props.children}
            </Body>
        </FullPage>
    );
}
