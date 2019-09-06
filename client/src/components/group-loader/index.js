import React from "react";
import AppContext from "../../module/AppContext";
import {Item, ItemAvatar} from "@atlaskit/navigation-next";
import MoreIcon from '@atlaskit/icon/glyph/more-vertical';

const ConfiguredAvatar = itemState => (
    <ItemAvatar appearance="square" itemState={itemState} presence="online" size="small"/>
);

export default function GroupLoader(props) {
    const [myGroup, setMyGroup] = React.useState([]);
    const {Parse} = React.useContext(AppContext);

    React.useEffect(() => {
        async function fetchGroups() {
            const Schema = Parse.Object.extend("SpeakerGroup");
            const query = new Parse.Query(Schema);
            query.equalTo("ADMIN", props.currentUser);
            query.ascending('groupname');
            const results = await query.find();

            results.map(async (data, index) => {
                var members = data.get('members');
                data['mem'] = await members.query().find();
                setMyGroup(groupMember => [...groupMember, data]);
            });
        }

        fetchGroups();
    }, [props.currentUser]);

    return (
        <>
            {myGroup.map((data, index) => (
                <Item
                    key={data.id}
                    before={ConfiguredAvatar}
                 //   subText={data['mem'].length + ` members`}
                //    after={ ()=> <MoreIcon size={'small'}/>}
                    text={data.get('groupname')}/>
            ))}
        </>
    );
}
