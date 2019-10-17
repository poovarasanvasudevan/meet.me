import React from 'react';
import {Flex, Box} from "@rebass/grid";
import styled, {css} from 'styled-components';
import AppContext from '../../module/AppContext';
import Color from "../../components/theme/color";
import Page, {Grid, GridColumn} from '@atlaskit/page';
import Avatar, {AvatarItem} from '@atlaskit/avatar';
import {
    FaTv,
    FaChartLine,
    FaDatabase,
    FaHammer,
    FaBell,
    FaBusinessTime,
    FaQuestionCircle,
    FaCode,
    FaMicroscope
} from 'react-icons/fa';
import {SquareIcon} from "../../components/util";
import TemplateRendering from "../../components/template-rendering";

const Card = styled.div`
    background-color : white;
    padding : 20px;
    border-radius : 3px;
    cursor: pointer;
    border : 1px solid #eaeaea;
    
    margin-top : 5px;
    margin-bottom : 5px;
`;


const HeadingComponent = styled.div`
    margin-top: 40px;
`;

const Heading = styled.div`
    font-size: 70px;
    color : #333333;
`;

const SecondaryText = styled.p`
    color: #6B778C;
    font-size: 0.90em;
`;


const FullPage = styled.div`
    display : flex;
    flex-direction : column;
    height: 100%;
    width:100%;
`;

const Header = styled.div`
    flex: 0 0 auto;
    padding-left : 18px;
    padding-right : 18px;
`;
const Body = styled.div`
    flex: 1 1 auto; 
    position: relative;
    overflow-y: auto;
    padding-left : 10px;
    
    &::-webkit-scrollbar-track
    {
        background-color: #F5F5F5;
    }
        
    &::-webkit-scrollbar
    {
        width: 10px;
        background-color: #F5F5F5;
        border: 1px solid #000;
    }
        
    &::-webkit-scrollbar-thumb
    {
        background-color: #cccccc;
    }
`;

const GridColumnDup = styled(GridColumn)`
  
    
`;
const BasePage = (props) => {
    const {Parse} = React.useContext(AppContext);

    const [application, setApplication] = React.useState([]);

    const loginHandler = () => {

    };

    React.useEffect(() => {
        const Application = Parse.Object.extend("Application");
        const query = new Parse.Query(Application);
        query.find().then((data) => setApplication(data));
    }, []);

    return (

        <TemplateRendering template={'white'}>

            <Page>
                <Grid>

                    <GridColumn medium={12}>
                        <center style={{flex: 1, marginTop: 30}}>
                            <HeadingComponent>


                                <div>
                                    <Heading>meet.me</Heading>

                                    <div>
                                        <p style={{color: '#999999'}}>Components, tools and
                                            communication
                                            that organization needs</p>
                                    </div>
                                </div>


                            </HeadingComponent>
                        </center>
                    </GridColumn>


                </Grid>

                <div style={{marginTop: 50}}>
                    <Grid layout={'fluid'}>
                        <GridColumnDup medium={3}>
                        </GridColumnDup>

                        <GridColumnDup medium={6}>
                            <Grid layout={'fluid'} spacing={'cosy'}>
                                {application.map((value, index) => (
                                    <GridColumnDup medium={2}>
                                        <Card>
                                            <Flex style={{flexDirection: 'column'}}>
                                                <AvatarItem
                                                    avatar={
                                                        <Avatar borderColor={'transparent'} size={'medium'}
                                                                src={value.get('icon').url()} key={value.id}/>
                                                    }
                                                    primaryText={value.get('name')}
                                                />
                                                <SecondaryText>
                                                    {value.get('description')}
                                                </SecondaryText>
                                            </Flex>
                                        </Card>
                                    </GridColumnDup>
                                ))}
                            </Grid>
                        </GridColumnDup>
                        <GridColumnDup medium={3}>
                        </GridColumnDup>
                    </Grid>
                </div>
            </Page>

        </TemplateRendering>

    );
};

export default BasePage;
