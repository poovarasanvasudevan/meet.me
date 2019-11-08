import {DefaultPortModel, NodeModel} from '@projectstorm/react-diagrams';

export default class DefaultModel extends NodeModel {
    constructor(options = {}) {
        super({
            ...options,
            type: 'DEFAULT'
        });
        this.color = options.color || {options: 'red'};

        this.addPort(new DefaultPortModel({in: true, name: 'default_in'}));
        this.addPort(new DefaultPortModel({in: false, name: 'default_out'}));

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
