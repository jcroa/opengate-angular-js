angular.module('opengate-angular-js')
    .service('$schemaFormUtils', ['$provisionDatastreamsUtils', '$api', '$q',
        function ($provisionDatastreamsUtils, $api, $q) {
            'use strict';

            var filter = $provisionDatastreamsUtils.getFilter();

            function SchemaFormCreator() {
                var _this = this;
                var schema = {
                    type: "object",
                    properties: {},
                    required: []
                };
                var identifiers = [];

                function addRequired($item) {
                    if ($item.required) {
                        schema.required.push($item.identifier);
                    }
                }

                this.addField = function ($item) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var identifier = $item.identifier;
                    identifiers.push(identifier);
                    addRequired($item);
                    $item.title = ($item.name || identifier) + ($item.unit && $item.unit.label ? ' (' + $item.unit.label + ')' : '');
                    if (typeof $item.schema.$ref === 'string') {
                        var path = '$.' + $item.schema.$ref.split('#')[1];
                        path = path.replace(/[\/]/g, '.');
                        $api().basicTypesSearchBuilder().withPath(path).execute().then(function (response) {
                            schema.properties[identifier] = response.data;
                            defered.resolve();
                        }).catch(function (err) {
                            console.error(err);
                            defered.reject(err);
                        });
                    } else {
                        if ($item.schema.type === 'string') {
                            $item.schema.format = 'helperdialog';
                        }
                        $item.schema.htmlClass = 'col-xs-12 col-md-6';
                        $item.schema.description = $item.description;
                        schema.properties[identifier] = $item.schema;
                        defered.resolve();
                    }
                    return promise;
                };

                this.addFields = function (fields) {
                    var promisses = [];
                    if (Array.isArray(fields) && fields.length > 0) {
                        fields.forEach(function (field) {
                            promisses.push(_this.addField(field));
                        });
                        return $q.all(promisses).catch(function (err) {
                            console.error(err);
                        });
                    } else {
                        throw new Error("fields must be an array");
                    }
                };

                this.getSchema = function () {
                    return schema;
                };

                this.getIdentifiers = function () {
                    return identifiers;
                };
            }

            return {
                getSchemaFormCreatorFromDatamodel: function (customfields, allowedResourceTypes) {
                    var defered = $q.defer();
                    var promise = defered.promise;

                    if (Array.isArray(customfields) && customfields.length > 0) {
                        filter.and.push({
                            'in': {
                                'datamodels.categories.datastreams.identifier': customfields
                            }
                        });
                    } else {
                        defered.reject("First parameter must be an array of datastreams identifier");
                    }
                    var schemaFormCreator = new SchemaFormCreator();
                    if (allowedResourceTypes) {
                        filter.and.push({
                            'in': {
                                'datamodels.allowedResourceTypes': allowedResourceTypes
                            }
                        });
                    }

                    $api().datamodelsSearchBuilder().filter(filter).build().execute()
                        .then(function (response) {
                            var datamodels = response.data.datamodels;
                            datamodels = $provisionDatastreamsUtils.filterForCoreDatamodelsCatalog(datamodels);
                            var datastreams = datamodels.reduce(function (first, next) {
                                var categories = [];
                                if (next.categories) {
                                    return first.concat(next.categories.reduce(function (first, next) {
                                        return first.concat(next.datastreams);
                                    }, categories));
                                }
                                return first;
                            }, []).reduce(function (first, ds) {
                                first[ds.identifier] = ds;
                                return first;
                            });
                            var promisses = [];
                            customfields.forEach(function (identifier) {
                                var confDatastream = datastreams[identifier];

                                if (typeof confDatastream === 'undefined') {
                                    console.error('Datastream ' + identifier + ' no exists or not is custom.');
                                } else {
                                    promisses.push(schemaFormCreator.addField(confDatastream));
                                }
                            });
                            if (promisses.length > 0) {
                                $q.all(promisses).then(function () {
                                    defered.resolve(schemaFormCreator);
                                }).catch(function (err) {
                                    console.error(err);
                                    defered.reject(err);
                                });
                            }

                        })
                        .catch(function (err) {
                            console.error(err);
                            defered.reject(err);
                        });
                    return promise;
                }
            };

        }
    ]);