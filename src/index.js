'use strict';

var bonegular = angular.module('bonegular', []);

bonegular.provider('bonegular', function() {
    var bonegularProvider = this;

    this.$get = function($http, $q) {
        var BaseModel, BaseCollection, createModel, createCollection;

        BaseModel = require('./lib/model')($http, $q);
        BaseCollection = require('./lib/collection')($http, $q);

        if (angular.isFunction(bonegularProvider.initBaseModel)) {
          bonegularProvider.initBaseModel.call(BaseModel, BaseModel);
        }

        if (angular.isFunction(bonegularProvider.initBaseCollection)) {
          bonegularProvider.initBaseCollection.call(BaseCollection, BaseCollection);
        }

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

                Object.defineProperty(this, '_parent', {
                    'configurable': false,
                    'writable': true,
                    'enumerable': false,
                    'value': null
                });

                Object.defineProperty(this, '_collection', {
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
                    'value': options.model
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

            return Collection;

        };

        return {

            'createModel': function(options) {
                return createModel(options);
            },

            'createCollection': function(options) {
                return createCollection(options);
            }

        };
    };

    this.initBaseModel = null;
    this.initBaseCollection = null;

});
