'use strict';


angular.module('opengate-angular-js').controller('customUiSelectEntityController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().devicesSearchBuilder(),
        filter: function(search) {
            return {
                'or': [
                    { 'like': { 'provision.administration.identifier': search } },
                    { 'like': { 'provision.device.specificType': search } },
                    { 'like': { 'device.specificType': search } }
                ]
            };
        },
        rootKey: 'devices',
        collection: [],
        customSelectors: $api().devicesSearchBuilder()
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
}]);

angular.module('opengate-angular-js').component('customUiSelectEntity', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.entity.html',
    controller: 'customUiSelectEntityController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        multiple: '<',
        isRequired: '='
    }

});