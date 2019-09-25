import React from 'react';
import {BreadcrumbsItem, BreadcrumbsStateless} from "@atlaskit/breadcrumbs";
import {RouterLink} from "../../components/theme/link";
import Page from "@atlaskit/page";
import {Box} from "@rebass/grid";
import PageHeader from '@atlaskit/page-header';
import Button, {ButtonGroup} from "@atlaskit/button";
import {MLink} from "../../components/theme/link";
import {DefaultButton, PrimaryButton, Stack, IStackTokens} from 'office-ui-fabric-react';

const breadcrumbs = (
    <BreadcrumbsStateless onExpand={() => {
    }}>
        <BreadcrumbsItem text="Home" key="home" component={RouterLink} href={'/home'}/>
        <BreadcrumbsItem text="Blog" key="Blog" component={RouterLink} href={'#'}/>
    </BreadcrumbsStateless>
);


const actions = (
    <ButtonGroup>
        <MLink to={'/blog/new'}>
            <PrimaryButton text="New Post"/>
        </MLink>
    </ButtonGroup>

);
export default function (props) {
    return (
        <Page className={"h100"}>
            <div
                style={{display: "flex", flexDirection: "row"}}
                className={"h100"}>
                <Box style={{flex: 1}} p={'8px'}>
                    <PageHeader breadcrumbs={breadcrumbs} actions={actions}>
                        Blog , Comments and Likes
                    </PageHeader>
                </Box>
            </div>
        </Page>
    );
}
