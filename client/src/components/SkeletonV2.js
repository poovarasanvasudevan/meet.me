import React from 'react';
import Base from './Base';
import {colors} from "@atlaskit/theme";
import {
    GlobalItem,
    GlobalNav,
    LayoutManager,
    modeGenerator,
    NavigationProvider,
    ThemeProvider,
    Item
} from '@atlaskit/navigation-next';
import AppContext from "../module/AppContext";
import SpeakerLogo from "../img/speaker.png";
import {DropdownItem, DropdownItemGroup, DropdownMenuStateless} from "@atlaskit/dropdown-menu";
import Avatar from "@atlaskit/avatar";
import {
    SwitcherWrapper,
    SwitcherItem,
    Section,
    ManageButton,
    Skeleton,
} from '@atlaskit/atlassian-switcher/dist/cjs/primitives';
import {MentionItem} from '@atlaskit/mention/item';

import {Flex, Box} from "@rebass/grid";
import Modal, {ModalTransition} from '@atlaskit/modal-dialog';
import Drawer from '@atlaskit/drawer';
import SpeakerNotification from './speaker-notification';
import styled from "styled-components";
import {If, Then, Else} from 'react-if';
import {Link} from "react-router-dom";
import {IoIosAdd, IoIosSearch, IoIosHelpCircle, IoIosNotifications, IoIosApps, IoIosPeople} from 'react-icons/io';

const customMode = modeGenerator({
    product: {
        text: colors.N0,
        background: '#053B8C',
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


const SwitcherIcon = styled.div`
    padding: 6px;
    border-radius: 4px;
    background : ${props => props.bgColor ? props.bgColor : '#3b5998'};
    margin-right : 8px;
`;

const MLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const ISwitcher = (props) => {


    const [channels, setChannels] = React.useState([]);

    const {Parse} = React.useContext(AppContext);
    React.useEffect(() => {
        const currentUser = Parse.User.current();
        currentUser.get('channels').query().find({
            success: function (list) {
                setChannels(list);
            }
        });
    }, []);

    return (
        <SwitcherWrapper>
            <If condition={channels.length > 0}>
                <Then>
                    <Section sectionId="first-section" title="Channels">
                        {channels.map((value, index) => (
                            <MLink key={value.id}>
                                <SwitcherItem>
                                    {value.get('name')}
                                </SwitcherItem>
                            </MLink>
                        ))}
                    </Section>
                </Then>
                <Else>
                    <Skeleton/>
                </Else>
            </If>
        </SwitcherWrapper>
    );

};


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
                        <Section sectionId="first-section" title="Users">
                            {people.map((value, index) => (
                                <MLink key={value.id}>
                                    <SwitcherItem
                                        icon={
                                            <Avatar
                                                name={value ? value.get('first_name') + ' ' + value.get('last_name') : 'User'}
                                                size="small"
                                                src={value ? value.get('profile').get('avatar').url() : null}
                                                presence="online"/>
                                        }>
                                        {value.get('first_name')}
                                    </SwitcherItem>
                                </MLink>
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

};

const GlobalNavWithModalsAndDrawers = (props) => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [isSwitcherDrawerOpen, setIsSwitcherDrawerOpen] = React.useState(false);
    const [isPeopleDrawerOpen, setIsPeopleDrawerOpen] = React.useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const openNotification = () => setIsNotificationOpen(true);
    const closeNotification = () => setIsNotificationOpen(false);


    const openSwitcherDrawer = () => setIsSwitcherDrawerOpen(true);
    const closeSwitcherDrawer = () => setIsSwitcherDrawerOpen(false);

    const openPeopleDrawer = () => setIsPeopleDrawerOpen(true);
    const closePeopleDrawer = () => setIsPeopleDrawerOpen(false);


    const {user} = props;

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
                        dropdownItems: () => (
                            <DropdownItemGroup title="Heading">
                                <DropdownItem onClick={openModal}>
                                    Open a modal
                                </DropdownItem>
                                <DropdownItem onClick={openDrawer}>
                                    Open a drawer
                                </DropdownItem>
                            </DropdownItemGroup>
                        ),
                        icon: () => <IoIosHelpCircle size={'1.6em'}/>,
                        id: 'help',
                        tooltip: 'Open dropdown',
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

            <SpeakerNotification
                open={isNotificationOpen}
                close={closeNotification}/>

            <Drawer
                onClose={closePeopleDrawer}
                isOpen={isPeopleDrawerOpen}>
                <IPeopleLoader/>
                {/*<ISwitcher/>*/}
            </Drawer>


            <Drawer
                onClose={closeSwitcherDrawer}
                isOpen={isSwitcherDrawerOpen}>

                <ISwitcher/>
            </Drawer>

            <Drawer onClose={closeDrawer} isOpen={isDrawerOpen} width="wide">
                <code>Drawer contents</code>
            </Drawer>
        </div>
    );

};

export default function (props) {

    const [user, setUser] = React.useState(null);
    const {Parse} = React.useContext(AppContext);

    const navProps = {
        isResizeDisabled: true,
        productNavWidth: props.navWidth === undefined ? 300 : props.navWidth
    };

    React.useEffect(() => {

        async function fetchUser() {

            var currentUser = Parse.User.current();
            var profile = currentUser.get('profile');
            await profile.fetch();

            setUser(currentUser);
        }

        fetchUser();

    }, []);

    return (
        <Base>
            <ThemeProvider theme={theme => ({...theme, mode: customMode})}>
                <NavigationProvider initialUIController={navProps}>
                    <LayoutManager
                        shouldHideGlobalNavShadow={true}
                        globalNavigation={() => (
                            <GlobalNavWithModalsAndDrawers user={user}/>
                        )}
                        productNavigation={props.productNavigation}
                        containerNavigation={props.containerNavigation}>
                        <Flex className={'h100'}>
                            {props.children}
                        </Flex>
                    </LayoutManager>
                </NavigationProvider>
            </ThemeProvider>
        </Base>
    );
}
