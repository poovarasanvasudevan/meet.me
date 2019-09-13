import React from 'react';
import Button from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import {FaSignal, FaWifi, FaNetworkWired} from 'react-icons/fa';
import {
    ObjectResult,
    ResultItemGroup,
    PersonResult
} from "@atlaskit/quick-search";
import {If, Then, Else} from "react-if";
import {CircleIcon} from '../util';
import AppContext from "../../module/AppContext";
import Color from '../theme/color';

import {Flex, Box} from "@rebass/grid";

export default function (props) {

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [connectionParams, setConnectionParams] = React.useState([]);
    const [connectionStatus, setConnectionStatus] = React.useState('green');
    const [requestLog, setRequestLog] = React.useState(null);

    const {Parse} = React.useContext(AppContext);

    const content = (
        <Flex>
            <Box style={{width: 240}}>
                <ResultItemGroup title={'Request Info'}>
                    {requestLog && requestLog.map((v, i) => (
                        <If condition={v.value !== undefined} key={'rm' + i}>
                            <Then>
                                <ObjectResult resultId={'rinfo'}
                                              name={v.type}
                                              avatar={
                                                  <CircleIcon style={{height: '18px'}} bgcolor={Color.primaryColor}>
                                                      <FaNetworkWired color={'#fff'}/>
                                                  </CircleIcon>
                                              }
                                              objectKey={v.value}/>
                            </Then>
                        </If>
                    ))}
                </ResultItemGroup>
                <ResultItemGroup title={'Network Info'}>

                    {connectionParams.map((v, i) => (
                        <If condition={v.value !== undefined} key={'nm' + i}>
                            <Then>
                                <ObjectResult resultId={'ninfo'}
                                              name={v.type}
                                              avatar={
                                                  <CircleIcon style={{height: '18px'}} bgcolor={Color.primaryColor}>
                                                      <FaWifi color={'#fff'}/>
                                                  </CircleIcon>
                                              }
                                              objectKey={v.value}/>
                            </Then>
                        </If>
                    ))}

                </ResultItemGroup>
            </Box>
        </Flex>
    );
    const updateConnectionStatus = () => {
        setConnectionParams([
            {
                type: "Connection Type",
                value: navigator.connection.type
            },
            {
                type: "RTT",
                value: navigator.connection.rtt
            },
            {
                type: "Downlink",
                value: navigator.connection.downlink
            },
            {
                type: "Effective Type",
                value: navigator.connection.effectiveType
            },
        ]);


        if (/\slow-2g|2g|3g/.test(navigator.connection.effectiveType)) {
            setConnectionStatus('red');
        } else {
            setConnectionStatus('green');
        }


        if (window.performance) {
            const assetPerformanceArray = window.performance.getEntriesByType("resource");
        }
    };

    React.useEffect(() => {
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            connection.addEventListener('change', updateConnectionStatus, true);
            updateConnectionStatus();
        }

        Parse
            .Cloud
            .run("requestInfo", {})
            .then((data) => setRequestLog(data));

        return () => {
            if (connection) {
                connection.removeEventListener('change', updateConnectionStatus, true);
            }
        };
    }, []);


    return (<div style={{
        display: "flex",
        flex: "0 1 auto",
        alignSelf: "flex-end",
        position: "absolute",
        zIndex: 1,
        right: 0,

    }}>
        <InlineDialog
            onClose={() => setDialogOpen(false)}
            content={content}
            isOpen={dialogOpen}
            placement={'auto-end'}
        >
            <Button
                isSelected={dialogOpen}
                onClick={() => setDialogOpen(!dialogOpen)}
            >
                <FaSignal color={connectionStatus}/>
            </Button>
        </InlineDialog>
    </div>);
}
