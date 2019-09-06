import React from 'react';
import Base from "./Base";

export default props => {

    return (
        <Base>
            <div className="page-content">
                {props.children}
            </div>
        </Base>
    );
}
