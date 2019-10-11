import React from 'react';
import AppContext from "../module/AppContext";
import {useBaseStateValue} from "./context";

export default function (props) {

    const {Parse} = React.useContext(AppContext);
    const [{CurrentUser}, dispatch] = useBaseStateValue();


    React.useEffect(() => {
        if (CurrentUser == null) {
            const currentUser = Parse.User.current();
            if (currentUser) {
                const profile = currentUser.get('profile');
                profile.fetch().then((data) => dispatch({
                    type: "setuser",
                    user: currentUser
                }));
            }
        }
    }, []);

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}
