const brain = require('brain.js');

const net = new brain.recurrent.LSTM();

net.train([
    'doe, a deer, a female deer',
    'ray, a drop of golden sun',
    'me, a name I call myself',
    'poovarasan, a mastero'
]);

const output = net.run('doe');  // ', a deer, a female deer'
