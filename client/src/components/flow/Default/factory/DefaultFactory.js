import * as React from 'react';
import DefaultModel from '../model/DefaultModel';
import DefaultWidget from '../widget/DefaultWidget';
import {AbstractReactFactory} from '@projectstorm/react-canvas-core';

export default class DefaultFactory extends AbstractReactFactory {
    constructor() {
        super('DEFAULT');
    }

    generateModel(event) {
        return new DefaultModel();
    }

    generateReactWidget(event) {
        return <DefaultWidget engine={this.engine} node={event.model}/>;
    }
}
