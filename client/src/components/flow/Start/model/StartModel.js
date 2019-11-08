import {DefaultPortModel, NodeModel} from '@projectstorm/react-diagrams';

export default class StartModel extends NodeModel {
    constructor(options = {}) {
        super({
            ...options,
            type: 'START'
        });
        this.color = options.color || {options: 'red'};

        this.addPort(
            new DefaultPortModel({
                in: false,
                name: 'out'
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
