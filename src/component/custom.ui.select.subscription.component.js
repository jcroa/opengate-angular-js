'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriptionController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().subscriptionsSearchBuilder().provisioned(),
        filter: function(search) {
            return {
                'or': [
                    { 'like': { 'provision.device.communicationModules[].subscription.identifier': search } },
                    { 'like': { 'device.communicationModules[].subscription.identifier': search } }
                ]
            };
        },
        rootKey: 'devices',
        collection: [],
        customSelectors: $api().subscriptionsSearchBuilder().provisioned()
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

angular.module('opengate-angular-js').component('customUiSelectSubscription', {

    templateUrl: 'views/custom.ui.select.subscription.html',
    controller: 'customUiSelectSubscriptionController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        multiple: '@',
        isRequired: '@'
    }

});