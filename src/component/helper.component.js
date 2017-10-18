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
                }
            }
        });
        //Send result
        modalInstance.result.then(function(helper_result) {
            if (helper_result) {
                $helper.selected = angular.fromJson(helper_result);
                if ($helper.onCopy)
                    $helper.onCopy({ $helper_keys: helper_result });

            } else {
                console.warn('Nothing selected on modal');
            }
        }, function() {});
    };
}]);

_wizard.controller('helperDialogModalController', ['$scope', '$uibModalInstance', 'helper_id', 'helper_exclusive', 'specific_type', function($scope, $uibModalInstance, helper_id, helper_exclusive, specific_type) {
    var $ctrl = this;
    $ctrl.helper_id = helper_id;
    $ctrl[helper_id + 'IsOpen'] = true;
    $ctrl[helper_id + 'IsExclusive'] = $ctrl.helper_exclusive = helper_exclusive;
    $ctrl.helper_keys = {};
    $ctrl.specific_type = specific_type;
    var events = [];

    //config map helper
    $ctrl.map = {
        center: {
            lat: 40.095,
            lng: -3.823,
            zoom: 4
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

    function setPosition(lat, lng) {
        $ctrl.helper_keys['map'] = {
            latitude: lat,
            longitude: lng
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
            setPosition(latlng.lat, latlng.lng);
        }),
        $scope.$on('leafletDirectiveMarker.map-marker.dragend', function(event, args) {
            var point = args.leafletEvent.target._leaflet_events.dragend[0].context._latlng;
            setPosition(point.lat, point.lng);
        })
    );

    //config datastream
    $ctrl.datastream = {};
    $scope.onSelectDatastreamKey = function($item, $model) {
        $ctrl.helper_keys['datastream'] = { datastreamId: $item.identifier };
    };

    $scope.onDeleteDatastreamKey = function() {
        delete $ctrl.helper_keys.datastream;
    };

    //config entity
    $ctrl.entity = {};
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
    $scope.onSelectSubscriberKey = function($item, $model) {
        $ctrl.helper_keys['subscriber'] = $item;
    };

    $scope.onDeleteSubscriberKey = function() {
        delete $ctrl.helper_keys.subscriber;
    };

    //config entity
    $ctrl.subscription = {};
    $scope.onSelectSubscriptionKey = function($item, $model) {
        $ctrl.helper_keys['subscription'] = $item;
    };

    $scope.onDeleteSubscriptionKey = function() {
        delete $ctrl.helper_keys.subscription;
    };

    //Modal methods
    $ctrl.ok = function(helper) {
        $uibModalInstance.close($ctrl.helper_keys[helper]);
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
}]);


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
        modalTemplate: '@',
        modalController: '@'
    }
});