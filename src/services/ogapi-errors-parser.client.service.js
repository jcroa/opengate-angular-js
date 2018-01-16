'use strict';
angular.module('opengate-angular-js').service('$ogapiErrorParser', ['jsonPath',
    // EXAMPLE
    // [{
    //     "code": 20481,
    //     "message": "Filter path does not exists",
    //     "context": [{
    //         "name": "Filter field path",
    //         "value": "datamodel.organizationName"
    //     }]
    // }]

    function(jsonPath) {
        return {
            toString: function(error, errorSeparatorString) {
                var errorMessage = '';
                var errors = jsonPath(error, '$..message');

                for (var i = 0; i < errors.length; i++) {
                    errorMessage += errors[i] + (errorSeparatorString ? errorSeparatorString : '\n');
                }

                return errorMessage;
            },
            toStringArray: function(error) {
                var errorMessage = jsonPath(error, '$..message');
                return errorMessage;
            }
        };
    }
]);