# Bonegular

<img style="float: right; width: 125px; margin-left: 20px;" src="https://dl.dropboxusercontent.com/u/832215/bonegular.png" />


[AngularJS](https://angularjs.org) is a fantastic client-side framework. It solves a lot of problems, but provides little to no guidance in terms of how one might best go about structuring the underlying data of an application. I tried [$resource](https://docs.angularjs.org/api/ngResource/service/$resource) and [Restangular](https://github.com/mgonto/restangular), but they weren't really "doing it for me." I found myself longing for something more akin to the Collection and Model classes that you find in [Backbone](http://backbonejs.org). Click, click. Tap, tap. Voila... Bonegular. Makes perfect sense.

This is an alpha release. The API could change a little, but I'm already using this in production and it works great.

# Example

* Clone this project.
* Install dependencies: ```$ npm install; bower install```
* Launch the example: ```$ grunt serve```

# How-To

## Define Your Models and Collections (as Services)

```
/**
 * @service Country
 */
app.factory('Country', function(bonegular, States) {
    return bonegular.createModel({
        'collections': {
            'states': 'States'
        },
        'methods': {}
    });
});

/**
 * @service Countries
 */
app.factory('Countries', function(bonegular, Country) {
    return bonegular.createCollection({
        'model': Country,
        'rootUrl': '/countries',
        'methods': {}
    });
});

app.factory('State', function(bonegular) {
    return bonegular.createModel({
        'methods': {
            'describe': function() {
                alert(this.name + ' is awesome.');
            }
        }
    });
});

app.factory('States', function(bonegular, State) {
    return bonegular.createCollection({
        'model': State,
        'url': 'states',
        'methods': {}
    });
});
```

## Use Them

```
app.controller('DefaultController', function($scope, Countries) {

    var countries = new Countries();
    $scope.countries = countries.models;
    countries.get().then(function() {
        console.log('Countries were fetched.', countries);
    });

});
```

## Dependencies

* [Underscore](http://http://underscorejs.org/) or [LoDash](http://lodash.com/)

## License (MIT)

```
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
