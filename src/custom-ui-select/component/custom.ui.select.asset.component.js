'use strict';


angular.module('opengate-angular-js').controller('customUiSelectAssetController', ['$scope', '$element', '$attrs', '$api', '$doActions', '$translate',
    function($scope, $element, $attrs, $api, $doActions, $translate) {
        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().assetsSearchBuilder(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.administration.identifier': search } },
                        { 'like': { 'provision.asset.specificType': search } }
                    ]
                };

                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'asset.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.asset.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    };
                }

                return filter;
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

        if (!ctrl.action) {
            ctrl.action = {
                title: $translate.instant('BUTTON.TITLE.NEW_ASSET'),
                icon: 'glyphicon glyphicon-plus-sign',
                action: function() {
                    var actionData = {};
                    if (!!ctrl.specificType) {
                        actionData = {
                            resourceType: { _current: { value: 'entity.asset' } },
                            provision: { asset: { specificType: { _current: { value: ctrl.specificType } } } }
                        }
                    }
                    $doActions.executeModal('createAsset', actionData);
                },
                permissions: 'manageEntity'
            };
        }

    }
]);

angular.module('opengate-angular-js').component('customUiSelectAsset', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.asset.html',
    controller: 'customUiSelectAssetController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        asset: '=',
        multiple: '<',
        required: '=',
        label: '=',
        action: '=?',
        specificType: '@?'
    }

});