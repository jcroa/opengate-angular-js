'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDomainController', ['$scope', '$element', '$attrs', '$api', function ($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().domainsSearchBuilder(),
        rootKey: 'domains',
        collection: [],
        filter: function (search) {
            return {
                'or': [{
                        'like': {
                            'domain.name': search
                        }
                    },
                    {
                        'like': {
                            'domain.description': search
                        }
                    }
                ]
            };
        },
        customSelectors: $api().domainsSearchBuilder()
    };

    ctrl.domainSelected = function ($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onSelectItem(return_obj);
    };

    ctrl.domainRemove = function ($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectDomain', {

    templateUrl: 'views/custom.ui.select.domain.html',
    controller: 'customUiSelectDomainController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        domain: '=',
        multiple: '<',
        isRequired: '='
    }

});