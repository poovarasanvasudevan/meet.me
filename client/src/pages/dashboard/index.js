import React from 'react';
import SkeletonV2 from '../../components/SkeletonV2';
import {Box, Flex} from "@rebass/grid";
import Page from '@atlaskit/page';
import Calendar from '@atlaskit/calendar';
import {Divider} from "../../components/util";

export default function (props) {

    const log = msg => e => console.log(msg, e);
    return (
        <SkeletonV2
            containerNavigation={() => null}
            productNavigation={() => null}
            navWidth={0}
        >
            <Page className={'h100'}>

                <div style={{display:'flex' , flexDirection:'row'}} className={'h100'}>
                    <Box style={{flex:1}}>
                        <h1>Hello</h1>
                    </Box>
                    <Box p={'10px'} style={{borderLeft:'1px solid #eaeaea'}}>
                        <Calendar
                            innerProps={{
                                style: {

                                },
                            }}
                            onBlur={log('blur')}
                            onChange={log('change')}
                            onFocus={log('focus')}
                            onSelect={log('select')}
                        />
                        <Divider/>
                    </Box>
                </div>
            </Page>

        </SkeletonV2>
    );
}
