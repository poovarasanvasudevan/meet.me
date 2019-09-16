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
import {Button} from "@atlaskit/button/dist/cjs/components/Button";

const Card = styled.div`
    background-color : white;
    padding : 20px;
    border-radius : 3px;
`;

const VCard = styled.div`
    padding : 5px;
    font-size: 0.9em;
    font-style: inherit;
   
    color: #6B778C;
    font-weight: 600;
    margin-top: 16px;
    font-weight: normal;
    
    margin-top: 10px;
    
`;

const HeadingComponent = styled.div`
    margin-top: 40px;
`;

const Heading = styled.div`
    font-size: 70px;
    color : #fff;
    font-family : consolas;
`;
const BasePage = (props) => {
    const {Parse} = React.useContext(AppContext);

    const loginHandler = () => {

    };

    return (
        <Base>
            <style dangerouslySetInnerHTML={{__html: `body { background-color: ${Color.primaryColor}`}}/>
            <Flex>

                <div>
                    <Button appearance={"subtle"}>Login</Button>
                </div>
                <center style={{flex: 1, marginTop: 30}}>
                    <HeadingComponent>


                        <div>
                            <Heading>meet.me</Heading>

                            <div>
                                <p style={{color: '#fff', fontFamily: 'consolas'}}>Components, tools and communication
                                    that organization needs</p>
                            </div>
                        </div>


                    </HeadingComponent>
                </center>

            </Flex>

        </Base>

    );
};

export default BasePage;
