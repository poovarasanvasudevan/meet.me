import React from 'react';
import styled from 'styled-components';
import Spinner from '@atlaskit/spinner';

const ProgressDiv = styled.div`
    height: 100%;
    padding: 0;
    margin: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function (props) {
    return (
        <ProgressDiv>
            <Spinner css={{alignSelf: 'center'}} size="large" />
        </ProgressDiv>);
}
