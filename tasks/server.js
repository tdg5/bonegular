module.exports = function(grunt) {

    var port = 7000;

    grunt.registerTask('server', function() {

        var done = this.async();

        var server = require('../server');
        server.listen(port);
        console.log('Express is listening on port: ' + port);

    });

};
