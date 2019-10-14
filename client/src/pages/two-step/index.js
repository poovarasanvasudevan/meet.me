import React from 'react';
import {Flex, Box} from "@rebass/grid";
import styled, {css} from 'styled-components';
import Base from '../../components/Base';
import logo from '../../img/logo_black.svg';
import AppContext from '../../module/AppContext';
import Color from "../../components/theme/color";
import {MLink} from '../../components/theme/link';

import { PrimaryButton} from 'office-ui-fabric-react';

import Form, {
    FormFooter, Field,
    HelperMessage,
} from '@atlaskit/form';
import {FormFieldWithProps} from "../../components/util";

const Card = styled.div`
    background-color : white;
    padding : 20px;
    border-radius : 3px;
`;

const VCard  = styled.div`
    padding : 5px;
    font-size: 0.9em;
    font-style: inherit;
   
    color: #6B778C;
    font-weight: 600;
    margin-top: 16px;
    font-weight: normal;
    
    margin-top: 10px;
    
`
const TwoStep = (props) => {
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
                                <Box width={7.5 / 10} p={2}>
                                    <MLink to={'/'}>
                                        <img src={logo} alt={'Logo'} height={50}/>
                                    </MLink>

                                    <Form onSubmit={loginHandler} style={{marginTop: '40px'}}>
                                        {({formProps}) => (
                                            <form {...formProps}>

                                                <Field label={'2-step Password'} name="2steppassword" defaultValue=""
                                                       isRequired
                                                       autoComplete={'off'}>
                                                    {({fieldProps, error, valid}) => <FormFieldWithProps fieldProps={fieldProps} error={error} valid={valid} helper={'Enter the Authentication code sent via email'} />}
                                                </Field>

                                                <VCard>
                                                    We just sent your authentication code via email to <b>p******@gmail.com</b>. The code will expire at 7:29AM IST.
                                                </VCard>

                                                <FormFooter>
                                                    <PrimaryButton type="submit">
                                                        Submit
                                                    </PrimaryButton>
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

export default TwoStep;
