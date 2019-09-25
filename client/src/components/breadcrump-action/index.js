import * as React from 'react';
import styled from 'styled-components';
import Button,{ ButtonGroup} from '@atlaskit/button'


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

    const [isLocked, setIsLocked] = React.useState(false);
    const [title, setTitle] = React.useState(null);

    React.useEffect(()=> {
        setTitle(props.title)
    } , [props.title])

    const lockToggle = () => {
        setIsLocked(!isLocked);
        // isLocked ? AppToaster.show({
        //     intent: 'warning',
        //     icon: 'thumbs-up',
        //     message: 'Locked'
        // }) : AppToaster.show({intent: 'warning', icon: 'thumbs-up', message: 'Unlocked'});
    };


    return (
        <>
            <Wrapper>
                <BreadcrumbWrapper>KBArticles / {title ? title : '...'}</BreadcrumbWrapper>
                <MiscActionsWrapper>
                    <ButtonGroup minimal={true}>
                        <Button icon="tag"/>
                        <Button icon={isLocked ? 'lock' : 'unlock'} onClick={lockToggle}
                                color="#de350b"/>
                    </ButtonGroup>
                </MiscActionsWrapper>
            </Wrapper>

        </>
    );

}
