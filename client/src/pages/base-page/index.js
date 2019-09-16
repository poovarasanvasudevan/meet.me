import React from 'react';
import {Flex, Box} from "@rebass/grid";
import styled, {css} from 'styled-components';
import Base from '../../components/Base';
import logo from '../../img/logo_black.svg';
import AppContext from '../../module/AppContext';
import Color from "../../components/theme/color";
import {Button} from "@atlaskit/button/dist/cjs/components/Button";
import Page, {Grid, GridColumn} from '@atlaskit/page';
import {AvatarItem} from '@atlaskit/avatar';
import {FaTv, FaChartLine, FaDatabase, FaHammer, FaBell, FaBusinessTime,FaQuestionCircle, FaCode, FaMicroscope} from 'react-icons/fa';
import {SquareIcon} from "../../components/util";

const Card = styled.div`
    background-color : white;
    padding : 20px;
    border-radius : 3px;
    cursor: pointer;
`;


const HeadingComponent = styled.div`
    margin-top: 40px;
`;

const Heading = styled.div`
    font-size: 70px;
    color : #fff;
    font-family : consolas;
`;

const SecondaryText = styled.p`
    color: #6B778C;
    font-size: 0.90em;
`;
const BasePage = (props) => {
    const {Parse} = React.useContext(AppContext);

    const loginHandler = () => {

    };

    return (
        <Base>
            <style dangerouslySetInnerHTML={{__html: `body { background-color: ${Color.primaryColor}`}}/>


            <Page>
                <Grid>

                    <GridColumn medium={12}>
                        <center style={{flex: 1, marginTop: 30}}>
                            <HeadingComponent>


                                <div>
                                    <Heading>meet.me</Heading>

                                    <div>
                                        <p style={{color: '#fff', fontFamily: 'consolas'}}>Components, tools and
                                            communication
                                            that organization needs</p>
                                    </div>
                                </div>


                            </HeadingComponent>
                        </center>
                    </GridColumn>


                </Grid>

                <div style={{marginTop: 50}}>
                    <Grid>
                        <GridColumn medium={4}>
                            <Card>
                                <Flex style={{flexDirection: 'column'}}>
                                    <AvatarItem
                                        avatar={
                                            <SquareIcon bgcolor={Color.red} style={{borderRadius: 3}}>
                                                <FaTv color={'#fff'}/>
                                            </SquareIcon>
                                        }
                                        primaryText={'Cloud Meetings'}
                                    />
                                    <SecondaryText>
                                        Communicate People, sharing text, video and audio, make audio/video calls
                                    </SecondaryText>
                                </Flex>
                            </Card>
                        </GridColumn>
                        <GridColumn medium={4}>
                            <Card>
                                <Flex style={{flexDirection: 'column'}}>
                                    <AvatarItem
                                        avatar={
                                            <SquareIcon bgcolor={Color.green} style={{borderRadius: 3}}>
                                                <FaChartLine color={'#fff'}/>
                                            </SquareIcon>
                                        }
                                        primaryText={'Analytics'}
                                    />

                                    <SecondaryText>
                                        Realtime analytics with dashboard, we also provide sdk for android, ios and web to track events and other
                                    </SecondaryText>
                                </Flex>
                            </Card>
                        </GridColumn>

                        <GridColumn medium={4}>
                            <Card>
                                <Flex>
                                    <AvatarItem
                                        avatar={
                                            <SquareIcon bgcolor={Color.blue} style={{borderRadius: 3}}>
                                                <FaDatabase color={'#fff'}/>
                                            </SquareIcon>
                                        }
                                        primaryText={'Storage'}
                                    />
                                </Flex>
                            </Card>
                        </GridColumn>


                    </Grid>
                </div>

                <div style={{marginTop: 10}}>
                    <Grid>
                        <GridColumn medium={4}>
                            <Card>
                                <Flex>
                                    <AvatarItem
                                        avatar={
                                            <SquareIcon bgcolor={Color.primaryColor} style={{borderRadius: 3}}>
                                                <FaHammer color={'#fff'}/>
                                            </SquareIcon>
                                        }
                                        primaryText={'Background Jobs'}
                                    />
                                </Flex>
                            </Card>
                        </GridColumn>


                        <GridColumn medium={4}>
                            <Card>
                                <Flex>
                                    <AvatarItem
                                        avatar={
                                            <SquareIcon bgcolor={Color.desire} style={{borderRadius: 3}}>
                                                <FaBell color={'#fff'}/>
                                            </SquareIcon>
                                        }
                                        primaryText={'Push Notification'}
                                    />
                                </Flex>
                            </Card>
                        </GridColumn>


                        <GridColumn medium={4}>
                            <Card>
                                <Flex>
                                    <AvatarItem
                                        avatar={
                                            <SquareIcon bgcolor={Color.livid} style={{borderRadius: 3}}>
                                                <FaBusinessTime color={'#fff'}/>
                                            </SquareIcon>
                                        }
                                        primaryText={'Realtime database'}
                                    />
                                </Flex>
                            </Card>
                        </GridColumn>
                    </Grid>
                </div>


                <div style={{marginTop: 10}}>
                    <Grid>
                        <GridColumn medium={4}>
                            <Card>
                                <Flex>
                                    <AvatarItem
                                        avatar={
                                            <SquareIcon bgcolor={Color.torquiose} style={{borderRadius: 3}}>
                                                <FaMicroscope color={'#fff'}/>
                                            </SquareIcon>
                                        }
                                        primaryText={'Run Microservices'}
                                    />
                                </Flex>
                            </Card>
                        </GridColumn>


                        <GridColumn medium={4}>
                            <Card>
                                <Flex>
                                    <AvatarItem
                                        avatar={
                                            <SquareIcon bgcolor={Color.purple} style={{borderRadius: 3}}>
                                                <FaCode color={'#fff'}/>
                                            </SquareIcon>
                                        }
                                        primaryText={'Integration & SDK'}
                                    />
                                </Flex>
                            </Card>
                        </GridColumn>


                        <GridColumn medium={4}>
                            <Card>
                                <Flex>
                                    <AvatarItem
                                        avatar={
                                            <SquareIcon bgcolor={Color.reg} style={{borderRadius: 3}}>
                                                <FaQuestionCircle color={'#fff'}/>
                                            </SquareIcon>
                                        }
                                        primaryText={'Help & Support'}
                                    />
                                </Flex>
                            </Card>
                        </GridColumn>
                    </Grid>
                </div>
            </Page>

        </Base>

    );
};

export default BasePage;
