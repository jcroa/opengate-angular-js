'use strict';

angular.module('opengate-angular-js').controller('helperUiSelectController', ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
    var $ctrl = this;
    $ctrl.$helper_keys = {};
    $ctrl.labelError = $ctrl.labelError ? $ctrl.labelError : 'Parameter is required';
    $ctrl.labelText = $ctrl.labelText ? $ctrl.labelText : 'Parameter';

    $ctrl.helperTagTransform = function(newTag) {
        return { key: 'custom', value: newTag };
    }

    $ctrl._onCopy = function(copy_obj) {
        $ctrl.$helper_keys = copy_obj.$helper_keys;
        $ctrl.have_helper_keys = true;
        if ($ctrl.helperModel && $ctrl.helperModel.length > 0) {
            $ctrl.$helper_keys['default'] = $ctrl.helperModel;
        }
    }

    $ctrl.$onInit = function() {
        $ctrl.helperCtrl.onCopy = $ctrl._onCopy;
        $ctrl.have_helper_keys = false;
    };

}]);

angular.module('opengate-angular-js').component('helperUiSelect', {
    templateUrl: 'views/custom.ui.select.helper.html',
    transclude: {
        input: '?helperUiSelectInput'
        //,custom: '?helperUiSelectCustom'
    },
    require: {
        helperCtrl: '^^helperDialog'
    },
    controller: 'helperUiSelectController',
    bindings: {
        id: '@',
        name: '@',
        labelText: '@',
        helperModel: '=',
        required: '@',
        multiple: '@',
        labelError: '@'
    }

});