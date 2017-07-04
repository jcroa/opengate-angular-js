'use strict';
angular.module('opengate-angular-js').service('$ogapiErrorParser', [
    function() {
        return {
            toString: function(error) {
                var errorMessage = '';
                if (error.data && (error.data.errors && error.data.errors.length > 0)) {
                    for (var i = 0; i < error.data.errors.length; i++) {
                        errorMessage += error.data.errors[i].message + '\n';
                    }
                } else if (!error.data) {
                    errorMessage = error;
                } else {
                    errorMessage = error.data;
                }

                return errorMessage;
            },
            toStringArray: function(error) {
                var errorMessage = [];
                if (error.data && (error.data.errors && error.data.errors.length > 0)) {
                    for (var i = 0; i < error.data.errors.length; i++) {
                        errorMessage.push(error.data.errors[i].message);
                    }
                } else if (!error.data) {
                    errorMessage.push(error);
                } else {
                    errorMessage.push(error.data);
                }

                return errorMessage;
            }
        };
    }
]);