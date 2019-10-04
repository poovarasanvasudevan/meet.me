import React from 'react';
import AppContext from "../../../../module/AppContext";
import {useStateValue} from "../util/context";


export default function (props) {

    const [{}, dispatch] = useStateValue();
    const {Parse} = React.useContext(AppContext);
    React.useEffect(() => {
        var eprops = props.state;

        var kbId = eprops.match.params.kb;

        const BlogPost = Parse.Object.extend("BlogPost");
        const blogPostQuery = new Parse.Query(BlogPost);
        blogPostQuery.include('user');
        blogPostQuery.include('user.profile');
        blogPostQuery.equalTo('objectId', kbId);
        blogPostQuery
            .find()
            .then((data) => data.length === 1 ? data[0] : [])
            .then((data) => dispatch({
                type: 'editload',
                formValues : data,
                post: data.get('content'),
                title: data.get('title'),
            }))
            .catch((error) => {

            });


    }, []);

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}
