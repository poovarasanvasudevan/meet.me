import React from 'react';
import {Flex, Box} from "@rebass/grid";
import styled, {css} from 'styled-components';
import Base from '../../components/Base';
import logo from '../../img/logo_black.svg';
import AppContext from '../../module/AppContext';
import Color from "../../components/theme/color";
import {MLink} from '../../components/theme/link';


import Form, {
    FormFooter, Field,
    HelperMessage,
} from '@atlaskit/form';
import {FormFieldWithProps} from "../../components/util";
import {AppButton} from "../../components/theme/button";


const Card = styled.div`
    background-color : white;
    padding : 20px;
    border-radius : 3px;
`;
const QRCode = (props) => {
    const {Parse} = React.useContext(AppContext);

    const loginHandler = () => {

    };

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

                                    <Form onSubmit={loginHandler} style={{marginTop: '40px'}}>
                                        {({formProps}) => (
                                            <form {...formProps}>

                                                <Field label={'Email Address'} name="emailaddress" defaultValue=""
                                                       isRequired
                                                       autoComplete={'off'}>
                                                    {({fieldProps, error, valid}) => <FormFieldWithProps fieldProps={fieldProps} error={error} valid={valid} helper={'Primary Email address you used in meet.me'} />}
                                                </Field>

                                                <FormFooter>
                                                    <AppButton type="submit" primary={'true'}>
                                                        Submit
                                                    </AppButton>
                                                </FormFooter>
                                            </form>
                                        )}
                                    </Form>

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
