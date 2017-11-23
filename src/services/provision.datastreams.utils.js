angular.module('opengate-angular-js')
    .service('$provisionDatastreamsUtils', [function () {
        var internal_catalog = ["internal", "provisionSubscriber", "provisionGeneric", "provisionDevice", "provisionAsset", "provisionSubscription"];

        var filter = {
            and: [{
                    like: {
                        'datamodels.categories.datastreams.name': '^(provision\.).*'
                    }
                },
                {
                    like: {
                        'datamodels.categories.datastreams.name': '^(?!provision\.administration\.).*'
                    }
                },
                {
                    like: {
                        'datamodels.categories.datastreams.name': '^(?!provision\.device\.).*'
                    }
                },
                {
                    like: {
                        'datamodels.categories.datastreams.name': '^(?!provision\.asset\.).*'
                    }
                }
            ]
        };

        function filterForCoreDatamodelsCatalog(datamodels) {
            return datamodels.filter(function (datamodel) {
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