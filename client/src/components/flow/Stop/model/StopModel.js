import {DefaultPortModel, NodeModel} from '@projectstorm/react-diagrams';

export default class StopModel extends NodeModel {
    constructor(options = {}) {
        super({
            ...options,
            type: 'STOP'
        });
        this.color = options.color || {options: 'red'};

        this.addPort(
            new DefaultPortModel({
                in: true,
                name: 'in'
            })
        );
    }

    serialize() {
        return {
            ...super.serialize(),
            color: this.options.color
        };
    }

    deserialize(ob, engine) {
        super.deserialize(ob, engine);
        this.color = ob.color;
    }
}
