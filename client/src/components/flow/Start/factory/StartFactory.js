import * as React from 'react';
import StartModel from '../model/StartModel';
import StartWidget from '../widget/StartWidget';
import {AbstractReactFactory} from '@projectstorm/react-canvas-core';

export default class StartFactory extends AbstractReactFactory {
    constructor() {
        super('START');
    }

    generateModel(event) {
        return new StartModel();
    }

    generateReactWidget(event) {
        return <StartWidget engine={this.engine} node={event.model}/>;
    }
}
