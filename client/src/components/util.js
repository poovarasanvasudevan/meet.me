import React, {Component} from "react";
import Skeleton from './Skeleton';
import Base from "./Base";
import Icon from "@atlaskit/icon";
import styled from 'styled-components';
import {HelperMessage} from "@atlaskit/form";
import {AppTextField} from "./theme/textfield";

const SkeletonComponent = loadingProp => WrappedComponent => {
    return class SkeletomComponentHOC extends Component {
        render() {
            return (
                <Skeleton>
                    <WrappedComponent {...this.props} />
                </Skeleton>
            );
        }
    };
};


const BaseComponent = loadingProp => WrappedComponent => {
    return class SkeletomComponentHOC extends Component {
        render() {
            return (
                <Base>
                    <WrappedComponent {...this.props} />
                </Base>
            );
        }
    };
};


const CreateIcon = (props) => {
    return <Icon glyph={() => props.children}
                 label="Custom icon"/>;
};
const Divider = (props) => {
    return (<div style={{width: '100%', borderBottom: '1px solid #eaeaea'}}/>);
};

const CircleIcon = (props) => {
    return (
        <div style={{padding: 5, backgroundColor: props.bgcolor || '#000', borderRadius: '50%', ...props.style}}>
            {props.children}
        </div>
    );
};

const SquareIcon = (props) => {
    return (
        <div style={{padding: 5, backgroundColor: props.bgcolor || '#000', ...props.style}}>
            {props.children}
        </div>
    );
};

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


const GooglePlayButton = styled.a`
 color:#fff;
 margin:5px;
 font-size:14px;
 line-height:1.3333333;
 border-radius:6px;
 text-align:center;
 white-space:nowrap;
 vertical-align:middle;
 -ms-touch-action:manipulation;
 touch-action:manipulation;
 cursor:pointer;
 -webkit-user-select:none;
 -moz-user-select:none;
 -ms-user-select:none;
 user-select:none;
 border:1px solid transparent;
 font-weight:500;
 text-decoration:none;
 display:inline-block;
 
 background-color:#111;
 border-color:#000;
 padding:15px 16px 5px 40px;
 position:relative;
 font-weight:600;
 
 &:focus, &:hover, &:visited, &:link, &:active {
       outline:0,
       color:#333;
       text-decoration:none;
 }
 &:active {
   -webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);
   box-shadow:inset 0 3px 5px rgba(0,0,0,.125)
 }
 
 &:focus {
   color:#fff;
   background-color:#555;
   border-color:#000
 } 
 &:hover , &:active {
    color:#fff;
    background-color:#555;
    border-color:#000;
 }
 &:before {
    content:"";
    background-image:url(https://4.bp.blogspot.com/-52U3eP2JDM4/WSkIT1vbUxI/AAAAAAAArQA/iF1BeARv2To-2FGQU7V6UbNPivuv_lccACLcB/s30/nexus2cee_ic_launcher_play_store_new-1.png);background-size:cover;background-repeat:no-repeat;width:30px;height:30px;position:absolute;left:6px;top:50%;margin-top:-15px
 }
 
 &:after {
    content:"GET IT ON";
    position:absolute;
    top:5px;
    left:40px;
    font-size:10px;
    font-weight:400;
 }
 
`;


const MTextBox = styled(AppTextField)`
   
`;


const FormFieldWithProps = (props) => {
    return (
        <React.Fragment>
            <MTextBox autoComplete={'off'} {...props.fieldProps} />
            {props.helper && (
                <HelperMessage>
                    {props.helper}
                </HelperMessage>
            )}
        </React.Fragment>
    );
};

export {
    SkeletonComponent,
    BaseComponent,
    Divider,
    CreateIcon,
    CircleIcon,
    GooglePlayButton,
    FormFieldWithProps,
    MTextBox,
    SquareIcon,
    download
};
