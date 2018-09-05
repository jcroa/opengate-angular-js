'use strict';


angular.module('opengate-angular-js').controller('customUiSelectEntityController', ['$scope', '$element', '$attrs', '$api',
    function($scope, $element, $attrs, $api) {
        var ctrl = this;

        ctrl.ownConfig = {
            builder: $api().entitiesSearchBuilder(),
            filter: function(search) {
                return {
                    'or': [
                        { 'like': { 'provision.administration.identifier': search } },
                        { 'like': { 'provision.device.specificType': search } },
                        { 'like': { 'device.specificType': search } },
                        { 'like': { 'provision.entity.specificType': search } },
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
            if (ctrl.multiple) {
                var identifierTmp = ctrl.ngModel || [];

                angular.forEach(ctrl.entity, function(entityTmp) {
                    identifierTmp.push(entityTmp.provision.administration.identifier._current.value);
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

        ctrl.entityRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }

            ctrl.ngModel = null;
        };

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
                        ctrl.entity = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.entity.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: { value: idTmp }
                                        }
                                    }
                                }
                            })
                        });
                    }
                } else {
                    ctrl.entity = [{
                        provision: {
                            administration: {
                                identifier: {
                                    _current: { value: ctrl.identifier }
                                }
                            }
                        }
                    }];
                }
            } else {
                ctrl.entity = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectEntity', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.entity.html',
    controller: 'customUiSelectEntityController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        identifier: '<?',
        multiple: '<',
        required: '=',
        label: '<',
        action: '<?',
        disabled: '<?',
        ngModel: '=?'
    }

});