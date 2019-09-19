import React from 'react';
import Page from "@atlaskit/page";
import {BreadcrumbsStateless, BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import {RouterLink} from "../../components/theme/link";

import {Box} from "@rebass/grid";


const breadcrumbs = (
    <BreadcrumbsStateless onExpand={() => {
    }}>
        <BreadcrumbsItem href="/home" text="Home" key="home" component={RouterLink}/>
        <BreadcrumbsItem href="#" text="Notifications" key="Notificaitions" component={RouterLink}/>
    </BreadcrumbsStateless>
);

export default function (props) {
    return (
        <Page className={"h100"}>
            <div
                style={{display: "flex", flexDirection: "row"}}
                className={"h100"}
            >
                <Box style={{flex: 1}} p={'8px'}>
                    <PageHeader breadcrumbs={breadcrumbs}>
                        Notifications
                    </PageHeader>
                </Box>
            </div>
        </Page>
    );
}
