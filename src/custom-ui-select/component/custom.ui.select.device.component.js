'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDeviceController', ['$scope', '$element', '$attrs', '$api', '$translate', '$doActions',
    function($scope, $element, $attrs, $api, $translate, $doActions) {
        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().devicesSearchBuilder(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.administration.identifier': search } },
                        { 'like': { 'provision.device.specificType': search } },
                        { 'like': { 'device.specificType': search } }
                    ]
                };

                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    };
                }

                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().devicesSearchBuilder()
        };

        ctrl.deviceSelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.device, function(deviceTmp) {
                    identifierTmp.push(deviceTmp.provision.administration.identifier._current.value);
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

        ctrl.deviceRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }
            ctrl.ngModel = null;

        };

        if (!ctrl.action) {
            ctrl.action = {
                title: $translate.instant('BUTTON.TITLE.NEW_DEVICE'),
                icon: 'glyphicon glyphicon-plus-sign',
                action: function() {
                    var actionData = {};
                    if (!!ctrl.specificType) {
                        actionData = {
                            resourceType: { _current: { value: 'entity.device' } },
                            provision: { device: { specificType: { _current: { value: ctrl.specificType } } } }
                        }
                    }
                    $doActions.executeModal('createDevice', actionData);
                },
                permissions: 'manageEntity'
            };
        }

        ctrl.$onChanges = function(changesObj) {
            if (changesObj && changesObj.identifier) {
                mapIdentifier(changesObj.identifier.currentValue);
            }
        };

        if (ctrl.identifier) {
            mapIdentifier(ctrl.identifier);
        }

        function mapIdentifier(identifierSource) {
            var identifier = identifierSource;

            if (identifier) {
                if (identifier._current) {
                    identifier = identifier._current.value;
                }
                if (ctrl.multiple) {
                    if (angular.isArray(identifier)) {
                        ctrl.device = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.device.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: { value: idTmp }
                                        }
                                    },
                                    device: {
                                        identifier: {
                                            _current: { value: idTmp }
                                        }
                                    }
                                }
                            })
                        });
                    }
                } else {
                    ctrl.device = [{
                        provision: {
                            administration: {
                                identifier: {
                                    _current: { value: ctrl.identifier }
                                }
                            },
                            device: {
                                identifier: {
                                    _current: { value: ctrl.identifier }
                                }
                            }
                        }
                    }];
                }
            } else {
                ctrl.device = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectDevice', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.device.html',
    controller: 'customUiSelectDeviceController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        device: '=',
        identifier: '<?',
        multiple: '<',
        required: '=',
        label: '=',
        action: '=?',
        specificType: '@?',
        disabled: '<?',
        ngModel: '=?'
    }

});