import React from 'react';
import {Case, Default, Else, If, Switch, Then} from "react-if";
import SkeletonV2 from "../theme/skeleton/SkeletonV2";
import BasePageTemplate from '../theme/base-page-template';
import WhiteTheme from '../theme/white-theme';
import AppContext from "../../module/AppContext";
import {useBaseStateValue} from "../context";
import Base from '../Base';

export default function (props) {

    const [{CurrentUser}, dispatch] = useBaseStateValue();
    const {Parse} = React.useContext(AppContext);


    return (
        <Base>
            <Switch>
                <Case condition={props.template === 'admin'}>
                    <If condition={CurrentUser !== null}>
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
        </Base>
    );
}
