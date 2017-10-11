'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriberController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().subscribersSearchBuilder().provisioned(),
        filter: function(search) {
            return {
                'or': [
                    { 'like': { 'provision.device.communicationModules[].subscriber.identifier': search } },
                    { 'like': { 'device.communicationModules[].subscriber.identifier': search } }
                ]
            };
        },
        rootKey: 'devices',
        collection: [],
        customSelectors: $api().subscribersSearchBuilder().provisioned()
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
}]);

angular.module('opengate-angular-js').component('customUiSelectSubscriber', {

    templateUrl: 'views/custom.ui.select.subscriber.html',
    controller: 'customUiSelectSubscriberController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        multiple: '@',
        isRequired: '@'
    }

});