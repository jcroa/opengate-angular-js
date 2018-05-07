'use strict';
angular.module('opengate-angular-js')

.directive('datetimeSelect', function() { // ['$scope', '$compile'], function($scope, $compile) {
    return {
        restrict: 'AE',
        templateUrl: 'window-time-select/views/datetime.select.view.html',
        scope: {
            ngModel: '=',
            ngValue: '=',
            ngRequired: '=',
            placeholder: '@',
            format: '@',
            mode: '@'
        },
        controller: function($scope, $element, $attrs, $translate, uibDateParser) {
            if (!$scope.mode || $scope.mode === 'date-time') {
                $scope.inputMode = 'datetime';
            } else {
                $scope.inputMode = $scope.mode;
            }

            $scope.required = !$scope.ngRequired ? false : !!$scope.ngRequired;

            $scope.calendarOpen = false;
            $scope.enableDate = !$scope.inputMode || $scope.inputMode === 'datetime' || $scope.inputMode === 'date';
            $scope.enableTime = $scope.inputMode && ($scope.inputMode === 'datetime' || $scope.inputMode === 'time');

            if (!$scope.format) {
                if ($scope.enableDate && !$scope.enableTime) {
                    $scope.format = 'yyyy-MM-dd';
                    $scope.visibleFormat = 'dd MMMM yyyy';
                } else if (!$scope.enableDate && $scope.enableTime) {
                    $scope.format = 'HH:mm';
                    $scope.visibleFormat = 'HH:mm';
                } else {
                    $scope.format = 'yyyy-MM-ddTHH:mm:ss.sssZ';
                    $scope.visibleFormat = 'dd MMMM yyyy HH:mm';
                }
            } else {
                $scope.visibleFormat = $scope.format;
            }

            $scope.outputFormat = $scope.format;

            // Control del valor de entrada
            if (!angular.isUndefined($scope.ngModel) || !angular.isUndefined($scope.ngValue)) {
                if ($scope.ngValue) {
                    $scope.rawdata = $scope.ngValue;
                } else if ($scope.ngModel) {
                    $scope.rawdata = uibDateParser.parse($scope.ngModel, $scope.outputFormat);
                }
            }

            // General config
            $scope.customButtonBar = {
                show: true,
                now: {
                    show: false
                },
                today: {
                    show: false
                },
                clear: {
                    show: true,
                    text: ' ',
                    cls: 'btn-sm btn-success oux-button-margin fa fa-close'
                },
                date: {
                    show: !$scope.inputMode || $scope.inputMode === 'datetime' || $scope.inputMode === 'date',
                    text: ' ',
                    cls: 'btn-sm btn-info oux-button-margin fa fa-calendar'
                },
                time: {
                    show: $scope.inputMode && ($scope.inputMode === 'datetime' || $scope.inputMode === 'time'),
                    text: ' ',
                    cls: 'btn-sm btn-info oux-button-margin fa fa-clock-o'
                },
                close: {
                    show: true,
                    text: ' ',
                    cls: 'btn-sm btn-success oux-button-margin fa fa-check'
                },
                cancel: {
                    show: false
                }
            };

            $scope.pickerOptions = {
                datePicker: {
                    startingDay: 1,
                    showWeeks: false
                },
                timePicker: {
                    //max: $scope.fromMax,
                    showMeridian: false
                }
            };

            $scope.openCalendar = function() {
                $scope.calendarOpen = true;
            };

            $scope.$watch('rawdata', function(newValue) {
                if (newValue) {
                    $scope.ngModel = uibDateParser.filter(newValue, $scope.outputFormat);
                } else {
                    $scope.ngModel = undefined;
                }
                $scope.ngValue = newValue;
            });

            // Config custom window
            $scope.init = function() {

            };

            $scope.init();

        }
    };
});