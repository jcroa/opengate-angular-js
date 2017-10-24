'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriberController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor',
    function($scope, $element, $attrs, $api, $entityExtractor) {

        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().subscribersSearchBuilder().provisioned(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.device.communicationModules[].subscriber.identifier': search } },
                        { 'like': { 'device.communicationModules[].subscriber.identifier': search } },
                        { 'like': { 'provision.device.communicationModules[].subscriber.mobile.icc': search } }
                    ]
                };
                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.communicationModules[].subscriber.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.communicationModules[].subscriber.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().subscribersSearchBuilder().provisioned(),
            processingData: $entityExtractor.extractSubscribers
        };

        ctrl.entitySelected = function($item, $model) {
            var return_obj = {};
            return_obj['$item'] = $item;
            return_obj['$model'] = $model;
            ctrl.onSelectItem(return_obj);
        };

        ctrl.entityRemove = function($item, $model) {
            ctrl.onRemove($item, $model);
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectSubscriber', {

    templateUrl: 'views/custom.ui.select.subscriber.html',
    controller: 'customUiSelectSubscriberController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        multiple: '@',
        specificType: '@',
        isRequired: '@'
    }

});