import React from 'react';
import {Flex, Box} from "@rebass/grid";
import styled, {css} from 'styled-components';
import Base from '../../components/Base';
import logo from '../../img/logo_black.svg';
import AppContext from '../../module/AppContext';
import QR from 'qrcode.react';
import {GooglePlayButton} from "../../components/util";
import {MLink} from '../../components/theme/link';
import {If, Then, Else} from "react-if";
import PageSpinner from '../../components/page-spinner';

const Card = styled.div`
    background-color : white;
    border-radius : 3px;
    padding-left : 20px;
    padding-right : 20px;
    
    padding-top : 30px;
    padding-bottom : 30px;
    
    border : 1px solid #eaeaea;
`;


const QRCode = (props) => {
    const {Parse} = React.useContext(AppContext);

    const [loginDetected, setLoginDetected] = React.useState(false);
    const [qr, setQr] = React.useState(null);
    const [session, setSession] = React.useState(null);


    let sfun = null;


    const subscriptionFun = (qr) => {
        let query = new Parse.Query('QRLogin');

        query.equalTo('code', qr.qrcode);

        query.subscribe().then((sub) => {
            sfun = sub;
            sfun.on('update', (qdata) => {
                setSession(qdata);

                setLoginDetected(true);

                Parse.Cloud.run('validate-qr-code', {qrid: qdata.id}).then((qrsession) => {
                    if (qrsession.get('session') != null) {

                        Parse
                            .User
                            .become(qrsession.get('session').get('sessionToken'))
                            .then((user) => {
                                localStorage.setItem('loggedUser', JSON.stringify(user));
                                window.location.href = '/home';
                            });
                    }
                });
            });
        });

    };

    React.useEffect(() => {

        Parse.Cloud.run('generateQR', {})
            .then((data) => {
                setQr(data);
                console.log(data);
                subscriptionFun(data);
            });

        return () => {
            if (sfun !== null) {
                sfun.unsubscribe();
            }
        };

    }, []);

    return (
        <Base>
            <style dangerouslySetInnerHTML={{__html: `body { background-color: #f8f8f8;`}}/>
            <div>
                <Flex>
                    <Box width={3.5 / 10}/>
                    <Box width={3 / 10} p={2}>
                        <Card elevation={1} style={{marginTop: '30%'}}>
                            <Flex>
                                <Box width={1.2 / 10}/>
                                <Box width={7.6 / 10} p={2}>
                                    <MLink to={'/'}>
                                        <img src={logo} alt={'Logo'} height={50}/>
                                    </MLink>
                                    <center style={{marginTop: '20px'}}>
                                        <p><b>Scan from your mobile</b></p>
                                        <div>
                                            {qr && !loginDetected &&
                                            <QR value={qr.qrcode}
                                                size={256}
                                                level={'L'}
                                            />
                                            }
                                            {loginDetected &&
                                            <div style={{margin: 30, padding: 30}}>
                                                <PageSpinner/>
                                            </div>
                                            }
                                        </div>

                                        <p>
                                            To use this feature you need to install meet.me app from <b>play
                                            store</b> for android and <b>App store</b> for ios.
                                            And make sure your mobile device and computer are in same network
                                        </p>

                                        <div>
                                            <GooglePlayButton>Google Play</GooglePlayButton>
                                        </div>
                                    </center>
                                </Box>
                                <Box width={1.2 / 10}/>
                            </Flex>
                        </Card>
                    </Box>
                    <Box width={3.5 / 10}/>
                </Flex>
            </div>
        </Base>

    );
};

export default QRCode;
