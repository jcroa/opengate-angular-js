'use strict';


angular.module('opengate-angular-js').controller('customUiSelectBundleController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;

    ctrl.ownConfig = {
        builder: $api().bundlesSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;

            if (!search) {
                return {};
            } else {
                return {
                    'or': [
                        { 'like': { 'bundles.name': search } },
                        { 'like': { 'bundles.version': search } },
                        { 'like': { 'bundles.description': search } }
                    ]
                };
            }
        },
        rootKey: 'bundles',
        collection: [],
        customSelectors: $api().bundlesSearchBuilder()
    };

    ctrl.bundleSelected = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onSelectItem(return_obj);
    };

    ctrl.bundleRemove = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onRemove(return_obj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectBundle', {
    templateUrl: 'views/custom.ui.select.bundle.html',
    controller: 'customUiSelectBundleController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        bundle: '=',
        multiple: '<',
        isRequired: '='
    }
});