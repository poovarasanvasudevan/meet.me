import React from 'react';

import {
    ReactRenderer
} from '@atlaskit/renderer';

export default function (props) {
    return (
        <div>
            <ReactRenderer
                document={props.doc || {
                    version: 1,
                    type: 'doc',
                    content: [],
                }}
                adfStage="stage0"
                appearance={'full-width'}
            />
        </div>
    );
}
