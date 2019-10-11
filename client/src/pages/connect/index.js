import React from 'react';
import {Flex, Box} from "@rebass/grid";
import Page from '@atlaskit/page';
import { Skeleton} from '@atlaskit/avatar';

import {If, Then, Else} from 'react-if';
import {MentionItem} from "@atlaskit/mention";


import TemplateRendering from '../../components/template-rendering';
import {useBaseStateValue} from "../../components/context";

export default function (props) {
    const [{CurrentUser, template}, dispatch] = useBaseStateValue();
    return (
        <TemplateRendering template={template}>
            <Page>
                <Flex className={'h100'}>
                    <Box width={'350px'} className={'h100'} style={{backgroundColor: '#EDEEF0'}}>
                        <If condition={CurrentUser == null}>
                            <Then>
                                <Skeleton appearance={"square"} size={"medium"} weight={"normal"}/>
                            </Then>
                            <Else>
                                <div style={{padding: '10px'}}>
                                    <MentionItem mention={{
                                        avatarUrl: CurrentUser ? CurrentUser.get('profile').get('avatar').url() : null,
                                        presence: "online",
                                        nickname: CurrentUser ? CurrentUser.get('username') : null,
                                        name: CurrentUser ? CurrentUser.get('first_name') : null
                                    }}/>

                                </div>
                            </Else>
                        </If>

                    </Box>
                    <Box width={9.5 / 10} className={'h100'}></Box>
                    <Box width={0.5 / 10} className={'h100'} style={{backgroundColor: '#EDEEF0'}}></Box>
                </Flex>

            </Page>
        </TemplateRendering>
    );
}
