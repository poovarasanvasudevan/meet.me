import React from 'react';
import {cloneDeep, mapValues} from 'lodash';
import {BreadcrumbsStateless, BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import {MLink, RouterLink} from "../../../components/theme/link";
import TemplateRendering from '../../../components/template-rendering';
import {useBaseStateValue} from "../../../components/context";
import styled from "styled-components";
import {FlowChartWithState, LinkDefault} from "@mrblenny/react-flow-chart";
import Color from '../../../components/theme/color';
import {ButtonGroup} from "@atlaskit/button";
import {DefaultButton, PrimaryButton} from "office-ui-fabric-react";
import {download} from "../../../components/util";

const FullPage = styled.div`
    display : flex;
    flex-direction : column;
    height: 100%;
    width:100%;
`;

const Header = styled.div`
    flex: 0 0 auto;
    padding-left : 18px;
    padding-right : 18px;
`;

const Body = styled.div`
    flex: 1 1 auto; 
    position: relative;
    overflow-y: auto;
   
    &::-webkit-scrollbar-track
    {
        background-color: #F5F5F5;
    }
        
    &::-webkit-scrollbar
    {
        width: 10px;
        background-color: #F5F5F5;
        border: 1px solid #000;
    }
        
    &::-webkit-scrollbar-thumb
    {
        background-color: #cccccc;
    }
`;


const InnerStart = styled.div`
 
`;
const Outer = styled.div`
  padding: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid cornflowerblue;
`;


const NodeStart = styled.div`
  background-color : ${Color.torquiose};
  color : white;
  border-radius : 5px;
  padding-left : 30px;
  padding-right : 30px;
  position: absolute;
`;

const Start = styled.div`
  padding: 10px;
  background-color : ${Color.torquiose};
  color : white;
  border-radius : 5px;
  height : 60px;
  position: absolute;
`;

const End = styled.div`
  padding: 10px;
  position: absolute;
  background: #3e3e3e;
  color: white;
  border-radius: 10px;
  position: absolute;
`;

const InputDiv = styled.div`
  padding: 10px;
  position: absolute;
  background: white;
  color: white;
  border-radius: 10px;
  color : black;
  border : 1px solid #ccc;
`;


const NodeCustom = ({node, children, ...otherProps}) => {
    if (node.type === 'start') {
        return (
            <NodeStart {...otherProps}>
                {children}
            </NodeStart>
        );

    } else if (node.type === 'output-only') {
        return (
            <Start {...otherProps}>
                {children}
            </Start>
        );
    } else if (node.type === 'input-only') {
        return (
            <End {...otherProps}>
                {children}
            </End>
        );
    } else {
        return (
            <InputDiv {...otherProps}>
                {children}
            </InputDiv>
        );
    }
};
const NodeInnerCustom = ({node, config}: INodeInnerDefaultProps) => {
    if (node.type === 'start') {
        return (
            <InnerStart>
                <p>Start</p>
            </InnerStart>
        );
    } else {
        return (
            <Outer>
                <p>{node.type}</p>
            </Outer>
        );
    }
};


const PortDefaultOuter = styled.div`
  width: 12px;
  height: 12px;
  background: ${Color.primaryColor};
  cursor: pointer;
  display: flex;
  padding : 4px;
  justify-content: center;
  align-items: center;
  border-radius : 50%;
`;
const PortInner = styled.div`
 background: white;
 width: 100%
 border-radius : 50%;
 height : 100%;
`;

const PortCustom = (props) => (
    <PortDefaultOuter>
        <PortInner></PortInner>
    </PortDefaultOuter>
);

const breadcrumbs = (
    <BreadcrumbsStateless onExpand={() => {
    }}>
        <BreadcrumbsItem href="/home" text="Home" key="home" component={RouterLink}/>
        <BreadcrumbsItem href="#" text="Workflow" key="Workflow" component={RouterLink}/>
    </BreadcrumbsStateless>
);


export default function (props) {
    const [{template}, dispatch] = useBaseStateValue();

    const [node, setNode] = React.useState({
        offset: {
            x: 0,
            y: 0,
        },
        nodes: {
            node1: {
                id: 'node1',
                type: 'start',
                position: {
                    x: 300,
                    y: 100,
                },
                ports: {
                    port1: {
                        id: 'port1',
                        type: 'output',
                    },
                },
            },
            node2: {
                id: 'node2',
                type: 'input-output',
                position: {
                    x: 300,
                    y: 300,
                },
                ports: {
                    port1: {
                        id: 'port1',
                        type: 'input',
                    },
                    port2: {
                        id: 'port2',
                        type: 'output',
                    },
                    port3: {
                        id: 'port3',
                        type: 'output',
                    },
                },
            },
            node3: {
                id: 'node3',
                type: 'input-output',
                position: {
                    x: 100,
                    y: 600,
                },
                ports: {
                    port1: {
                        id: 'port1',
                        type: 'input',
                    },
                    port2: {
                        id: 'port2',
                        type: 'output',
                    },
                },
            },
            node4: {
                id: 'node4',
                type: 'input-output',
                position: {
                    x: 500,
                    y: 600,
                },
                ports: {
                    port1: {
                        id: 'port1',
                        type: 'input',
                    },
                    port2: {
                        id: 'port2',
                        type: 'output',
                    },
                },
            },
        },
        links: {
            link1: {
                id: 'link1',
                from: {
                    nodeId: 'node1',
                    portId: 'port1',
                },
                to: {
                    nodeId: 'node2',
                    portId: 'port1',
                },
                properties: {
                    label: 'example link label',
                },
            },
            link2: {
                id: 'link2',
                from: {
                    nodeId: 'node2',
                    portId: 'port2',
                },
                to: {
                    nodeId: 'node3',
                    portId: 'port1',
                },
                properties: {
                    label: 'another example link label',
                },
            },
            link3: {
                id: 'link3',
                from: {
                    nodeId: 'node2',
                    portId: 'port2',
                },
                to: {
                    nodeId: 'node4',
                    portId: 'port1',
                },
            },
        },
        selected: {},
        hovered: {},
    });
    const cactions = (
        <ButtonGroup>
            <DefaultButton
                iconProps={{iconName: 'Download'}}
                onClick={() => download('export_' + Math.random() + '.json', JSON.stringify(node))}
                text={'Export'}/>
        </ButtonGroup>
    );

    const stateActions = (actions) => mapValues(actions, (func: any) => (...args: any) => setNode(func(...args)));

    return (
        <TemplateRendering template={template}>
            <FullPage>
                <Header>
                    <PageHeader breadcrumbs={breadcrumbs} actions={cactions}>Workflow</PageHeader>
                </Header>
                <Body>
                <FlowChartWithState
                    callbacks={stateActions}
                    Components={{
                        Node: NodeCustom,
                        NodeInner: NodeInnerCustom,
                    }}
                    initialValue={node}
                />
                </Body>
            </FullPage>
        </TemplateRendering>
    );
}
