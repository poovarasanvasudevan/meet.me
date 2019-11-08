import StartFactory from './Start/factory/StartFactory';
import StartModel from './Start/model/StartModel';
import StartWidget from './Start/widget/StartWidget';


import StopFactory from './Stop/factory/StopFactory';
import StopModel from './Stop/model/StopModel';
import StopWidget from './Stop/widget/StopWidget';


import DefaultFactory from './Default/factory/DefaultFactory';
import DefaultModel from './Default/model/DefaultModel';
import DefaultWidget from './Default/widget/DefaultWidget';


const Factory = {
    Start: {
        Factory: StartFactory,
        Model: StartModel,
        Widget: StartWidget
    },
    Stop: {
        Factory: StopFactory,
        Model: StopModel,
        Widget: StopWidget
    },

    Default: {
        Factory: DefaultFactory,
        Model: DefaultModel,
        Widget: DefaultWidget
    }
};
export default Factory;
