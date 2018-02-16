'use strict';


angular.module('opengate-angular-js').controller('customUiSelectProvisionDatastreamController', ['$scope', '$element', '$attrs', '$api', '$q', '$http', '$provisionDatastreamsUtils',
    function ($scope, $element, $attrs, $api, $q, $http, $provisionDatastreamsUtils) {
        var ctrl = this;
        ctrl.filter = 'provision.';

        ctrl.ownConfig = {
            builder: $api().datamodelsSearchBuilder(),
            filter: function (search) {
                ctrl.lastSearch = search;
                var filter = $provisionDatastreamsUtils.getFilter();
                if (ctrl.allowedResourceTypes) {
                    var allowedResourceTypes = ctrl.allowedResourceTypes.replace("\s*,\s*", ",").split(",");
                    filter.and.push({
                        'in': {
                            'datamodels.allowedResourceTypes': allowedResourceTypes
                        }
                    });
                }
                if (search) {
                    var orFilter = {
                        or: [{
                                'like': {
                                    'datamodels.categories.datastreams.identifier': search
                                }
                            },
                            {
                                'like': {
                                    'datamodels.categories.datastreams.name': search
                                }
                            }
                        ]
                    };
                    filter.and.push(orFilter);
                }
                return filter;
            },
            rootKey: 'datamodels',
            collection: [],
            processingData: function (data, collection) {
                //if (!ctrl.lastSearch) return $q(function(ok) { ok([]); });
                return $q(function (ok) {
                    var _datastreams = [];
                    var datamodels = data.data.datamodels;
                    datamodels = $provisionDatastreamsUtils.filterForCoreDatamodelsCatalog(datamodels);
                    angular.forEach(datamodels, function (datamodel, key) {
                        var categories = datamodel.categories;
                        var _datamodel = {
                            identifier: datamodel.identifier,
                            description: datamodel.description,
                            name: datamodel.name,
                            organization: datamodel.organizationName
                        };
                        angular.forEach(categories, function (category, key) {
                            var datastreams = category.datastreams;
                            var _category = {
                                identifier: category.identifier
                            };
                            angular.forEach(datastreams
                                .filter(function (ds) {
                                    if (/^(provision\.).*/.test(ds.identifier)) {
                                        return (ds.identifier.indexOf(ctrl.lastSearch) > -1 && !!ctrl.lastSearch.length) || !ctrl.lastSearch;
                                    }
                                    return false;
                                }),
                                function (datastream, key) {
                                    var _datastream = angular.copy(datastream);
                                    _datastream.datamodel = _datamodel;
                                    _datastream.category = _category;
                                    _datastreams.push(_datastream);
                                });
                        });
                    });
                    angular.copy(_datastreams, collection);
                    ok(collection);
                });
            },
            customSelectors: $api().datamodelsSearchBuilder()
        };

        ctrl.datastreamSelected = function ($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        };

        ctrl.datastreamRemove = function ($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onRemove(returnObj);
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectProvisionDatastream', {
    templateUrl: 'custom-ui-select/views/custom.ui.select.datastream.html',
    controller: 'customUiSelectProvisionDatastreamController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        datastream: '=',
        multiple: '<',
        isRequired: '=',
        allowedResourceTypes: '='
    }

});