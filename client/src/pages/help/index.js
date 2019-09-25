import React from 'react';
import {LayoutManagerWithViewController, NavigationProvider} from '@atlaskit/navigation-next';
import {Search, Profile, Help, AtlassianNavigation} from '@atlaskit/atlassian-navigation';
import Avatar from '@atlaskit/avatar';
import TopBar from '../../components/top-bar'
const DefaultSearch = () => (
    <Search text="Search..." tooltip="Search"/>
);

const DefaultProfile = () => (
    <Profile
        icon={<Avatar src={null}/>}
        tooltip="Your profile and settings"
    />
);

const DefaultHelp = () => <Help tooltip="Help"/>;

const HelpAppBar = () => (
    <AtlassianNavigation
        primaryItems={null}
        renderAppSwitcher={null}
        renderCreate={null}
        renderHelp={DefaultHelp}
        renderNotifications={null}
        renderProductHome={null}
        renderProfile={DefaultProfile}
        renderSearch={DefaultSearch}
        renderSettings={null}
    />
);
const containerStyle = {
    padding: 40,
};
export default function (props) {
    return (<TopBar></TopBar>);
}
