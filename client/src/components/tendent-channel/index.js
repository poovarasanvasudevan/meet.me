import React from 'react';
import {ContainerHeader, ItemAvatar, Switcher} from "@atlaskit/navigation-next";
import ChevD from '@atlaskit/icon/glyph/chevron-down';
import AppContext from "../../module/AppContext";

export default function (props) {

    const {Parse} = React.useContext(AppContext);

    const [channels, setChannels] = React.useState([]);
    const [tendentSelected, setTendentSelected] = React.useState(null);

    const create = () => ({
        onClick: () => {
            // eslint-disable-next-line
            const boardName = window.prompt(
                'What would you like to call your new board?',
            );
            if (boardName && boardName.length) {
                // eslint-disable-next-line
                console.log(`You created the board "${boardName}"`);
            }
        },
        text: 'Create channel',
    });

    const target = ({id, subText, text, avatar}) => {
        const avatars = s => (
            <ItemAvatar
                appearance="square"
                href={null}
                isInteractive={false}
                itemState={s}
                src={avatar}
                onClick={null}
            />
        );

        return (
            <ContainerHeader
                before={avatars}
                after={ChevD}
                id={id}
                subText={subText}
                text={text}
            />
        );
    };

    const onChange = (selected) => {
        setTendentSelected(selected);
    };


    React.useEffect(() => {

        let isSubscribed = true;
        let mAll = [];

        async function fetchChannels() {
            if (isSubscribed) {
                var user = Parse.User.current();
                var tendentRelation = user.relation("tendent");
                var allTendent = await tendentRelation.query().find();

                allTendent.map(async (singleTendent) => {
                    var mChannel = await singleTendent.relation('tendent_channel')
                        .query()
                        .find();

                    var options = [];
                    mChannel.map((channel) => {
                        options.push({
                            id: channel.id,
                            text: channel.get('name'),
                            subText: channel.get('description'),
                            avatar: channel.get('avatar').url()
                        });
                    });

                    var mTendent = {
                        label: singleTendent.get('name'),
                        options: options
                    };

                    console.log(mTendent);
                    setChannels((existingChannel) => [...existingChannel, mTendent]);

                    if (!tendentSelected)
                        setTendentSelected(mTendent.options[0]);
                    mAll.push(mTendent);
                });
            }

        }

        fetchChannels();

        return () => (isSubscribed = false);
    }, []);


    const response = <Switcher
        create={create()}
        options={channels}
        onChange={onChange}
        target={tendentSelected ? target(tendentSelected) : null}
        value={tendentSelected ? tendentSelected : null}
    />;

    return tendentSelected ? response : null;
}
