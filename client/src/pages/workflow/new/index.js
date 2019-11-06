import React from 'react';
import {BreadcrumbsStateless, BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import {MLink, RouterLink} from "../../../components/theme/link";
import TemplateRendering from '../../../components/template-rendering';
import {useBaseStateValue} from "../../../components/context";
import styled from "styled-components";
import Color from '../../../components/theme/color';
import {ButtonGroup} from "@atlaskit/button";
import {DefaultButton} from "office-ui-fabric-react";
import {download} from "../../../components/util";

import createEngine, {DiagramModel, DefaultNodeModel} from '@projectstorm/react-diagrams';
import {CanvasWidget} from '@projectstorm/react-canvas-core';

import TextField from '@atlaskit/textfield';
import Form, {Field, FormFooter} from '@atlaskit/form';
import {
    FlexContainer,
    ContentWrapper,
} from '@atlaskit/right-side-panel';
import Tabs from '@atlaskit/tabs';

import {Stack, IStackProps} from 'office-ui-fabric-react/lib/Stack';


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
    border-bottom : 1px solid #eaeaea;
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


const Container = styled.div`
	height: 100%;
		background-color: #f8f8f8 !important;
		background-size: 50px 50px;
		display: flex;
		> * {
			height: 100%;
			min-height: 100%;
			width: 100%;
		}
		background-image: linear-gradient(
				0deg,
				transparent 24%,
				${p => p.color} 25%,
				${p => p.color} 26%,
				transparent 27%,
				transparent 74%,
				${p => p.color} 75%,
				${p => p.color} 76%,
				transparent 77%,
				transparent
			),
			linear-gradient(
				90deg,
				transparent 24%,
				${p => p.color} 25%,
				${p => p.color} 26%,
				transparent 27%,
				transparent 74%,
				${p => p.color} 75%,
				${p => p.color} 76%,
				transparent 77%,
				transparent
			);

`;

const RightPanel = styled.div`
    width : 420px !important;
    height : 90% !important;
    min-height : 90% !important;
    margin : 20px !important;
    background : #fff !important;
    border: 1px solid #dadada !important;
    border-radius : 2px;
`;

export default function (props) {
    const [{template}, dispatch] = useBaseStateValue();
    const [engine, setEngine] = React.useState(null);
    const [isOpen, setOpen] = React.useState(false);
    const [activeNode, setActiveNode] = React.useState(null);


    const selectionChanged = (node) => {
        if (node.isSelected) {
            setOpen(true);
            setActiveNode(node);
        } else {
            setOpen(false);
            setActiveNode(null);
        }
    };

    const nodeSelected = (data) => {

        switch (data.function) {
            case "selectionChanged":
                selectionChanged(data);
                break;
            default:
                break;

        }
        console.log(data);
    };

    React.useEffect(() => {

        var tempEngine = createEngine();

        var model = new DiagramModel();

        var node1 = new DefaultNodeModel('Node 1', '#0052cc');
        var port1 = node1.addOutPort('Out');
        node1.addInPort("Primary");
        node1.addInPort("Secondary");

        node1.setPosition(100, 100);


        var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
        var port2 = node2.addInPort('In');
        node2.setPosition(400, 100);

        var link1 = port1.link(port2);

        const models = model.addAll(node1, node2, link1);


        models.forEach(item => {
            item.registerListener({
                eventDidFire: nodeSelected
            });
        });


        tempEngine.setModel(model);
        setEngine(tempEngine);

    }, []);


    const cactions = (
        <ButtonGroup>
            <DefaultButton
                iconProps={{iconName: 'Zoom'}}
                text={'Fit'}
                onClick={() => engine.zoomToFit()}
            />
            <DefaultButton
                iconProps={{iconName: 'Download'}}
                onClick={() => download('export_' + Math.random() + '.wf', JSON.stringify(engine.getModel().serialize()))}
                text={'Export'}/>
        </ButtonGroup>
    );

    const cProps = {
        tokens: {childrenGap: 8},
        styles: {root: {width: '100%', padding: '10px'}}
    };

    return (
        <TemplateRendering template={template}>
            <FullPage>
                <Header>
                    <PageHeader breadcrumbs={breadcrumbs} actions={cactions}>Workflow</PageHeader>
                </Header>
                <Body>

                <FlexContainer id="workflow" style={{height: '100%'}}>
                    <ContentWrapper>

                        <Container
                            id={'canvas'}
                            background={'rgb(60, 60, 60)'}
                            color={'rgba(50,50,50, 0.05)'}>

                            {engine && <CanvasWidget engine={engine}/>}

                            <RightPanel>
                                <Tabs
                                    tabs={[
                                        {
                                            label: 'Tasks',
                                            defaultSelected: true,
                                            content: <div>Content is here</div>,
                                        },

                                        isOpen && {
                                            label: 'Attributes',
                                            defaultSelected: true,
                                            content: <Stack {...cProps}>

                                                <Form onSubmit={data => console.log(data)}>
                                                    {({formProps}) => (
                                                        <form {...formProps} name="node-attributes">
                                                            <Field name="node_id"
                                                                   defaultValue={activeNode.entity.options.id}
                                                                   isDisabled={true} label="Node ID" isRequired>
                                                                {({fieldProps}) => <TextField {...fieldProps} />}
                                                            </Field>

                                                            <Field name="node_name"
                                                                   defaultValue={activeNode.entity.options.name}
                                                                   label="Name" isRequired>
                                                                {({fieldProps}) => <TextField {...fieldProps} />}
                                                            </Field>
                                                        </form>
                                                    )}
                                                </Form>
                                            </Stack>,
                                        }
                                    ]}
                                />
                            </RightPanel>


                        </Container>


                    </ContentWrapper>
                </FlexContainer>

                </Body>
            </FullPage>
        </TemplateRendering>
    );
}
