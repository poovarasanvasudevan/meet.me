import * as React from 'react';
import {PortWidget} from '@projectstorm/react-diagrams';
import styled from 'styled-components';


const OuterNode = styled.div`
    border: solid 2px gray;
    border-radius: 5px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    background: #fff;
`;

const InnerNode = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background: green;
`;

const CPort = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 2px;
    background: red;
    cursor: pointer;
`;


const CPortArea = styled.div`
    padding : 2px;
`;
export default function (props) {

    return (
        <OuterNode>

            <div>
                <InnerNode/>
            </div>

            <CPortArea>
                <PortWidget engine={props.engine} port={props.node.getPort('out')}>
                    <CPort/>
                </PortWidget>
            </CPortArea>
        </OuterNode>
    );
}
