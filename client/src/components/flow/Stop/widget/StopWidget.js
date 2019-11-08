import * as React from 'react';
import {PortWidget} from '@projectstorm/react-diagrams';
import styled from 'styled-components';
import {FaFlag, FaFlagCheckered} from 'react-icons/fa';

const OuterNode = styled.div`
    border: solid 2px #043B8D;
    
    height: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    background: #fff;
    
    flex-direction: row;
`;


const StopPort = styled(PortWidget)`
    height: 100%;
    width: 30px;
    cursor: pointer;
    
    
    
    border-right: 2px solid #043B8D;
`;


const CPortArea = styled.div`
    width: 80px;
 
    font-weight: 600;
    font-size: 13px;
   
   top : 50%;
   texxt-align : center;
    
`;
export default function (props) {

    return (
        <OuterNode>
            <StopPort engine={props.engine} port={props.node.getPort('in')}>
                <div style={{background: "#043B8D", margin: 4, width: 'calc(100% - 8px)', height: 'calc(100% - 8px)'}}/>
            </StopPort>

            <CPortArea>
                <div>
                    <FaFlagCheckered/>
                    <span style={{marginLeft: 5, marginBottom: -5}}>Stop</span>
                </div>
            </CPortArea>

        </OuterNode>
    );
}
