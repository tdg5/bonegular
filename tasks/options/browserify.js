'use strict';

module.exports = function() {

    var name = require('../../package.json').name;

    var outputFile = name + '.js';

    var options = {
        'lib': {
            'src': ['src/**/*.js'],
            'dest': 'build/' + outputFile
        }
    };

    return options;

};
