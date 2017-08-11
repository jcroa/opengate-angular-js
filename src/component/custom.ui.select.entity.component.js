'use strict';


angular.module('opengate-angular-js').controller('helperUiSelectController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().devicesSearchBuilder().onCollected().onProvisioned(),
        filter: function(search) {
            return {
                'or': [
                    { 'like': { 'entityId': search } },
                    { 'like': { 'entityType': search } }
                ]
            };
        },
        rootKey: 'devices',
        collection: [],
        customSelectors: $api().devicesSearchBuilder().onCollected().onProvisioned()
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

angular.module('opengate-angular-js').component('customUiSelectEntity', {

    templateUrl: 'views/custom.ui.select.entity.html',
    controller: 'helperUiSelectController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        multiple: '@',
        isRequired: '@'
    }

});