'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDeviceController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
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

    ctrl.deviceSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.deviceRemove = function($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectDevice', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.device.html',
    controller: 'customUiSelectDeviceController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        device: '=',
        multiple: '<',
        required: '='
    }

});