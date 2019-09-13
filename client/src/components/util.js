import React, {Component} from "react";
import Skeleton from './Skeleton';
import Base from "./Base";
import Icon from "@atlaskit/icon";

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
        <div style={{padding: 5, backgroundColor : props.bgcolor || '#000', borderRadius: '50%' , ...props.style}}>
            {props.children}
        </div>
    )
}

export {
    SkeletonComponent,
    BaseComponent,
    Divider,
    CreateIcon,
    CircleIcon
};
