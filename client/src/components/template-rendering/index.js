import React from 'react';
import {Case, Default, Else, If, Switch, Then} from "react-if";
import SkeletonV2 from "../SkeletonV2";
import BasePageTemplate from '../theme/base-page-template';
import WhiteTheme from '../theme/white-theme';
import AppContext from "../../module/AppContext";


export default function (props) {

    const [cuser, setUser] = React.useState(null);
    const {Parse} = React.useContext(AppContext);
    React.useEffect(() => {
        var cuser = Parse.User.current();
        setUser(cuser)
    }, []);


    return (
        <Switch>
            <Case condition={props.template === 'admin'}>
                <If condition={cuser !== null}>
                    <Then>
                        <SkeletonV2
                            containerNavigation={() => null}
                            productNavigation={() => null}
                            navWidth={0}>

                            {props.children}

                        </SkeletonV2>

                    </Then>
                    <Else>
                        {props.children}
                    </Else>
                </If>
            </Case>
            <Case condition={props.template === 'base'}>
                <BasePageTemplate>
                    {props.children}
                </BasePageTemplate>
            </Case>

            <Case condition={props.template === 'white'}>
                <WhiteTheme>
                    {props.children}
                </WhiteTheme>
            </Case>
            <Default>
                {props.children}
            </Default>
        </Switch>
    );
}
