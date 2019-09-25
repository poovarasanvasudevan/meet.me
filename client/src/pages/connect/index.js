import React from 'react';
import {Flex, Box} from "@rebass/grid";
import Page from '@atlaskit/page';
import Avatar, {AvatarItem, Skeleton} from '@atlaskit/avatar';
import AppContext from "../../module/AppContext";
import {If, Then, Else} from 'react-if';
import {MentionItem} from "@atlaskit/mention";
import {IPersonaSharedProps, Persona, PersonaSize, PersonaPresence} from 'office-ui-fabric-react/lib/Persona';

export default function (props) {
    const [user, setUser] = React.useState(null);
    const {Parse} = React.useContext(AppContext);

    React.useEffect(() => {
        const currentUser = Parse.User.current();
        if(currentUser) {
            const profile = currentUser.get('profile');
            profile
                .fetch()
                .then((data) => setUser(currentUser));
        }
    }, []);

    return (
        <Page>
            <Flex className={'h100'}>
                <Box width={'350px'} className={'h100'} style={{backgroundColor: '#EDEEF0'}}>
                    <If condition={user == null}>
                        <Then>
                            <Skeleton appearance={"square"} size={"medium"} weight={"normal"}/>
                        </Then>
                        <Else>
                            <div style={{padding: '10px'}}>
                                <MentionItem mention={{
                                    avatarUrl: user ? user.get('profile').get('avatar').url() : null,
                                    presence: "online",
                                    nickname: user ? user.get('username') : null,
                                    name: user ? user.get('first_name') : null
                                }}/>

                            </div>
                        </Else>
                    </If>

                </Box>
                <Box width={9.5 / 10} className={'h100'}></Box>
                <Box width={0.5 / 10} className={'h100'} style={{backgroundColor: '#EDEEF0'}}></Box>
            </Flex>

        </Page>
    );
}
