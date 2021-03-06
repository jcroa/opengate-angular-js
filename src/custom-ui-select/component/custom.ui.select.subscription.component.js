'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriptionController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor',
    function($scope, $element, $attrs, $api, $entityExtractor) {
        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().subscriptionsSearchBuilder().provisioned(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.device.communicationModules[].subscription.identifier': search } },
                        { 'like': { 'device.communicationModules[].subscription.identifier': search } }
                    ]
                };
                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.communicationModules[].subscription.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.communicationModules[].subscription.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    };
                }

                if (ctrl.excludeDevices) {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'resourceType': 'entity.subscription'
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'resourceType': 'entity.subscription'
                                    }
                                }
                            ]
                        };
                    }
                }

                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().subscriptionsSearchBuilder().provisioned(),
            processingData: $entityExtractor.extractSubscriptions
        };

        ctrl.entitySelected = function($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        };

        ctrl.entityRemove = function($item, $model) {
            ctrl.onRemove($item, $model);
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectSubscription', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.subscription.html',
    controller: 'customUiSelectSubscriptionController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        specificType: '@',
        multiple: '<',
        required: '=',
        excludeDevices: '='
    }

});