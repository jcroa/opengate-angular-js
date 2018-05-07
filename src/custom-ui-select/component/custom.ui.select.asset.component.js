'use strict';


angular.module('opengate-angular-js').controller('customUiSelectAssetController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().assetsSearchBuilder(),
        filter: function(search) {
            return {
                'or': [
                    { 'like': { 'provision.administration.identifier': search } },
                    { 'like': { 'provision.asset.specificType': search } }
                ]
            };
        },
        rootKey: 'assets',
        collection: [],
        customSelectors: $api().assetsSearchBuilder()
    };

    ctrl.assetSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.assetRemove = function($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectAsset', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.asset.html',
    controller: 'customUiSelectAssetController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        asset: '=',
        multiple: '<',
        required: '='
    }

});