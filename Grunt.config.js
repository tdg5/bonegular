/**
 * Global Grunt configuration settings.
 */
module.exports = function(grunt) {

    return {
        'alias': {
            'build': ['browserify'],
            'serve': ['concurrent:serve']
        }
    };

};
