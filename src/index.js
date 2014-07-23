'use strict';

var nexus = angular.module('nexus', []);

nexus.factory('nexus', function($http, $q) {

    var data = {
        'models': {},
        'collections': {}
    }, BaseModel, BaseCollection, createModel, createCollection;

    BaseModel = require('./lib/model')(data, $http, $q);
    BaseCollection = require('./lib/collection')(data, $http, $q);

    /**
     * Defines a new Model
     */
    createModel = function(options) {

        var Model = function() {

            Object.defineProperty(this, '_fetched', {
                'configurable': false,
                'writable': true,
                'enumerable': false,
                'value': false
            });

            Object.defineProperty(this, '_cache', {
                'configurable': false,
                'writable': true,
                'enumerable': false,
                'value': options.cache || null
            });

            Object.defineProperty(this, '_name', {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': options.name
            });

            Object.defineProperty(this, '_parent', {
                'configurable': false,
                'writable': true,
                'enumerable': false,
                'value': null
            });

            Object.defineProperty(this, '_rootUrl', {
                'configurable': false,
                'writable': true,
                'enumerable': false,
                'value': options.rootUrl || null
            });

            Object.defineProperty(this, '_collections', {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': options.collections || {}
            });

            this._init.apply(this, arguments);

        };

        _.each(BaseModel, function(method, name) {
            Object.defineProperty(Model.prototype, name, {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': method
            });
        });

        _.each(options.methods, function(method, name) {
            Object.defineProperty(Model.prototype, name, {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': method
            });
        });

        data.models[options.name] = Model;

        return Model;

    };

    /**
     * Defines a new Collection
     */
    createCollection = function(options) {

        var Collection = function() {

            Object.defineProperty(this, '_fetched', {
                'configurable': false,
                'writable': true,
                'enumerable': false,
                'value': false
            });

            Object.defineProperty(this, '_cache', {
                'configurable': false,
                'writable': true,
                'enumerable': false,
                'value': options.cache || null
            });

            Object.defineProperty(this, 'models', {
                'configurable': false,
                'writable': true,
                'enumerable': true,
                'value': []
            });

            Object.defineProperty(this, '_name', {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': options.name
            });

            Object.defineProperty(this, '_model', {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': options.model
            });

            Object.defineProperty(this, '_Model', {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': data.models[options.model]
            });

            Object.defineProperty(this, '_url', {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': options.url
            });

            Object.defineProperty(this, '_rootUrl', {
                'configurable': false,
                'writable': true,
                'enumerable': false,
                'value': options.rootUrl || null
            });

            Object.defineProperty(this, '_parent', {
                'configurable': false,
                'writable': true,
                'enumerable': false,
                'value': null
            });

            this._init.apply(this, arguments);

        };

        _.each(BaseCollection, function(method, name) {
            Object.defineProperty(Collection.prototype, name, {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': method
            });
        });

        _.each(options.methods, function(method, name) {
            Object.defineProperty(Collection.prototype, name, {
                'configurable': false,
                'writable': false,
                'enumerable': false,
                'value': method
            });
        });

        Collection.create = function() {
            var collection = new this;
            return collection.create.apply(collection, arguments);
        };

        data.collections[options.name] = Collection;

        return Collection;

    };

    return {

        'createModel': function(options) {
            return createModel(options);
        },

        'createCollection': function(options) {
            return createCollection(options);
        },

        'getModel': function(name) {
            return data.models[name];
        },

        'getCollection': function(name) {
            return data.collections[name];
        }

    };

});
