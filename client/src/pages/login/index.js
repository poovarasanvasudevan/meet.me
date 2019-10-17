import React from 'react';
import {Flex, Box} from "@rebass/grid";
import styled, {css} from 'styled-components';
import Base from '../../components/Base';
import logo from '../../img/logo_black.svg';
import AppContext from '../../module/AppContext';
import {Separator} from 'office-ui-fabric-react/lib/Separator';

import Form, {
    FormFooter, Field,
    HelperMessage,
} from '@atlaskit/form';
import {ThemedButton} from "../../components/theme/button";
import Color from "../../components/theme/color";
import {FaFacebookSquare, FaGoogle, FaGithub, FaQrcode} from 'react-icons/fa';
import Icon from '@atlaskit/icon';
import {MLink} from "../../components/theme/link";
import {FormFieldWithProps, MTextBox} from "../../components/util";
import {Button} from "@atlaskit/button/dist/cjs/components/Button";
import SectionMessage from '@atlaskit/section-message';
import {PrimaryButton} from 'office-ui-fabric-react';

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


const Card = styled.div`
    background-color : white;
    padding : 20px;
    border-radius : 3px;
`;


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
            <style dangerouslySetInnerHTML={{__html: `body { background-color: #F8F8F8`}}/>
            <div>
                <Flex>
                    <Box width={3.5 / 10}/>
                    <Box width={3 / 10}>
                        <Card elevation={1} style={{
                            marginTop: '30%',
                            paddingTop: '40px',
                            paddingBottom: '40px',
                            border: '1px solid #eaeaea'
                        }}>
                            <Flex>
                                <Box width={1.1 / 10}/>
                                <Box width={7.8 / 10} p={2}>

                                    <img src={logo} alt={'Logo'} height={50}/>
                                    {loginError.status ?
                                        <SectionMessage appearance="error">{loginError.error}</SectionMessage> : null}

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
                                                    <MLink to={'/forget-password'}>
                                                        <Button appearance="subtle">Forget Password</Button>

                                                    </MLink>


                                                    <PrimaryButton type={'submit'}>Login</PrimaryButton>
                                                </FormFooter>
                                            </form>
                                        )}
                                    </Form>
                                    <Separator>
                                        <h3>Or</h3>
                                    </Separator>
                                    <div>
                                        <center>
                                            <SocialButton fgcolor={'#fff'}
                                                          bgcolor={'#db3236'}
                                                          iconBefore={<Icon glyph={() => <FaGoogle/>}
                                                                            label="Custom icon"
                                                                            size="small"/>}>Google
                                            </SocialButton>
                                            <SocialButton fgcolor={'#fff'} bgcolor={'#3b5998'}
                                                          iconBefore={<Icon glyph={() => <FaFacebookSquare/>}
                                                                            label="Custom icon"
                                                                            size="small"/>}>Facebook
                                            </SocialButton>
                                            <SocialButton
                                                iconBefore={<Icon glyph={() => <FaGithub/>} label="Custom icon"
                                                                  size="small"/>}> Github</SocialButton>
                                            <MLink to={'/qr'}>
                                                <SocialButton
                                                    fgcolor={'#fff'}
                                                    bgcolor={'green'}
                                                    iconBefore={<Icon glyph={() => <FaQrcode/>} label="Custom icon"
                                                                      size="small"/>}>
                                                    QrCode
                                                </SocialButton>
                                            </MLink>
                                        </center>
                                    </div>
                                </Box>
                                <Box width={1.1 / 10}/>
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
