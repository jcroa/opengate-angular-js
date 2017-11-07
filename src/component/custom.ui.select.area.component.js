'use strict';


angular.module('opengate-angular-js').controller('customUiSelectAreaController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;

    var andFilter;
    if (ctrl.organization) {
        andFilter = [{ 'eq': { 'areas.organization': ctrl.organization } }];
    }

    ctrl.ownConfig = {
        builder: $api().areasSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;

            if (andFilter) {
                if (search) {
                    andFilter.push({
                        'or': [
                            { 'like': { 'areas.name': search } },
                            { 'like': { 'areas.organization': search } }
                        ]
                    });
                }

                return {
                    'and': andFilter
                };
            } else {
                if (!search) {
                    return {};
                } else {
                    return {
                        'or': [
                            { 'like': { 'areas.name': search } },
                            { 'like': { 'areas.organization': search } }
                        ]
                    };
                }
            }
        },
        rootKey: 'areas',
        collection: [],
        customSelectors: $api().areasSearchBuilder()
    };

    ctrl.areaSelected = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onSelectItem(return_obj);
    };

    ctrl.areaRemove = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onRemove(return_obj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectArea', {
    templateUrl: 'views/custom.ui.select.area.html',
    controller: 'customUiSelectAreaController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        area: '=',
        multiple: '<',
        isRequired: '=',
        organization: '<'
    }
});