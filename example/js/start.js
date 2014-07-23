app = angular.module('myApp', [
    'nexus'
]);

app.controller('DefaultController', function($scope, Countries) {

    var countries = new Countries();
    $scope.countries = countries.models;
    countries.get().then(function() {
        console.log('Countries were fetched.', countries);
    });

});

/**
 * @service Country
 */
app.factory('Country', function(nexus, States) {
    return nexus.createModel({
        'name': 'Country',
        'collections': {
            'states': 'States'
        },
        'methods': {}
    });
});

/**
 * @service Countries
 */
app.factory('Countries', function(nexus, Country) {
    return nexus.createCollection({
        'name': 'Countries',
        'model': 'Country',
        'rootUrl': '/countries',
        'methods': {}
    });
});

app.factory('State', function(nexus) {
    return nexus.createModel({
        'name': 'State',
        'methods': {
            'describe': function() {
                alert(this.name + ' is awesome.');
            }
        }
    });
});

app.factory('States', function(nexus, State) {
    return nexus.createCollection({
        'name': 'States',
        'model': 'State',
        'url': 'states',
        'methods': {}
    });
});
