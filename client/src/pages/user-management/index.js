import React from 'react';
import {BreadcrumbsStateless, BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import {RouterLink} from "../../components/theme/link";

import TemplateRendering from '../../components/template-rendering';
import {useBaseStateValue} from "../../components/context";
import styled from "styled-components";
import {ButtonGroup} from "@atlaskit/button";
import AppContext from "../../module/AppContext";
import Color from '../../components/theme/color';

const FullPage = styled.div`
    display : flex;
    flex-direction : column;
    height: 100%;
    width:100%;
`;

const Header = styled.div`
    flex: 0 0 auto;
    padding-left : 18px;
    padding-right : 18px;
`;
const Body = styled.div`
    flex: 1 1 auto; 
    position: relative;
    overflow-y: auto;
    padding-left : 10px;
    
    &::-webkit-scrollbar-track
    {
        background-color: #F5F5F5;
    }
        
    &::-webkit-scrollbar
    {
        width: 10px;
        background-color: #F5F5F5;
        border: 1px solid #000;
    }
        
    &::-webkit-scrollbar-thumb
    {
        background-color: #cccccc;
    }
`;

const breadcrumbs = (
    <BreadcrumbsStateless onExpand={() => {
    }}>
        <BreadcrumbsItem href="/home" text="Home" key="home" component={RouterLink}/>
        <BreadcrumbsItem href="#" text="User Management" key="User Management" component={RouterLink}/>
    </BreadcrumbsStateless>
);

const MSearchTextBox = styled.input`
    height: 30px;
    width: 100%;
    display: block;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 46px;
    color: #172B4D;
    border: 1px solid #EBECF0;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    
    &:focus, &:active {
     border-color: #66afe9;
    
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
       
    }
`;

export default function (props) {
    const [{template}, dispatch] = useBaseStateValue();

    const {Parse} = React.useContext(AppContext);

    const actions = (
        <ButtonGroup>


        </ButtonGroup>
    );


    React.useEffect(() => {

    }, []);

    return (

        <TemplateRendering template={template}>
            <FullPage>
                <Header>
                    <PageHeader breadcrumbs={breadcrumbs} actions={actions}>
                        User Management
                    </PageHeader>
                </Header>
                <Body>

                </Body>
            </FullPage>
        </TemplateRendering>
    );
}
