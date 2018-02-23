angular.module('opengate-angular-js')
    .service('$provisionDatastreamsUtils', [function() {
        'use strict';
        //"provisionSubscriber", "provisionGeneric", "provisionDevice", "provisionAsset", "provisionSubscription", "provisionGenericChannel", "provisionGenericOrganization", "provisionGenericIdentifier"
        var internal_catalog = ["internal"];

        var filter = {
            and: [{
                    like: {
                        'datamodels.categories.datastreams.identifier': '^(provision\.).*'
                    }
                }
                /*,
                {
                    like: {
                        'datamodels.categories.datastreams.identifier': '^(?!provision\.administration\.).*'
                    }
                },
                {
                    like: {
                        'datamodels.categories.datastreams.identifier': '^(?!provision\.device\.).*'
                    }
                },
                {
                    like: {
                        'datamodels.categories.datastreams.identifier': '^(?!provision\.asset\.).*'
                    }
                }*/
            ]
        };

        function filterForCoreDatamodelsCatalog(datamodels) {
            return datamodels.filter(function(datamodel) {
                return internal_catalog.indexOf(datamodel.identifier) === -1;
            });
        }

        function getFilter() {
            return angular.copy(filter);
        }

        function getCoreDatamodelsCatalog() {
            return angular.copy(internal_catalog);
        }

        return {
            getCoreDatamodelsCatalog: getCoreDatamodelsCatalog,
            filterForCoreDatamodelsCatalog: filterForCoreDatamodelsCatalog,
            getFilter: getFilter
        };
    }]);