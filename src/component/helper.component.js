/**
 * Created by Monica on 12/09/2016.
 */
'use strict';

var _wizard = angular.module('opengate-angular-js');

_wizard.controller('helperDialogController', ['$scope', '$element', '$attrs', '$uibModal', function($scope, $element, $attrs, $uibModal) {
    var $helper = this;
    var style = angular.element('<style title="helper-dialog-style">' +
        'helper-dialog .row-eq-height,.helper-dialog .row-eq-height {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;}' +
        'helper-dialog .vcenter,.helper-dialog .vcenter {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;flex-direction: column;justify-content: center;}' +
        '.helper-dialog .top-buffer {margin-top: 25px;}' +
        '.helper-dialog .custom-ui-select-label {display: none;}' +
        '.helper-dialog .without-padding-top .form-group {margin-top: 0 !important;}' +
        '.helper-dialog .without-padding-top.modal-body h4 {padding-bottom: 0px;}' +
        '</style>');

    var head = angular.element('html head');
    if (head.find('style[title="helper-dialog-style"]').length === 0)
        head.append(style);

    $helper.mode = 'default';
    if ($helper.helperTitle) {
        $helper.mode = 'title';
        if ($helper.helperButton) {
            $helper.mode = 'title_button';
        }
    } else if ($helper.helperButton) {
        $helper.mode = 'button';
    }

    $helper.open = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'helper.view.modal.html',
            controller: 'helperDialogModalController',
            controllerAs: '$ctrl',
            windowClass: 'helper-dialog',
            resolve: {
                helper_id: function() {
                    return $helper.helperId;
                },
                helper_exclusive: function() {
                    return $helper.helperExclusive === 'true';
                },
                specific_type: function() {
                    return $helper.specificType;
                },
                helper_extra: function() {
                    return $helper.helperExtra;
                },
                helper_selected: function() {
                    return $helper.selected;
                }
            }
        });
        //Send result
        modalInstance.result.then(function(helper_result) {
            if (helper_result) {
                $helper.selected = angular.fromJson(helper_result);
                if ($helper.onCopy) {
                    $helper.onCopy({ $helper_keys: helper_result });
                }

                if ($helper.onMulti && angular.isArray($helper.onMulti)) {
                    angular.forEach($helper.onMulti, function(_onCopy, idx) {
                        if (angular.isFunction(_onCopy))
                            _onCopy({ $helper_keys: helper_result });
                    });
                }
            } else {
                console.warn('Nothing selected on modal');
            }
        }, function() {});
    };
}]);

_wizard.controller('helperDialogModalController', ['$scope', '$uibModalInstance', 'helper_id', 'helper_exclusive', 'specific_type', 'helper_extra', 'helper_selected',
    function($scope, $uibModalInstance, helper_id, helper_exclusive, specific_type, helper_extra, helper_selected) {
        var $ctrl = this;
        $ctrl.helper_extra = helper_extra;
        $ctrl.helper_id = helper_id;

        if (helper_id.trim().toLowerCase() === 'datastream') {
            $ctrl['entityIsOpen'] = true;
            $ctrl['entityIsExclusive'] = $ctrl.helper_exclusive = helper_exclusive;
        } else {
            $ctrl[helper_id + 'IsOpen'] = true;
            $ctrl[helper_id + 'IsExclusive'] = $ctrl.helper_exclusive = helper_exclusive;
        }

        $ctrl.helper_keys = {};
        $ctrl.specific_type = specific_type;
        var events = [];

        //config map helper
        $ctrl.map = {
            center: {
                lat: helper_selected && helper_selected.latitude ? helper_selected.latitude : 40.095,
                lng: helper_selected && helper_selected.longitude ? helper_selected.longitude : -3.823,
                zoom: helper_selected && helper_selected.zoom ? helper_selected.zoom : 4
            },
            markers: {},
            events: {
                markers: {
                    enable: ['dragend', 'click'],
                    logic: 'emit'
                },
                map: {
                    enable: ['click'],
                    logic: 'emit'
                }
            }
        };

        if (helper_selected && helper_selected.latitude) {
            $ctrl.map.markers = {
                marker: {
                    lat: helper_selected.latitude,
                    lng: helper_selected.longitude,
                    draggable: true,
                    focus: true,
                    message: 'Drag me to move. Click me to remove'
                }
            };
            setPosition(helper_selected.latitude, helper_selected.longitude, helper_selected.zoom);
        }

        // contorl de elementos de entrada
        if (helper_extra) {
            // configuración extra de mapa
            if (helper_extra.map) {
                var markers = {
                    marker: {
                        draggable: true,
                        focus: true,
                        message: 'Drag me to move. Click me to remove'
                    }
                };
                $ctrl.map = _.merge($ctrl.map, helper_extra.map, markers);
            }
        }

        function setPosition(lat, lng, zoom) {
            $ctrl.helper_keys['map'] = {
                latitude: lat,
                longitude: lng,
                zoom: zoom
            };
        };

        events.push(
            $scope.$on('leafletDirectiveMarker.map-marker.click', function(event, args) {
                delete $ctrl.helper_keys.map;
                $ctrl.map.markers = {};
            }),
            $scope.$on('leafletDirectiveMap.map-marker.click', function(event, args) {
                var latlng = args.leafletEvent.latlng;
                $ctrl.map.markers = {
                    marker: {
                        lat: latlng.lat,
                        lng: latlng.lng,
                        draggable: true,
                        focus: true,
                        message: 'Drag me to move. Click me to remove'
                    }
                };
                setPosition(latlng.lat, latlng.lng, args.leafletObject._zoom);
            }),
            $scope.$on('leafletDirectiveMarker.map-marker.dragend', function(event, args) {
                var point = args.leafletEvent.target._leaflet_events.dragend[0].context._latlng;
                setPosition(point.lat, point.lng, args.leafletObject._zoom);
            })
        );

        //config datastream
        $ctrl.datastream = {};
        if (helper_selected && helper_selected.datastreamId) {
            $ctrl.helper_keys['datastream'] = { datastreamId: helper_selected.datastreamId };
            $ctrl.datastream = {
                selected: [{ identifier: helper_selected.datastreamId }]
            };
        }
        $scope.onSelectDatastreamKey = function($item, $model) {
            $ctrl.helper_keys['datastream'] = { datastreamId: $item.identifier };
        };

        $scope.onDeleteDatastreamKey = function() {
            delete $ctrl.helper_keys.datastream;
        };

        //config entity
        $ctrl.entity = {};
        if (helper_selected && helper_selected.entityKey) {
            $ctrl.helper_keys['entity'] = {
                entityKey: helper_selected.entityKey
            };
            $ctrl.entity = {
                selected: [{
                    provision: {
                        administration: {
                            identifier: {
                                _current: {
                                    value: helper_selected.entityKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $scope.onSelectEntityKey = function($item, $model) {
            // $ctrl.helper_keys['entity'] = { entityKey: $item.id };
            $ctrl.helper_keys['entity'] = {
                entityKey: $item.provision.administration.identifier._current.value
            };
        };

        $scope.onDeleteEntityKey = function() {
            delete $ctrl.helper_keys.entity;
        };

        //config subscriber
        $ctrl.subscriber = {};
        if (helper_selected && helper_selected.subscriberKey) {
            $ctrl.helper_keys['subscriberKey'] = {
                subscriberKey: helper_selected.subscriberKey
            };
            $ctrl.subscriber = {
                selected: [{
                    provision: {
                        subscriber: {
                            identifier: {
                                _current: {
                                    value: helper_selected.subscriberKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $scope.onSelectSubscriberKey = function($item, $model) {
            $ctrl.helper_keys['subscriber'] = $item;
        };

        $scope.onDeleteSubscriberKey = function() {
            delete $ctrl.helper_keys.subscriber;
        };

        //config entity
        $ctrl.subscription = {};

        if (helper_selected && helper_selected.subscriptionKey) {
            $ctrl.helper_keys['subscriptionKey'] = {
                subscriptionKey: helper_selected.subscriptionKey
            };
            $ctrl.subscription = {
                selected: [{
                    provision: {
                        subscription: {
                            identifier: {
                                _current: {
                                    value: helper_selected.subscriptionKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $scope.onSelectSubscriptionKey = function($item, $model) {
            $ctrl.helper_keys['subscription'] = $item;
        };

        $scope.onDeleteSubscriptionKey = function() {
            delete $ctrl.helper_keys.subscription;
        };

        $ctrl.canApply = function() {
            return Object.keys($ctrl.helper_keys).length > 0;
        };

        //Modal methods
        $ctrl.ok = function(helper) {
            if (helper) {
                $uibModalInstance.close($ctrl.helper_keys[helper]);
            } else {
                var finalKeys = {};
                angular.forEach($ctrl.helper_keys, function(value, key) {
                    if (key.trim().toLowerCase() === 'subscriber' || key.trim().toLowerCase() === 'subscription') {
                        var identifier = value.provision[key.trim().toLowerCase()].identifier._current.value;
                        finalKeys[key.trim().toLowerCase() + 'Key'] = identifier;
                    } else {
                        angular.forEach(value, function(finalValue, finalkey) {
                            finalKeys[finalkey] = finalValue;
                        });
                    }
                });

                $uibModalInstance.close(finalKeys);
            }
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        //clear evetns
        $scope.$on('destroy', function() {
            for (var eventToDestroy in events) {
                eventToDestroy();
            }
        });
    }
]);


_wizard.component('helperDialog', {
    transclude: true,
    templateUrl: 'views/helper.view.html',
    controller: 'helperDialogController',
    controllerAs: '$helper',
    bindings: {
        onCopy: '&',
        helperId: '@',
        specificType: '@',
        helperButton: '@',
        helperTitle: '@',
        helperExclusive: '@',
        helperExtra: '<',
        modalTemplate: '@',
        modalController: '@',
        onMulti: '<'
    }
});