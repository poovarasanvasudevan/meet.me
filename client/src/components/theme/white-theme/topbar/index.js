import React from 'react';
import styled from 'styled-components';
import Color from '../../../theme/color';
import Logo from '../../../logo/new-logo';
import Avatar from '@atlaskit/avatar';
import {If, Then, Else} from 'react-if';
import {Flex, Box} from "@rebass/grid";
import {IoMdHelpCircleOutline, IoMdApps} from 'react-icons/io';
import InlineDialog from '@atlaskit/inline-dialog';
import {
    SwitcherItem
} from '@atlaskit/atlassian-switcher/dist/cjs/primitives';
import {SearchBox} from 'office-ui-fabric-react/lib/SearchBox';
import {useBaseStateValue} from "../../../context";

const MainBar = styled.div`
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 8px;
    padding-bottom: 4px;
   
    background: rgba(255,255,255,.97);
    box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);
    
    transition: top 0.2s ease-in-out    
    min-height: 35px;
`;

const MainBarAvatar = styled.div`
    float:right;
    padding: 6px;
`;

const MainAvatarOuter = styled.div`
    padding : 1px;
`;

const DefaultSearch = styled(SearchBox)`
    height: 32px;
    width: 220px;
    outline: none;
    background-color: white;
    color: #FFFFFF;
    margin-left : 10px;
    margin-right: 10px;
`;

const TempBox = styled.div`
    padding : 4px;
    margin-left : 6px;
    margin-right: 6px;
    cursor: pointer;
    border-radius: 3px;
    
    &:focus, &:hover, &:active {
        background : #eaeaea;
    }
   
`;

const CustomLogo = () => (
    <span>
        <Logo
            width={172}
            style={{paddingRight: 10, borderRight: "1px solid #eaeaea"}}
            color={Color.primaryColor}
        />
    </span>
);
export default function (props) {

    const [applications, setApplications] = React.useState(null);
    const [appsOpen, setAppsOpen] = React.useState(false);
    const [{CurrentUser}, dispatch] = useBaseStateValue();

    React.useEffect(() => {
        console.log("hell")
        if (CurrentUser != null) {

            CurrentUser
                .get('application').query().find()
                .then((data) => {
                    console.log(data)
                    setApplications(data)
                });
        }

    }, [CurrentUser]);

    const toggleApps = () => setAppsOpen(!appsOpen);

    const scrollContainer = {
        maxHeight: 'inherit',
        maxWidth: 'inherit',
        overflow: 'auto',
    };


    const oversizedStyles = {
        width: '280px',
    };
    const content = (
        <div style={scrollContainer} className={'scrl'}>
            <div style={oversizedStyles}>
                {applications && applications.map((value, index) => (

                    <SwitcherItem
                        onClick={() => (value.get('url') && value.get('url') !== '') ? props.history.push(value.get('url')) : null}
                        description={value.get('description')}
                        icon={<Avatar borderColor={'transparent'} size={'medium'}
                                      src={value.get('icon').url()}/>} key={value.id}>
                        {value.get('name')}
                    </SwitcherItem>

                ))}
            </div>
        </div>
    );
    return (
        <MainBar>
            <CustomLogo/>

            <MainBarAvatar>
                <Flex>

                    <TempBox><IoMdHelpCircleOutline size={24} color={'#333'}/></TempBox>
                    <If condition={CurrentUser !== null}>
                        <Then>
                            <TempBox>

                                <InlineDialog
                                    onClose={() => {
                                        setAppsOpen(false);
                                    }}
                                    placement={'bottom'}
                                    content={content}
                                    isOpen={appsOpen}
                                >
                                    <IoMdApps size={24} color={'#333'} onClick={toggleApps}/>
                                </InlineDialog>

                            </TempBox>
                        </Then>
                    </If>

                    <DefaultSearch
                        styles={{root: {width: 220, border: '1px solid #eaeaea'}}}
                        placeholder="Search..."
                        onEscape={ev => {
                            console.log('Custom onEscape Called');
                        }}
                        onClear={ev => {
                            console.log('Custom onClear Called');
                        }}
                        onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
                        onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
                        onFocus={() => console.log('onFocus called')}
                        onBlur={() => console.log('onBlur called')}
                    />


                    <If condition={CurrentUser !== null}>
                        <Then>
                            <MainAvatarOuter>
                                <Avatar
                                    name={CurrentUser ? CurrentUser.get('first_name') + ' ' + CurrentUser.get('last_name') : 'User'}
                                    size="small"
                                    src={CurrentUser ? CurrentUser.get('profile').get('avatar').url() : null}
                                />
                            </MainAvatarOuter>
                        </Then>
                    </If>
                </Flex>
            </MainBarAvatar>


        </MainBar>
    );
}
