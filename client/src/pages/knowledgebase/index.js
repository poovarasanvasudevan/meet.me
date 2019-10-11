import React from 'react';
import Page from "@atlaskit/page";
import {BreadcrumbsStateless, BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import {Box} from "@rebass/grid";
import {RouterLink} from "../../components/theme/link";
import Button, {ButtonGroup} from "@atlaskit/button";
import DropdownMenu, {DropdownItemGroup, DropdownItem} from '@atlaskit/dropdown-menu';

const breadcrumbs = (
    <BreadcrumbsStateless onExpand={() => {
    }}>
        <BreadcrumbsItem text="Home" key="home" component={RouterLink} href={'/home'}/>
        <BreadcrumbsItem text="Knowledge Base" key="Knowledge Base" component={RouterLink} href={'#'}/>
    </BreadcrumbsStateless>
);

const actions = (
    <ButtonGroup>


        <DropdownMenu
            trigger="Choices"
            isCompact={true}
            triggerType="button"
            onOpenChange={e => console.log('dropdown opened', e)}
        >
            <DropdownItemGroup>
                <DropdownItem>Sydney</DropdownItem>
                <DropdownItem>Melbourne</DropdownItem>
            </DropdownItemGroup>
        </DropdownMenu>
        <Button appearance={'subtle'}>New Article</Button>
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
                        Knowledge Base
                    </PageHeader>
                </Box>
            </div>
        </Page>
    );
}
