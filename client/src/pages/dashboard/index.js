import React from "react";
import SkeletonV2 from "../../components/SkeletonV2";
import {Box} from "@rebass/grid";
import Page from "@atlaskit/page";
import Calendar from "@atlaskit/calendar";
import {Divider} from "../../components/util";
import AppContext from "../../module/AppContext";
import {
    ObjectResult,
    ResultItemGroup,
    PersonResult
} from "@atlaskit/quick-search";

import {Skeleton} from "@atlaskit/atlassian-switcher/dist/cjs/primitives";
import {If, Then, Else} from "react-if";
import moment from "moment";

export default function (props) {
    const log = msg => e => console.log(msg, e);
    const {Parse, Config} = React.useContext(AppContext);

    const [meetings, setMeetings] = React.useState([]);
    const [meetingLoading, setMeetingLoading] = React.useState(false);

    const fetchEvents = date => {
        setMeetingLoading(true);
        const currentUser = Parse.User.current();
        const Meetings = Parse.Object.extend("Meetings");

        const creatorQuery = new Parse.Query(Meetings);
        creatorQuery.equalTo("creator", currentUser);

        const memberQuery = new Parse.Query(Meetings);
        memberQuery.equalTo("members", currentUser);

        var start = new moment(date);
        start.startOf("day");
        var finish = new moment(start);
        finish.add(1, "day");

        const dateQuery = new Parse.Query(Meetings);
        dateQuery.greaterThanOrEqualTo("start_time", start.toDate());
        dateQuery.lessThan("createdAt", finish.toDate());

        const creatorAndMemberQuery = Parse.Query.or(creatorQuery, memberQuery);
        const mainQuery = Parse.Query.and(dateQuery, creatorAndMemberQuery);
        mainQuery.include("members");

        mainQuery.find().then(meeting => {
            setMeetingLoading(false);
            setMeetings(meeting);
        });
    };
    React.useEffect(() => {
        fetchEvents(new Date());
    }, []);


    const onDateChange = e => {
        fetchEvents(new Date(Date.parse(e.iso)));
    };

    return (

        <Page className={"h100"}>
            <div
                style={{display: "flex", flexDirection: "row"}}
                className={"h100"}
            >
                <Box style={{flex: 1}}>
                    <h1>Hello</h1>
                </Box>
                <Box p={"10px"} style={{borderLeft: "1px solid #eaeaea"}}>
                    <Calendar
                        innerProps={{
                            style: {}
                        }}
                        onBlur={log("blur")}
                        onChange={log("change")}
                        onFocus={log("focus")}
                        onSelect={onDateChange}
                    />
                    <Divider/>
                    <Box p={"8px"}>
                        <If condition={meetingLoading === true}>
                            <Then>
                                <Skeleton/>
                            </Then>
                            <Else>
                                <ResultItemGroup title="Meetings">
                                    <If condition={meetings.length === 0}>
                                        <Then>
                                            <p>No Meetings available</p>
                                        </Then>
                                        <Else>
                                            {meetings.map((v, i) => (
                                                <ObjectResult
                                                    resultId={"meetings"}
                                                    isCompact={true}
                                                    key={v.id}
                                                    containerName={
                                                        v.get("description") ? v.get("description") : null
                                                    }
                                                    objectKey={
                                                        v.get("start_time")
                                                            ? moment(v.get("start_time")).format("h:mm a")
                                                            : null
                                                    }
                                                    avatarUrl={
                                                        v.get("avatar")
                                                            ? v.get("avatar").url()
                                                            : Config.avatarUrl + "?text=" + v.get("title")
                                                    }
                                                    name={v.get("title")}
                                                />
                                            ))}
                                        </Else>
                                    </If>
                                </ResultItemGroup>
                            </Else>
                        </If>
                    </Box>
                </Box>
            </div>
        </Page>

    );
}
