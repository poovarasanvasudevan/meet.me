import * as React from 'react';
import styled from 'styled-components';
import Button, {ButtonGroup} from '@atlaskit/button';
import {IconButton, IIconProps} from 'office-ui-fabric-react';
import {useStateValue} from "../../pages/blog/editor/util/context";

const BreadcrumbWrapper = styled.div`
  flex: 1 1 80%;
  color: rgb(107, 119, 140);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const MiscActionsWrapper = styled.div`
  flex: 1 1 10%;
  align-content: flex-end;
`;


export default function BreadcrumbsMiscActions(props) {

    const [{locked,title}, dispatch] = useStateValue();


    const lockToggle = () => {
        dispatch({
            type: 'lock',
            locked: !locked
        });
        // isLocked ? AppToaster.show({
        //     intent: 'warning',
        //     icon: 'thumbs-up',
        //     message: 'Locked'
        // }) : AppToaster.show({intent: 'warning', icon: 'thumbs-up', message: 'Unlocked'});
    };

    const setAppearence = () => {
        dispatch({
            type: 'appearence'
        });
    };


    const openSetting = () => {
        dispatch({
            type: 'settings',
            settings: true
        });
    };

    return (
        <>
            <Wrapper>
                <BreadcrumbWrapper>KBArticles / {title ? title : '...'}</BreadcrumbWrapper>
                <MiscActionsWrapper>
                    <ButtonGroup minimal={true}>
                        <IconButton iconProps={{iconName: 'Tag'}} onClick={openSetting}/>
                        <IconButton iconProps={{iconName: 'RedEye'}} />
                        <IconButton iconProps={{iconName: locked ? 'Lock' : 'Unlock'}} onClick={lockToggle}
                                    color="#de350b"/>
                        <IconButton iconProps={{iconName: 'BackToWindow'}} onClick={setAppearence}/>
                    </ButtonGroup>
                </MiscActionsWrapper>
            </Wrapper>
        </>
    );

}
