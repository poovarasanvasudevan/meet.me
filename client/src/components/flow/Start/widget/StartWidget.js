import * as React from 'react';
import {PortWidget} from '@projectstorm/react-diagrams';
import styled from 'styled-components';


const OuterNode = styled.div`
    border: solid 2px gray;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: #fff;
`;


const CPort = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
`;


const CPortArea = styled.div`
    padding : 2px;
`;
export default function (props) {

    return (
        <OuterNode>
            <CPortArea>
                <PortWidget engine={props.engine} port={props.node.getPort('out')}>
                    <CPort>
                        Start
                    </CPort>
                </PortWidget>
            </CPortArea>
        </OuterNode>
    );
}
