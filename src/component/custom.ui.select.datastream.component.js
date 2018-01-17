'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDatastreamController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().datamodelsSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;
            if (!search)
                return {};
            return {
                'or': [
                    { 'like': { 'datamodels.categories.datastreams.identifier': search } },
                    { 'like': { 'datamodels.categories.datastreams.name': search } },
                    { 'like': { 'datamodels.identifier': search } },
                    { 'like': { 'datamodels.name': search } },
                    { 'like': { 'datamodels.description': search } },
                    { 'like': { 'datamodels.version': search } }
                ]
            };
        },
        rootKey: 'datamodels',
        collection: [],
        processingData: function(data, collection) {
            //if (!ctrl.lastSearch) return $q(function(ok) { ok(); });
            return $q(function(C_ok) {
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
                                return (ds.identifier.toLowerCase().indexOf(ctrl.lastSearch.toLowerCase()) > -1 && !!ctrl.lastSearch.length) || !ctrl.lastSearch;
                            }),
                            function(datastream, key) {
                                var _datastream = angular.copy(datastream);
                                _datastream.datamodel = _datamodel;
                                _datastream.category = _category;

                                if (ctrl.postFilter) {
                                    var include = true;

                                    angular.forEach(ctrl.postFilter, function(postFilterFn, postFilterkey) {
                                        if (postFilterFn(_datastream[postFilterkey])) {
                                            include = false;
                                        }
                                    });

                                    if (include) {
                                        _datastreams.push(_datastream);
                                    }
                                } else {
                                    _datastreams.push(_datastream);
                                }
                            });
                    });
                });
                angular.copy(_datastreams, collection);
                C_ok(collection);
            })
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

    if (!ctrl.maxResults) {
        ctrl.maxResults = 100;
    }
}]);

angular.module('opengate-angular-js').component('customUiSelectDatastream', {
    templateUrl: 'views/custom.ui.select.datastream.html',
    controller: 'customUiSelectDatastreamController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        datastream: '=',
        multiple: '<',
        maxResults: '<',
        isRequired: '=',
        postFilter: '<'
    }
});