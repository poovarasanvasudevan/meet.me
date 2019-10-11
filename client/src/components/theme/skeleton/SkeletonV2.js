import React from 'react';
import Base from '../../Base';
import {colors} from "@atlaskit/theme";
import {
    GlobalItem,
    GlobalNav,
    LayoutManager,
    modeGenerator,
    NavigationProvider,
    ThemeProvider,
} from '@atlaskit/navigation-next';
import AppContext from "../../../module/AppContext";
import SpeakerLogo from "../../../img/speaker.png";
import {DropdownItem, DropdownItemGroup, DropdownMenuStateless} from "@atlaskit/dropdown-menu";
import Avatar from "@atlaskit/avatar";
import {
    SwitcherWrapper,
    SwitcherItem,
    Section,
    Skeleton,
} from '@atlaskit/atlassian-switcher/dist/cjs/primitives';

import {Flex, Box} from "@rebass/grid";
import Modal, {ModalTransition} from '@atlaskit/modal-dialog';
import Drawer from '@atlaskit/drawer';
import styled from "styled-components";
import {If, Then, Else} from 'react-if';

import {IoIosAdd, IoIosSearch, IoIosHelpCircle, IoIosNotifications, IoIosApps, IoIosPeople} from 'react-icons/io';
import {AppTextField} from '../textfield';
import {Field,} from '@atlaskit/form';
import {ResultItemGroup, PersonResult} from '@atlaskit/quick-search';
import Color from '../color';


import {
    withRouter
} from 'react-router-dom';
import {useBaseStateValue} from "../../context";

const customMode = modeGenerator({
    product: {
        text: colors.N0,
        background: Color.primaryColor,
    },
});


class GlobalItemWithDropdown extends React.Component {
    state = {
        isOpen: false,
    };

    handleOpenChange = ({isOpen}) => this.setState({isOpen});

    render() {
        const {items, trigger: Trigger} = this.props;
        const {isOpen} = this.state;
        return (
            <DropdownMenuStateless
                boundariesElement="window"
                isOpen={isOpen}
                onOpenChange={this.handleOpenChange}
                position="right bottom"
                trigger={<Trigger isOpen={isOpen}/>}
            >
                {items}
            </DropdownMenuStateless>
        );
    }
}


const ItemComponent = ({dropdownItems: DropdownItems, ...itemProps}) => {
    if (DropdownItems) {
        return (
            <GlobalItemWithDropdown
                trigger={({isOpen}) => (
                    <GlobalItem isSelected={isOpen} {...itemProps} />
                )}
                items={<DropdownItems/>}
            />
        );
    }
    return <GlobalItem {...itemProps} />;
};


const IApplicationLoader = withRouter((props) => {

    const [{CurrentUser}, dispatch] = useBaseStateValue();
    const [applications, setApplications] = React.useState([]);

    React.useEffect(() => {
        if (CurrentUser != null) {

            CurrentUser
                .get('application')
                .query()
                .find()
                .then((data) => setApplications(data));
        }

    }, [CurrentUser]);

    return (
        <SwitcherWrapper>
            <If condition={applications.length > 0}>
                <Then>
                    <Box p={'8px'}>
                        <Section sectionId="application-section" title="Applications">
                            {applications.map((value, index) => (

                                <SwitcherItem
                                    onClick={() => (value.get('url') && value.get('url') !== '') ? props.history.push(value.get('url')) : null}
                                    description={value.get('description')}
                                    icon={<Avatar borderColor={'transparent'} size={'medium'}
                                                  src={value.get('icon').url()}/>} key={value.id}>
                                    {value.get('name')}
                                </SwitcherItem>

                            ))}
                        </Section>
                    </Box>
                </Then>
                <Else>
                    <Skeleton/>
                </Else>
            </If>
        </SwitcherWrapper>
    );

});


const IPeopleLoader = (props) => {
    const {Parse} = React.useContext(AppContext);
    const [people, setPeople] = React.useState([]);

    React.useEffect(() => {
        const Users = Parse.Object.extend("User");
        const query = new Parse.Query(Users);
        query.include("profile");
        query.find().then((data) => setPeople(data));
    }, []);

    const ItemWrapper = props => (
        <div css={{margin: '4px 0', width: '200px'}} {...props} />
    );
    return (
        <SwitcherWrapper>
            <If condition={people.length > 0}>
                <Then>
                    <Box p={'8px'}>
                        <ResultItemGroup title="Users">
                            {people.map((value, index) => (
                                <PersonResult
                                    resultId={'users'}
                                    key={value.id}
                                    avatarUrl={value ? value.get('profile').get('avatar').url() : null}
                                    presenceMessage={'@' + value.get('first_name').toLowerCase()}
                                    name={value ? value.get('first_name') + ' ' + value.get('last_name') : 'User'}
                                    presenceState="online"
                                />
                            ))}
                        </ResultItemGroup>
                    </Box>
                </Then>
                <Else>
                    <Skeleton/>
                </Else>
            </If>
        </SwitcherWrapper>
    );

};

const GlobalNavWithModalsAndDrawers = withRouter((props) => {

    const [{CurrentUser}, dispatch] = useBaseStateValue();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [isSwitcherDrawerOpen, setIsSwitcherDrawerOpen] = React.useState(false);
    const [isPeopleDrawerOpen, setIsPeopleDrawerOpen] = React.useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openLoginModal = () => setIsModalOpen(true);
    const closeLoginModal = () => setIsModalOpen(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const openNotification = () => props.history.push('/notifications');

    const openSwitcherDrawer = () => setIsSwitcherDrawerOpen(true);
    const closeSwitcherDrawer = () => setIsSwitcherDrawerOpen(false);

    const openPeopleDrawer = () => setIsPeopleDrawerOpen(true);
    const closePeopleDrawer = () => setIsPeopleDrawerOpen(false);
    const user = CurrentUser;
    const {Logout} = React.useContext(AppContext);


    return (
        <div className={'h100'}>
            <GlobalNav
                itemComponent={ItemComponent}
                primaryItems={[
                    {
                        icon: () => <img src={SpeakerLogo} alt={'Logo'} height={30} width={30}/>,
                        id: 'logo',
                        tooltip: 'Speaker',
                        onClick: () => console.log('Logo item clicked'),
                    },
                    {
                        icon: () => <IoIosAdd size={'1.6em'}/>,
                        id: 'create',
                        tooltip: 'Open a modal',
                        onClick: openModal,
                    },
                    {
                        icon: () => <IoIosSearch size={'1.6em'}/>,
                        id: 'search',
                        tooltip: 'Open a drawer',
                        onClick: openDrawer,
                    },
                ]}
                secondaryItems={[
                    {
                        icon: () => <IoIosPeople size={'1.6em'}/>,
                        id: 'people',
                        tooltip: 'People',
                        onClick: openPeopleDrawer
                    },
                    {
                        icon: () => <IoIosApps size={'1.6em'}/>,
                        id: 'apps',
                        tooltip: 'Applications',
                        onClick: openSwitcherDrawer
                    },
                    {
                        icon: () => <IoIosNotifications size={'1.6em'}/>,
                        id: 'notification',
                        tooltip: 'Notifications',
                        onClick: openNotification
                    },
                    {
                        icon: () => <IoIosHelpCircle size={'1.6em'}/>,
                        id: 'help',
                        tooltip: 'Open dropdown',
                        onClick: (event) => {
                            event.preventDefault();
                            window.open('/help', '_blank');
                        }
                    },
                    {
                        dropdownItems: () => (
                            <DropdownItemGroup>
                                <DropdownItem>Account Settings</DropdownItem>
                                <DropdownItem>Notification</DropdownItem>
                                <DropdownItem>Status</DropdownItem>
                                <DropdownItem>Input/Output device Settings</DropdownItem>
                                <DropdownItem>About</DropdownItem>
                                <DropdownItem onClick={Logout}>Logout</DropdownItem>
                            </DropdownItemGroup>
                        ),
                        icon: () => <Avatar name={user ? user.get('first_name') + ' ' + user.get('last_name') : 'User'}
                                            size="small"
                                            src={user ? user.get('profile').get('avatar').url() : null}
                                            presence="online"/>,
                        id: 'accounts',
                        tooltip: 'Accounts',
                    },
                ]}
            />

            <ModalTransition>
                {isModalOpen && (
                    <Modal
                        actions={[{text: 'Close', onClick: closeModal}]}
                        onClose={closeModal}
                        heading="Modal Title"
                    >
                        Modal content
                    </Modal>
                )}
            </ModalTransition>


            <ModalTransition>
                {isLoginModalOpen && (
                    <Modal
                        actions={[{text: 'Close', onClick: closeLoginModal}]}
                        onClose={closeLoginModal}
                        heading="Change Password"
                    >
                        Login Modal content
                    </Modal>
                )}
            </ModalTransition>


            <Drawer
                onClose={closePeopleDrawer}
                isOpen={isPeopleDrawerOpen}>
                <IPeopleLoader/>
                {/*<IApplicationLoader/>*/}
            </Drawer>


            <Drawer
                onClose={closeSwitcherDrawer}
                width={'medium'}
                isOpen={isSwitcherDrawerOpen}>

                <IApplicationLoader/>
            </Drawer>

            <Drawer onClose={closeDrawer} isOpen={isDrawerOpen} width="wide">
                <Box pl={'8px'} pr={'40px'}>
                    <div>
                        <Field name="search_query" defaultValue="" label="Search for People, Events, Channels">
                            {({fieldProps}) => <AppTextField {...fieldProps} />}
                        </Field>
                    </div>
                </Box>
            </Drawer>
        </div>
    );

});

const StyleScroller = styled(Flex)`

    overflow-y: auto;
    
    &::-webkit-scrollbar-track
    {
        background-color: #F5F5F5;
    }
        
    &::-webkit-scrollbar
    {
        width: 13px;
        background-color: #F5F5F5;
        border: 1px solid #000;
    }
        
    &::-webkit-scrollbar-thumb
    {
        background-color: #cccccc;
    }
`;

export default function (props) {

    const navProps = {
        isResizeDisabled: true,
        productNavWidth: props.navWidth === undefined ? 300 : props.navWidth
    };


    return (
        <Base>
            <ThemeProvider theme={theme => ({...theme, mode: customMode})}>
                <NavigationProvider initialUIController={navProps}>
                    <LayoutManager
                        shouldHideGlobalNavShadow={true}
                        globalNavigation={() => (
                            <GlobalNavWithModalsAndDrawers />
                        )}
                        productNavigation={props.productNavigation}
                        containerNavigation={props.containerNavigation}>
                        <StyleScroller className={'h100'}>
                            {props.children}
                            {/*<NetworkMoniter style={{position: 'absolute', bottom: 0}}/>*/}
                        </StyleScroller>
                    </LayoutManager>
                </NavigationProvider>
            </ThemeProvider>
        </Base>
    );
}
