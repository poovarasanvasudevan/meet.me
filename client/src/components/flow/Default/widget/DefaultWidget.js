import * as React from 'react';
import {PortWidget} from '@projectstorm/react-diagrams';
import styled from 'styled-components';


const OuterNode = styled.div`
    border: solid 2px #043B8D;
    
    width: 150px;
    height: 80px;
    display: flex;
    background: #fff;
    flex-direction: column;
`;

const InnerNode = styled.div`
    flex: 1;
`;


const CPortArea = styled(PortWidget)` 
    height: 100%;
    width: 20px;
    cursor : pointer;
    background: white;
    
    &:hover {
        background: #999;
    }
`;

const TopHeader = styled.div`
    background : #043B8D;
    color: white;
    height: 20px;
    text-align: center;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    
    border-bottom: 2px solid #043B8D;
`;


export default function (props) {

    return (
        <OuterNode>

            <TopHeader>


                <span style={{flex: 1}}>
                    Hello
                </span>


            </TopHeader>


            <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>

                <CPortArea engine={props.engine} port={props.node.getPort('default_in')}>
                    <div/>
                </CPortArea>

                <InnerNode/>


                <CPortArea engine={props.engine} port={props.node.getPort('default_out')}>
                    <div/>
                </CPortArea>
            </div>

        </OuterNode>
    );
}
