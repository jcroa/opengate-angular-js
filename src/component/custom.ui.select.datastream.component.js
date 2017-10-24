'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDatastreamController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().datamodelsSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;
            if (!search)
                return {};
            return {
                'or': [
                    //{ 'like': { 'datamodel.categories.datastreams.id': search } },
                    { 'like': { 'datamodels.categories.datastreams.name': search } }
                    //{ 'like': { 'datamodel.identifier': search } },
                    //{ 'like': { 'datamodel.name': search } },
                    //{ 'like': { 'datamodel.description': search } },
                    //{ 'like': { 'datamodel.version': search } }
                ]
            };
        },
        rootKey: 'datamodels',
        collection: [],
        processingData: function(data, collection) {
            if (!ctrl.lastSearch) return;
            var _datastreams = [];
            var datamodels = data.data.datamodels;
            angular.forEach(datamodels, function(datamodel, key) {
                var categories = datamodel.categories;
                var _datamodel = {
                    identifier: datamodel.identifier,
                    description: datamodel.description,
                    name: datamodel.name,
                    organization: datamodel.organizationName
                };
                angular.forEach(categories, function(category, key) {
                    var datastreams = category.datastreams;
                    var _category = { identifier: category.identifier };
                    angular.forEach(datastreams
                        .filter(function(ds) {
                            return (ds.identifier.indexOf(ctrl.lastSearch) > -1 && !!ctrl.lastSearch.length) || !ctrl.lastSearch;
                        }),
                        function(datastream, key) {
                            var _datastream = angular.copy(datastream);
                            _datastream.datamodel = _datamodel;
                            _datastream.category = _category;
                            _datastreams.push(_datastream);
                        });
                });
            });
            angular.copy(_datastreams, collection);
        },
        customSelectors: $api().datamodelsSearchBuilder()
    };

    ctrl.datastreamSelected = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onSelectItem(return_obj);
    };

    ctrl.datastreamRemove = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onRemove(return_obj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectDatastream', {
    templateUrl: 'views/custom.ui.select.datastream.html',
    controller: 'customUiSelectDatastreamController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        datastream: '=',
        multiple: '@',
        isRequired: '@'
    }

});