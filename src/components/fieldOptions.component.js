'use strict';


angular.module('opengate-angular-js').controller('fieldOptionsController', ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
    var ctrl = this;
}]);

angular.module('opengate-angular-js').component('fieldOptions', {

    templateUrl: 'components/views/fieldOptions.html',
    controller: 'fieldOptionsController',
    bindings: {
        multiple: '<',
        required: '<'
    }

});