'use strict';


angular.module('opengate-angular-js').controller('customUiSelectEntityController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().entitiesSearchBuilder(),
        filter: function(search) {
            return {
                'or': [
                    { 'like': { 'provision.administration.identifier': search } },
                    { 'like': { 'provision.device.specificType': search } },
                    { 'like': { 'device.specificType': search } },
                    { 'like': { 'provision.asset.specificType': search } },
                    { 'like': { 'provision.device.communicationModules[].subscriber.identifier': search } },
                    { 'like': { 'device.communicationModules[].subscriber.identifier': search } },
                    { 'like': { 'provision.device.communicationModules[].subscriber.mobile.icc': search } },
                    { 'like': { 'device.communicationModules[].subscriber.specificType': search } },
                    { 'like': { 'provision.device.communicationModules[].subscriber.specificType': search } }
                ]
            };
        },
        rootKey: 'entities',
        collection: [],
        customSelectors: $api().entitiesSearchBuilder()
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
        required: '=',
        label: '='
    }

});