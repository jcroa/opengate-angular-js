'use strict';
angular.module('opengate-angular-js').service('$ogapiErrorParser', [
    // EXAMPLE
    // [{
    //     "code": 20481,
    //     "description": "Filter path does not exists",
    //     "context": [{
    //         "name": "Filter field path",
    //         "value": "datamodel.organizationName"
    //     }]
    // }]

    function() {
        return {
            toString: function(error, errorSeparatorString) {
                var errorMessage = '';
                if (error.data && (error.data.errors && error.data.errors.length > 0)) {
                    for (var i = 0; i < error.data.errors.length; i++) {
                        errorMessage += error.data.errors[i].message + (errorSeparatorString ? errorSeparatorString : '\n');
                    }
                } else if (error.data && error.data.length > 0) {
                    for (var i = 0; i < error.data.length; i++) {
                        errorMessage += error.data[i].description + (errorSeparatorString ? errorSeparatorString : '\n');
                    }
                } else {
                    errorMessage = error;
                }

                return errorMessage;
            },
            toStringArray: function(error) {
                var errorMessage = [];
                if (error.data && (error.data.errors && error.data.errors.length > 0)) {
                    for (var i = 0; i < error.data.errors.length; i++) {
                        errorMessage.push(error.data.errors[i].message);
                    }
                } else if (error.data && error.data.length > 0) {
                    for (var i = 0; i < error.data.length; i++) {
                        errorMessage.push(error.data[i].description);
                    }
                } else {
                    errorMessage.push(error.data);
                }

                return errorMessage;
            }
        };
    }
]);