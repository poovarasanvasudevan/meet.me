const fs = require('fs-extra');

fs.move('./build', '../server/static', err => {
    if(err) return console.error(err);
    console.log('File Movement Success');
});
