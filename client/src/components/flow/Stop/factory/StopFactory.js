import * as React from 'react';
import StopModel from '../model/StopModel';
import StopWidget from '../widget/StopWidget';
import {AbstractReactFactory} from '@projectstorm/react-canvas-core';

export default class StopFactory extends AbstractReactFactory {
    constructor() {
        super('STOP');
    }

    generateModel(event) {
        return new StopModel();
    }

    generateReactWidget(event) {
        return <StopWidget engine={this.engine} node={event.model}/>;
    }
}
