import React from 'react';
import {Flex, Box} from "@rebass/grid";
import styled, {css} from 'styled-components';
import Base from '../../components/Base';
import logo from '../../img/logo_black.svg';
import AppContext from '../../module/AppContext';
import Color from "../../components/theme/color";
import QR from 'qrcode.react';
import {GooglePlayButton} from "../../components/util";
import {MLink} from '../../components/theme/link';

const Card = styled.div`
    background-color : white;
    padding : 20px;
    border-radius : 3px;
`;


const QRCode = (props) => {
    const {Parse} = React.useContext(AppContext);

    const [loginError, setLoginError] = React.useState({status: false, error: ""});
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

    const loginHandler = async (data) => {
        try {
            const currentUser = await Parse.User.logIn(data.username, data.password);
            localStorage.setItem('loggedUser', JSON.stringify(currentUser));
            setRedirectToReferrer(true);
        } catch (e) {
            setLoginError({status: true, error: e.message});
        }
    };

    React.useEffect(() => {
        const {from} = props.location.state || {from: {pathname: '/home'}};
        if (redirectToReferrer === true) {
            window.location.href = from.pathname;
        }
    });

    return (
        <Base>
            <style dangerouslySetInnerHTML={{__html: `body { background-color: ${Color.primaryColor}`}}/>
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
                                            <QR value="http://facebook.github.io/react/"
                                                size={256}
                                                level={'H'}
                                            />
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
