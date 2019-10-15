import React from 'react';
import {BreadcrumbsStateless, BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import {MLink, RouterLink} from "../../components/theme/link";

import TemplateRendering from '../../components/template-rendering';
import {useBaseStateValue} from "../../components/context";
import styled from "styled-components";
import { PrimaryButton} from "office-ui-fabric-react";
import {ButtonGroup} from "@atlaskit/button";


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
        <BreadcrumbsItem href="#" text="Workflow" key="Workflow" component={RouterLink}/>
    </BreadcrumbsStateless>
);

export default function (props) {
    const [{template}, dispatch] = useBaseStateValue();

    const actions = (
        <ButtonGroup>
            <MLink to={'/workflow/new'}>
                <PrimaryButton text="New Flow"/>
            </MLink>
        </ButtonGroup>
    );

    return (

        <TemplateRendering template={template}>
            <FullPage>
                <Header>
                    <PageHeader breadcrumbs={breadcrumbs} actions={actions}>
                        Workflow
                    </PageHeader>
                </Header>
                <Body>

                </Body>
            </FullPage>
        </TemplateRendering>
    );
}
