import React from 'react';
import Page from "@atlaskit/page";
import {BreadcrumbsStateless, BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import {Box} from "@rebass/grid";
import {RouterLink} from "../../components/theme/link";

const breadcrumbs = (
    <BreadcrumbsStateless onExpand={() => {
    }}>
        <BreadcrumbsItem text="Home" key="home" component={RouterLink} href={'/home'}/>
        <BreadcrumbsItem text="Knowledge Base" key="Knowledge Base" component={RouterLink} href={'#'}/>
    </BreadcrumbsStateless>
);

export default function (props) {
    return (
        <Page className={"h100"}>
            <div
                style={{display: "flex", flexDirection: "row"}}
                className={"h100"}>
                <Box style={{flex: 1}} p={'8px'}>
                    <PageHeader breadcrumbs={breadcrumbs}>
                        Knowledge Base
                    </PageHeader>
                </Box>
            </div>
        </Page>
    );
}
