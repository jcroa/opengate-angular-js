'use strict';

angular.module('opengate-angular-js')
    .filter('humanize', ['$window', function($window) {
        function hasNumber(myString) {
            return (/\d/.test(myString));
        }

        return function(input, optional1, optional2) {

            var output = input;


            if ($window.S(output).indexOf('$') !== -1) {
                output = $window.S(output).strip('$').s;
            }
            if (angular.isString(output) && !hasNumber(output)) {
                output = $window.S(output).humanize().s;
            }

            return output;

        };

    }])
    .filter('communicationsInterface', function() {
        return function(input) {

            var output = input;

            switch (output) {
                case 'COMMUNICATIONS_MODULE':
                    return 'Communications module';
                case 'SUBSCRIPTION':
                    return 'Mobile line';
                case 'SUBSCRIBER':
                    return 'SIM';
                case 'HOME_OPERATOR':
                    return 'Home Operator';
                case 'REGISTER_OPERATOR':
                    return 'Register Operator';
                case 'ADDRESS':
                    return 'IP';
                case 'SOFTWARE':
                    return 'Software';
                case 'HARDWARE':
                    return 'Hardware';
                case 'entityKey':
                    return 'Identifier';
                default:
                    return output;
            }
        };
    })
    .filter('dateNames', function() {
        var days = {
            'MON': 'Monday',
            'TUE': 'Tuesday',
            'WED': 'Wednesday',
            'THU': 'Thursday',
            'FRI': 'Friday',
            'SAT': 'Saturday',
            'SUN': 'Sunday'
        };
        var months = {
            'JAN': 'January',
            'FEB': 'February',
            'MAR': 'March',
            'APR': 'April',
            'MAY': 'May',
            'JUN': 'June',
            'JUL': 'July',
            'AUG': 'August',
            'SEP': 'September',
            'OCT': 'October',
            'NOV': 'November',
            'DEC': 'December'
        };

        return function(input) {
            return (days[input] || months[input]) || input;
        };
    })

.filter('icons', function() {
        return function(input, optional1, optional2) {
            var output = 'fa fa-info';
            if (input === 'list') {
                output = 'fa fa-list';
            }
            if (input === 'ban') {
                output = 'fa fa-ban';
            }
            if (input === 'laptop') {
                output = 'fa fa-laptop';
            }
            if (input === 'spin') {
                output = 'fa fa-spinner fa-spin';
            }
            if (input === 'unit') {
                output = 'fa fa-plus-square';
            }
            if (input === 'tags') {
                output = 'fa fa-tags';
            }
            return output;
        };

    })
    .filter('codeErrors', function() {
        var errors = {
            '1004': 'At least one valid reference to an entity is required',
            '1005': 'At least one valid reference to an entity is required',
            '1017': 'Tag is not valid. Please, check it.'
        };

        return function(input) {
            return { code: input.code, message: errors[input.code] || input.message };
        };
    })
    .filter('textlength', function() {
        return function(input) {
            if (input && input.length > 30) {
                return input.substring(0, 30) + '...';
            } else {
                return input;
            }
        };
    }).filter('compactid', function() {
        return function(input) {
            if (input && input.indexOf('.') > -1) {
                return input.substring(input.lastIndexOf('.') + 1);
            }
            return input;
        };
    });