import React from 'react';
import {Flex, Box} from "@rebass/grid";
import styled, {css} from 'styled-components';
import Base from '../../components/Base';
import logo from '../../img/logo_black.svg';
import AppContext from '../../module/AppContext';

import Form, {
    FormFooter, Field,
    HelperMessage,
} from '@atlaskit/form';
import {ThemedButton, AppButton} from "../../components/theme/button";
import Color from "../../components/theme/color";
import {FaFacebookSquare, FaGoogle, FaGithub, FaQrcode} from 'react-icons/fa';
import InlineMessage from '@atlaskit/inline-message';
import Icon from '@atlaskit/icon';
import {AppTextField} from "../../components/theme/textfield";
import {Link} from 'react-router-dom';

const SocialButton = styled(ThemedButton)`
    
    margin:5px;
    border: 1px solid #eaeaea;
    
    && {
         ${props => props.bgcolor && css`background-color : ${props => props.bgcolor} !important;`}
         ${props => props.fgcolor && css`color : ${props => props.fgcolor} !important;`}
         
         border-radius : 3px;
         font-size: 13px;
         height: 32px;
         
         padding-left : 8px;
         padding-right : 8px;
    }
`;

const MTextBox = styled(AppTextField)`
   
`;


const Card = styled.div`
    background-color : white;
    padding : 20px;
    border-radius : 3px;
`;


const FormFieldWithProps = (props) => {
    return (
        <React.Fragment>
            <MTextBox autoComplete={'off'} {...props.fieldProps} />
            {!props.error && !props.valid && (
                <HelperMessage>
                    Should be more than 4 characters
                </HelperMessage>
            )}
        </React.Fragment>
    );
};

const Login = (props) => {
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

                                <img src={logo} alt={'Logo'} height={50}/>
                                {loginError.status ? <InlineMessage title={loginError.error} type="error"/> : null}

                                <Form onSubmit={loginHandler} style={{marginTop: '30px'}}>

                                    {({formProps}) => (
                                        <form {...formProps}>

                                            <Field label={'Username'} name="username" defaultValue="" isRequired
                                                   autoComplete={'off'}>
                                                {({fieldProps, error, valid}) => <FormFieldWithProps
                                                    fieldProps={fieldProps} error={error} valid={valid}/>}
                                            </Field>

                                            <Field label={'Password'} name="password" defaultValue="" isRequired>
                                                {({fieldProps, error, valid}) => <MTextBox
                                                    type={'password'} {...fieldProps} />}
                                            </Field>
                                            <FormFooter>
                                                <AppButton type="submit" primary={'true'}>
                                                    Login
                                                </AppButton>
                                            </FormFooter>
                                        </form>
                                    )}
                                </Form>
                                <div style={{marginTop: '20px'}}>
                                    <center>
                                        <SocialButton fgcolor={'#fff'} bgcolor={'#db3236'}
                                                      iconBefore={<Icon glyph={() => <FaGoogle/>}
                                                                        label="Custom icon"
                                                                        size="small"/>}>Google</SocialButton>
                                        <SocialButton fgcolor={'#fff'} bgcolor={'#3b5998'}
                                                      iconBefore={<Icon glyph={() => <FaFacebookSquare/>}
                                                                        label="Custom icon"
                                                                        size="small"/>}>Facebook</SocialButton>
                                        <SocialButton iconBefore={<Icon glyph={() => <FaGithub/>} label="Custom icon"
                                                                        size="small"/>}> Github</SocialButton>
                                        <SocialButton
                                            href={'/qr'}
                                            fgcolor={'#fff'}
                                            bgcolor={'green'}
                                            iconBefore={<Icon glyph={() => <FaQrcode/>} label="Custom icon" size="small"/>}>
                                            QrCode
                                        </SocialButton>
                                    </center>
                                </div>
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

export default Login;
