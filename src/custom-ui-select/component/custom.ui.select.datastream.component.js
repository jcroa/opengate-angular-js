'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDatastreamController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().datamodelsSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;

            var finalFilter = {};
            if (ctrl.resourceTypes && angular.isArray(ctrl.resourceTypes) && ctrl.resourceTypes.length > 0) {
                finalFilter.and = [{ in: { 'datamodels.allowedResourceTypes': ctrl.resourceTypes } }];
            }

            if (!search) {
                return finalFilter;
            } else {
                var quickSearchFilter = {
                    'or': [
                        { 'like': { 'datamodels.categories.datastreams.identifier': search } },
                        { 'like': { 'datamodels.categories.datastreams.name': search } },
                        { 'like': { 'datamodels.identifier': search } },
                        { 'like': { 'datamodels.name': search } },
                        { 'like': { 'datamodels.description': search } },
                        { 'like': { 'datamodels.version': search } }
                    ]
                };

                if (finalFilter.and) {
                    finalFilter.and.push(quickSearchFilter);
                } else {
                    return quickSearchFilter;
                }
                return finalFilter;
            }


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
                                    var filter = ctrl.postFilter(_datastream);

                                    if (!filter) {
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
            });
        },
        customSelectors: $api().datamodelsSearchBuilder()
    };

    ctrl.datastreamSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.datastreamRemove = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onRemove(returnObj);
    };

    if (!ctrl.maxResults) {
        ctrl.maxResults = 100;
    }
}]);

angular.module('opengate-angular-js').component('customUiSelectDatastream', {
    templateUrl: 'custom-ui-select/views/custom.ui.select.datastream.html',
    controller: 'customUiSelectDatastreamController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        datastream: '=',
        multiple: '<',
        maxResults: '<',
        isRequired: '=',
        postFilter: '<',
        resourceTypes: '<'
    }
});