(function(window, undefined) {'use strict';


angular.module('opengate-angular-js', []);
angular.module("opengate-angular-js").run(["$templateCache", function($templateCache) {$templateCache.put("views/window-time.select.view.html","<div class=window-time-container><button type=button class=\"btn btn-xs\" ng-class=oneDayClass ng-click=oneDay()>Last day</button> <button type=button class=\"btn btn-xs\" ng-class=oneWeekClass ng-click=oneWeek()>Last 7 days</button> <button type=button class=\"btn btn-xs\" ng-class=oneMonthClass ng-click=oneMonth()>Last 30 days</button> <button type=button class=\"btn btn-xs\" ng-class=customClass ng-click=custom()>Custom</button> <button type=button class=\"btn btn-xs btn-info\" ng-if=customEnabled ng-disabled=!!errorCustomWindow ng-click=applyCustom()>Apply</button> <button type=button class=\"btn btn-xs btn-info\" ng-if=filterApplied ng-click=clear()>Clear</button><div ng-if=customEnabled class=window-time-body><div class=row><div class=col-xs-12><p class=input-group><label class=control-label>From: {{fromDate | date:\'fullDate\'}}</label> <input readonly datepicker-options=fromOptions type=text class=form-control show-button-bar=false uib-datepicker-popup={{format}} ng-model=date.from is-open=fromPopup.opened ng-required=true close-text=Close ng-change=fromChange()> <span class=input-group-btn><a class=\"btn btn-sm\" ng-click=fromOpen()><i class=\"glyphicon glyphicon-calendar\"></i></a></span></p></div><div class=col-xs-12><div uib-timepicker max=fromMax ng-model=date.from show-meridian=false ng-change=fromChange()></div></div></div><div class=row><div class=col-xs-12><p class=input-group><label class=control-label>To: {{toDate | date:\'fullDate\'}}</label> <input readonly datepicker-options=toOptions type=text class=form-control show-button-bar=false uib-datepicker-popup={{format}} ng-model=date.to is-open=toPopup.opened ng-required=true close-text=Close ng-change=toChange()> <span class=input-group-btn><button type=button class=\"btn btn-sm\" ng-click=toOpen()><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div><div class=col-xs-12><div uib-timepicker max=toMax min=toMin ng-model=date.to show-meridian=false ng-change=toChange()></div></div></div><alert type=danger ng-show=errorCustomWindow class=text-danger style=\"display: block;text-align: center;\"><span ng-bind=errorCustomWindow></span></alert></div></div>");}]);


angular.module('opengate-angular-js')
    .service('$ogapi', function() {
        function OgApiService() {
            var ogapi = undefined;
            this.api = function() {
                if (typeof ogapi !== "undefined") return ogapi;
                else throw new Error("Must invoke create([options]) function before api() function");
            };
            this.create = function(options) {
                return ogapi = new window.OpenGateAPI(options);
            };
            this.release = function() {
                ogapi = undefined;
                return this;
            };
        }
        return new OgApiService();
    });

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


// Filter service
angular.module('opengate-angular-js')
    .factory('Filter', ['$window', '$sce', '$q',
        function($window, $sce, $q) {
            //var customSelectors = [];
            var conditionSelectors = [];
            //var separators = [' ', '\n', '-', '!', '=', '~', '>', '<', '&', 'or', 'and', '(', ')', 'eq', 'neq', '==', 'like', 'gt', 'gte', 'lt', 'lte', '<=', '>='];
            var separators = [' ', '\n', '-', '!', '=', '~', '>', '<', '&', 'or', 'and', ') '];

            function suggest_field(term, customSelectors) {
                var results = [];
                var i, customSelector, conditionSelector;

                if (!term || term.trim().length === 0) {
                    for (i = 0; i < customSelectors.length && results.length < 8; i++) {
                        customSelector = customSelectors[i];
                        results.push({ label: $sce.trustAsHtml(highlight(customSelector, term)), value: customSelector });
                    }

                    for (i = 0; i < conditionSelectors.length && results.length < 12; i++) {
                        conditionSelector = conditionSelectors[i];
                        results.push({ label: $sce.trustAsHtml(highlight(conditionSelector, term)), value: conditionSelector });
                    }
                } else {
                    var q = term.toLowerCase().trim();

                    // Find first 10 allSelectors that start with `term`.
                    for (i = 0; i < customSelectors.length && results.length < 8; i++) {
                        customSelector = customSelectors[i];
                        if (customSelector.toLowerCase().indexOf(q) > -1)
                            results.push({ label: $sce.trustAsHtml(highlight(customSelector, term)), value: customSelector });
                    }

                    for (i = 0; i < conditionSelectors.length && results.length < 12; i++) {
                        conditionSelector = conditionSelectors[i];
                        if (conditionSelector.toLowerCase().indexOf(q) > -1)
                            results.push({ label: $sce.trustAsHtml(highlight(conditionSelector, term)), value: conditionSelector });
                    }
                }

                return results;
            }


            function suggest_field_delimited(term, target_element, query) {
                var deferred = $q.defer();
                query.findFields(term).then(function(fields) {
                    var values = fields;
                    var idx = -1;

                    if (target_element.selectionStart) {
                        idx = target_element.selectionStart - 1;
                    } else if (target_element.prop) {
                        idx = target_element.prop('selectionStart') - 1;
                    }

                    if (idx < 0) return;

                    var suggestions;
                    if (term !== undefined && term !== '') {
                        var ix = -1;
                        for (; idx >= 0 && ix === -1; idx--) {
                            if (separators.indexOf(term[idx]) > -1) {
                                ix = idx + 1;
                            } else if (idx === 0) {
                                ix = idx;
                            }
                        }

                        var ex = ix;

                        for (idx = ix; idx < term.length && ex === ix; idx++) {
                            if (separators.indexOf(term[idx]) > -1) {
                                ex = idx + 1;
                            } else if (idx === (term.length - 1)) {
                                ex = idx + 1;
                            }
                        }

                        suggestions = suggest_field(term.substring(ix, ex), values);
                    } else {
                        suggestions = suggest_field();
                    }

                    suggestions.forEach(function(s) {
                        s.value = s.value;
                    });
                    deferred.resolve(suggestions);

                }).catch(function(err) {
                    console.error(err);
                    deferred.reject(err);
                });



                return deferred.promise;
            }

            function highlight(str, term) {
                var highlight_regex = new RegExp('(' + term + ')', 'gi');
                return str.replace(highlight_regex,
                    '<span class="text-info">$1</span>');
            }



            function parseQuery(string) {
                var promises = '';
                var defered = $q.defer();
                var promise = defered.promise;
                var parse_tree = null;
                var query = {
                    text: [],
                    offsets: [],
                    filter: {}
                };
                try {
                    //job.id like "1e" or (job.id like 189 and job.status== FINISHED) and job.status== CANCELED
                    $window.jsep.addBinaryOp('and', 1);
                    $window.jsep.addBinaryOp('&&', 1);
                    $window.jsep.addBinaryOp('||', 2);
                    $window.jsep.addBinaryOp('or', 2);
                    $window.jsep.addBinaryOp('in', 3);
                    $window.jsep.addBinaryOp('~', 6);
                    $window.jsep.addBinaryOp('=', 6);

                    $window.jsep.addBinaryOp('like', 6);
                    $window.jsep.addBinaryOp('gt', 6);
                    $window.jsep.addBinaryOp('lte', 6);
                    $window.jsep.addBinaryOp('gte', 6);
                    $window.jsep.addBinaryOp('eq', 6);
                    parse_tree = $window.jsep(string);
                    query.filter[parse_tree.operator] = [];
                    query.filter = parseSimple(parse_tree);
                    defered.resolve(query);
                } catch (err) {
                    var error = err;
                    if (err.description) {
                        error = err.description;
                    }
                    defered.reject(error);
                }

                return promise;


            }
            //job.id like "1e" or (job.id like 189 and job.status== FINISHED) and job.status== CANCELED
            // job.id like "1e" and job.status<= CANCELED

            function parseSimple(parse_tree) {
                var id, value, newFilter = {};
                if (parse_tree.type === 'BinaryExpression' && /\eq|\neq|\like|\gt|\lt|\gte|\lte|\=|\'<'|\'>'|\~|\!/.test(parse_tree.operator)) {
                    id = getId(parse_tree.left).split('.').reverse().join('.');
                    value = parse_tree.right.name || parse_tree.right.value;
                    var op = getSimpleOperator(parse_tree.operator);

                    newFilter[op] = {};
                    newFilter[op][id] = value;
                } else if (parse_tree.type === 'BinaryExpression' && /\or|\and/.test(parse_tree.operator)) {
                    newFilter[parse_tree.operator] = [];
                    newFilter[parse_tree.operator].push(parseSimple(parse_tree.left));
                    newFilter[parse_tree.operator].push(parseSimple(parse_tree.right));

                }
                return newFilter;

            }

            function getId(parser_tree) {
                var id = '';
                if (parser_tree.type === 'Identifier') {
                    id = parser_tree.name;
                } else if (parser_tree.type === 'MemberExpression') {
                    id = parser_tree.property.name + '.' + getId(parser_tree.object);
                }
                return id;


            }

            function getSimpleOperator(operator) {
                return operator === '==' ? 'eq' :
                    operator === '=' ? 'eq' :
                    operator === '!=' ? 'neq' :
                    operator === '~' ? 'like' :
                    operator === '>' ? 'gt' :
                    operator === '<' ? 'lt' :
                    operator === '>=' ? 'gte' :
                    operator === '<=' ? 'lte' : operator;
            }


            return {
                suggest_field_delimited: function(term, target_element, selectors) {
                    var customSelectors = selectors;
                    var result = suggest_field_delimited(term, target_element, selectors);
                    return result;
                },
                parseQuery: function(values) {
                    var result = parseQuery(values);
                    return result;
                }
            };
        }
    ]);


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
    });

angular.module('opengate-angular-js').directive('windowTimeSelect', function() { // ['$scope', '$compile'], function($scope, $compile) {


    return {
        restrict: 'AE',
        templateUrl: 'views/window-time.select.view.html',
        scope: {
            event: '@',
            rawdate: '@'
        },
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {

            function toLimit() {
                return window.moment($scope.date.from).add(1, 'hours')._d;
            }

            function fromLimit() {
                return window.moment($scope.date.to).subtract(1, 'minutes')._d;
            }

            function fromDate() {
                return window.moment($scope.date.to).subtract(1, 'months')._d;
            }

            function setTo(toDate) {
                if (!$scope.date) $scope.date = {};
                $scope.date.to = toDate;
                $scope.toMax = toDate;
                $scope.toOptions = {
                    startingDay: 1,
                    showWeeks: false,
                    maxDate: toDate
                };
            }

            function setFrom() {
                $scope.date.from = fromDate($scope.date.to);
                $scope.fromOptions = {
                    startingDay: 1,
                    showWeeks: false,
                    maxDate: fromLimit($scope.date.to)
                };
                $scope.toOptions.minDate = toLimit();
                $scope.toMin = toLimit();
                $scope.fromMax = fromLimit($scope.date.to);
            }

            $scope.oneDayClass = $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
            $scope.filterApplied = false;
            $scope.format = 'dd MMMM yyyy';
            $scope.clear = function() {

                $scope.oneDayClass = $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.filterApplied = false;
                $scope.customEnabled = false;
                $scope.$emit('onWindowTimeChanged', {});
            };
            $scope.fromOpen = function() {
                $scope.fromPopup.opened = true;
            };
            $scope.fromPopup = {
                opened: false
            };
            $scope.toOpen = function() {
                $scope.toPopup.opened = true;
            };
            $scope.toPopup = {
                opened: false
            };
            $scope.custom = function() {
                $scope.customEnabled = !$scope.customEnabled;
            };
            $scope.apply = function(winTime, fire_event) {
                $scope.filterApplied = true;
                $scope.customEnabled = false;
                /* jshint ignore:start */
                if (!window.eval($scope.rawdate)) {
                    for (var key in winTime) {
                        if (key !== 'type' && key !== 'rawdate')
                            winTime[key] = window.moment(winTime[key]).format();
                    }
                    //TODO: enganche con widgets, habría que ver como resolver este problema o hacer que esto sea una directiva propia del angular-dashboard-framework
                    winTime.rawdate = false;
                }
                /* jshint ignore:end */
                if (fire_event)
                    $scope.$emit('onWindowTimeChanged', winTime);
            };
            $scope.oneDay = function(no_fire_event) {
                $scope.oneDayClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.apply(genWindowTime('days'), !no_fire_event);
            };
            $scope.oneWeek = function(no_fire_event) {
                $scope.oneWeekClass = 'btn-success';
                $scope.oneDayClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.apply(genWindowTime('weeks'), !no_fire_event);
            };
            $scope.oneMonth = function(no_fire_event) {
                $scope.oneMonthClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneDayClass = $scope.customClass = 'btn-info';
                $scope.apply(genWindowTime('months'), !no_fire_event);
            };

            $scope.applyCustom = function(no_fire_event) {
                $scope.customClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneDayClass = $scope.oneMonthClass = 'btn-info';
                $scope.apply({
                    type: 'custom',
                    to: $scope.date.to,
                    from: $scope.date.from
                }, !no_fire_event);
            };


            // Config custom window
            $scope.init = function() {

                setTo(new Date());
                setFrom();

                $scope.toChange = function() {
                    validateCustomWindow();
                    $scope.fromOptions = {
                        maxDate: fromLimit($scope.date.to)
                    };
                    $scope.fromMax = fromLimit($scope.date.to);
                };
                $scope.fromChange = function() {
                    validateCustomWindow();
                    $scope.toOptions.minDate = toLimit();
                    $scope.toMin = toLimit();
                };

                function validateCustomWindow() {
                    if (window.moment($scope.date.to).diff($scope.date.from) <= 0) {
                        $scope.errorCustomWindow = 'From date(' + $scope.date.from.toISOString() + ') is bigger than to date(' + $scope.date.to.toISOString() + ')';
                    } else {
                        $scope.errorCustomWindow = undefined;
                    }
                }


                //TODO: enganche con widgets, habría que ver como resolver este problema o hacer que esto sea una directiva propia del angular-dashboard-framework
                if ($scope.$parent.config && $scope.$parent.config.windowFilter) {
                    var configWindowFilter = $scope.$parent.config.windowFilter;
                    /* jshint ignore:start */
                    if (!window.eval($scope.rawdate)) {
                        $scope.$parent.config.windowFilter.rawdate = false;
                    }
                    /* jshint ignore:end */
                    switch (configWindowFilter.type) {
                        case 'days':
                            $scope.oneDay(true);
                            break;
                        case 'weeks':
                            $scope.oneWeek(true);
                            break;
                        case 'months':
                            $scope.oneMonth(true);
                            break;
                        case 'custom':
                            if (configWindowFilter.to && configWindowFilter.from) {
                                $scope.date.to = new Date(configWindowFilter.to);
                                $scope.date.from = new Date(configWindowFilter.from);
                            }
                            $scope.applyCustom(true);
                            break;
                        default:
                            break;
                    }
                }
            };

            $scope.init();

            function genWindowTime(type) {
                var from = window.moment().subtract(1, type);
                return {
                    from: from._d,
                    type: type
                };
            }
        }]
    };
});


/**
 * Edits by Ryan Hutchison
 * Credit: https://github.com/paulyoder/angular-bootstrap-show-errors */

angular.module('opengate-angular-js')
    .directive('showErrors', ['$timeout', '$interpolate', function($timeout, $interpolate) {
        var linkFn = function(scope, el, attrs, formCtrl) {
            var inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses,
                initCheck = false,
                showValidationMessages = false,
                blurred = false;

            options = scope.$eval(attrs.showErrors) || {};
            showSuccess = options.showSuccess || false;
            inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
            inputNgEl = angular.element(inputEl);
            inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

            if (!inputName) {
                throw 'show-errors element has no child input elements with a \'name\' attribute class';
            }

            var reset = function() {
                return $timeout(function() {
                    el.removeClass('has-error');
                    el.removeClass('has-success');
                    showValidationMessages = false;
                }, 0, false);
            };

            scope.$watch(function() {
                return formCtrl[inputName] && formCtrl[inputName].$invalid;
            }, function(invalid) {
                return toggleClasses(invalid);
            });

            scope.$on('show-errors-check-validity', function(event, name) {
                if (angular.isUndefined(name) || formCtrl.$name === name) {
                    initCheck = true;
                    showValidationMessages = true;

                    return toggleClasses(formCtrl[inputName].$invalid);
                }
            });

            scope.$on('show-errors-reset', function(event, name) {
                if (angular.isUndefined(name) || formCtrl.$name === name) {
                    return reset();
                }
            });

            toggleClasses = function(invalid) {
                el.toggleClass('has-error', showValidationMessages && invalid);
                if (showSuccess) {
                    return el.toggleClass('has-success', showValidationMessages && !invalid);
                }
            };
        };

        return {
            restrict: 'A',
            require: '^form',
            compile: function(elem, attrs) {
                if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
                    if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
                        throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
                    }
                }
                return linkFn;
            }
        };
    }]);


angular.module('opengate-angular-js')
    .directive('elemReady', ["$parse", function($parse) {
        return {
            restrict: 'A',
            link: function($scope, elem, attrs) {
                elem.ready(function() {
                    $scope.$apply(function() {
                        var func = $parse(attrs.elemReady);
                        func($scope);
                    });
                });
            }
        };
    }]);


angular.module('opengate-angular-js').directive('disallowSpaces', function() {
    return {
        restrict: 'A',
        link: function($scope, $element) {
            $element.bind('input', function() {
                window.$(this).val(window.$(this).val().replace(/ /g, ''));
            });
        }
    };
});


angular.module('opengate-angular-js')
    .directive('customUiSelect', ['$compile', 'Filter', function($compile, Filter) {
        var button = angular.element('<div ng-click="complex()" style="cursor:pointer" class="custom-ui-select-button input-group-addon"><i class="fa fa-filter text-muted"></i></div>');
        var container = angular.element('<div class="custom-ui-select-container input-group"></div>');

        var isEmpty = function(value) {
            return !value || value.trim().length === 0;
        };

        var setRefresh = function(obj, fnc) {
            var choices = obj.querySelectorAll('ui-select-choices');
            choices.attr('refresh', fnc);
            choices.attr('refresh-delay', '0');
        };

        return {
            require: 'uiSelect',
            scope: true,
            bindToController: true,
            controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
                var uiConfig = getConfig();

                function processFilter(_filter) {
                    if (uiConfig.prefilter) {
                        var filter = { and: [] };
                        filter.and.push(uiConfig.prefilter);
                        filter.and.push(_filter);
                        return filter;
                    }
                    return _filter;
                }

                function getConfig() {
                    var configPath = $attrs.customUiSelectConfig.split('.');
                    if (configPath.length === 1) {
                        return $scope[$attrs.customUiSelectConfig];
                    } else {
                        var config = $scope;
                        configPath.forEach(function(path) {
                            config = config[path];
                        });
                        return config;
                    }
                }

                //Filtro asistido con mass-autocomplete
                $scope.complexfilter = function(search) {
                    //console.log(search);
                    Filter.parseQuery(search || '')
                        .then(function(data) {
                            var filter = data.filter;
                            //Solo filtramos si no se trata de un filtro vacio
                            if (Object.keys(filter).length > 0) {
                                //$scope.filter.error = null;
                                _loadCollection(uiConfig.builder, uiConfig.collection, uiConfig.rootKey, processFilter(filter));
                                console.log('Final filter: ' + filter);
                            } else {
                                //lo tratamos igual que si fuera un filtro no valido
                                uiConfig.collection.splice(0, uiConfig.collection.length);
                            }
                        })
                        .catch(function(err) {
                            //Si el filtro no es valido borramos la lista de opciones del ui-select
                            //$scope.filter.error = err;
                            uiConfig.collection.splice(0, uiConfig.collection.length);
                            // Tratar el error
                        });
                };

                //Filtro simple con or-like
                $scope.asyncfilter = function(search) {
                    _loadCollection(uiConfig.builder, uiConfig.collection, uiConfig.rootKey, processFilter(uiConfig.filter(search)));
                };

                $scope._complex = $attrs.$$button.querySelectorAll('.fa-filter').hasClass('text-primary');
                $scope.complex = function() {
                    $scope._complex = !$scope._complex;
                    if ($scope._complex) {
                        $element.css('display', '').removeClass('custom-ui-select-hide');
                        $attrs.$$cloneElement.css('display', 'none').addClass('custom-ui-select-hide');
                        $attrs.$$button.querySelectorAll('.fa-filter').removeClass('text-muted').addClass('text-primary');
                    } else {
                        $element.css('display', 'none').addClass('custom-ui-select-hide');
                        $attrs.$$cloneElement.css('display', '').removeClass('custom-ui-select-hide');
                        $attrs.$$button.querySelectorAll('.fa-filter').addClass('text-muted').removeClass('text-primary');
                    }
                };

                $scope.customUiTagTransform = function(value) {
                    return null;
                };

                function _loadCollection(builder, collection, id, filter) {
                    builder.limit(1000).filter(filter).build().execute().then(
                        function(data) {
                            if (data.statusCode === 200) {
                                //obj.selected = null;
                                var datas = [];
                                if (angular.isFunction(uiConfig.processingData)) {
                                    uiConfig.processingData(data, datas);
                                } else {
                                    datas = data.data[id];
                                }
                                var _collection = [];
                                if (!angular.isArray(datas)) {
                                    angular.forEach(datas, function(data, key) {
                                        _collection.push(data);
                                    });
                                } else {
                                    angular.copy(datas, _collection);
                                }
                                angular.copy(_collection, collection);
                            } else {
                                collection.splice(0, collection.length);
                                if (data.statusCode !== 204) {
                                    //toastr.error('Loading error');
                                    console.error(JSON.stringify(data));
                                } else {
                                    console.log(JSON.stringify(data));
                                }
                            }
                            $scope.$apply();
                        }
                    );
                }
            }],
            compile: function(templateElement, templateAttributes) {
                templateAttributes.$$button = button.clone();
                templateAttributes.$$container = container.clone();
                var simple = templateAttributes.multiple !== 'true';
                var taggFunction = templateAttributes.tagging;
                console.log('isSimple: ' + simple);
                if (simple) {
                    templateElement.attr('limit', '1');
                    templateAttributes.limit = '1';
                    templateAttributes.searchEnabled = '!$select.selected || $select.selected.length === 0';
                    templateElement.attr('search-enabled', '!$select.selected || $select.selected.length === 0');
                }

                if (!taggFunction || taggFunction.trim().length === 0) {
                    templateElement.attr('tagging', 'customUiTagTransform');
                    templateAttributes.tagging = 'customUiTagTransform';
                }

                var asyncFilter = 'asyncfilter($select.search);';
                var complexFilter = 'complexfilter($select.search);';


                if (templateAttributes.customMassAutocompleteItem) {
                    setRefresh(templateElement, complexFilter);
                    var _templateElement = angular.element(templateElement.clone());
                    _templateElement.removeAttr('custom-ui-select');
                    setRefresh(_templateElement, asyncFilter);
                    templateAttributes.$$templateElement = _templateElement;
                } else {
                    setRefresh(templateElement, asyncFilter);
                }

                return function link($scope, $element, $attrs, $select) {
                    var maus = 'mass-autocomplete-ui-select';
                    var aus = 'async-ui-select';
                    if ($attrs.customMassAutocompleteItem) {
                        $element.addClass(maus);
                        var massAutocompleteItem = getMassAutocompleteItem();
                        if (!massAutocompleteItem.suggest) {
                            massAutocompleteItem.suggest = Filter.suggest_field_delimited;
                        }
                        var filterInput = $element.querySelectorAll('input.ui-select-search');
                        filterInput.attr('mass-autocomplete-item', $attrs.customMassAutocompleteItem);
                        //filterInput.attr('ng-change', 'debugQuery()');
                        $compile(filterInput)($scope);


                        $attrs.$$container.empty();
                        $element.before($attrs.$$container);
                        $element.detach();
                        $attrs.$$container.append($element);
                        var template = $attrs.$$templateElement.clone();
                        var _cloneElement = $compile(template)($scope, function(clonedElement, $scope) {
                            $attrs.$$container.append(clonedElement);
                        });
                        _cloneElement.addClass(aus);
                        $attrs.$$cloneElement = _cloneElement;

                        $compile($attrs.$$button)($scope);
                        $attrs.$$container.append($attrs.$$button);
                        $element.css('display', 'none').addClass('custom-ui-select-hide');

                        var keys = [];
                        $attrs.$$container.bind('keydown', function(e) {
                            keys.push(e.keyCode);
                        });
                        $attrs.$$container.bind('keyup', function(e) {
                            if (keys.length > 0) {
                                if (angular.equals(keys, [17, 18, 70])) {
                                    $scope.complex();
                                }
                                keys.splice(0, keys.length);
                            }
                        });
                    } else {
                        $element.addClass(aus);
                    }

                    function getMassAutocompleteItem() {
                        var configPath = $attrs.customMassAutocompleteItem.split('.');
                        if (configPath.length === 1) {
                            return $scope[$attrs.customMassAutocompleteItem];
                        } else {
                            var config = $scope;
                            configPath.forEach(function(path) {
                                config = config[path];
                            });
                            return config;
                        }
                    }
                };
            }
        };
    }]);})(window);