'use strict';


angular.module('opengate-angular-js').controller('customUiSelectAssetController', ['$scope', '$element', '$attrs', '$api', '$doActions', '$translate', '$jsonFinderHelper', 'jsonPath',
    function ($scope, $element, $attrs, $api, $doActions, $translate, $jsonFinderHelper, jsonPath) {
        var selectBuilder = $api().newSelectBuilder();
        var SE = $api().SE;

        selectBuilder.add(SE.element('provision.administration.identifier', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.administration.organization', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.administration.channel', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('resourceType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.asset.identifier', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.asset.name', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.asset.specificType', [{
            field: 'value'
        }]));

        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().assetsSearchBuilder().select(selectBuilder),
            filter: function (search) {
                var filter = {
                    'or': [{
                            'like': {
                                'provision.administration.identifier': search
                            }
                        },
                        {
                            'like': {
                                'provision.asset.specificType': search
                            }
                        },
                        {
                            'like': {
                                'asset.specificType': search
                            }
                        }
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
            customSelectors: $api().assetsSearchBuilder(),
            specificType: ctrl.specificType
        };

        ctrl.assetSelected = function ($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.asset, function (assetTmp) {
                    identifierTmp.push(assetTmp.provision.administration.identifier._current.value);
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item.provision.administration.identifier._current.value;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.assetRemove = function ($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }
            ctrl.ngModel = undefined;

        };

        if (!ctrl.actions) {
            ctrl.actions = [{
                title: ctrl.ownConfig.specificType || $translate.instant('BUTTON.TITLE.NEW_ASSET'),
                icon: 'glyphicon glyphicon-plus-sign',
                action: function () {
                    var actionData = {};
                    if (!!ctrl.specificType) {
                        actionData = {
                            resourceType: {
                                _current: {
                                    value: 'entity.asset'
                                }
                            },
                            provision: {
                                asset: {
                                    specificType: {
                                        _current: {
                                            value: ctrl.specificType
                                        }
                                    }
                                }
                            }
                        };
                    }
                    $doActions.executeModal('createAsset', actionData, function (result) {
                        if (result && result.length > 0) {
                            ctrl.asset = !ctrl.asset ? [] : ctrl.asset;
                            ctrl.asset.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: {
                                                value: result[0].identifier
                                            }
                                        }
                                    },
                                    asset: {
                                        identifier: {
                                            _current: {
                                                value: result[0].identifier
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                },
                permissions: 'manageEntity'
            }];
        }

        ctrl.$onChanges = function (changesObj) {
            if (changesObj && changesObj.identifier) {
                mapIdentifier(changesObj.identifier.currentValue);
            }
        };

        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }

        if (ctrl.identifier) {
            mapIdentifier(ctrl.identifier);
        }

        function mapIdentifier(identifierSrc) {
            var identifier = identifierSrc;
            if (identifier) {
                if (identifier._current) {
                    identifier = identifier._current.value;
                }

                if (ctrl.multiple) {
                    if (angular.isArray(identifier)) {
                        ctrl.asset = [];

                        angular.forEach(identifier, function (idTmp) {
                            ctrl.asset.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        }
                                    },
                                    asset: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }

                } else {
                    ctrl.asset = [{
                        provision: {
                            administration: {
                                identifier: {
                                    _current: {
                                        value: ctrl.identifier
                                    }
                                }
                            },
                            asset: {
                                identifier: {
                                    _current: {
                                        value: ctrl.identifier
                                    }
                                }
                            }
                        }
                    }];
                }
            } else {
                ctrl.asset = [];
            }
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
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '=',
        action: '=?',
        specificType: '@?',
        disabled: '<?',
        ngModel: '=?'
    }

});