'use strict';

angular.module('opengate-angular-js')
    .service('$entityFlattenedExtractor', ['$jsonFinderHelper', function($jsonFinderHelper) {
        function genericExtractor(entityList, element) {
            var resultList = [];

            if (entityList && entityList.length > 0) {
                var resultsFound = {};
                angular.forEach(entityList, function(entityData, idx) {
                    if (entityData[$jsonFinderHelper.provisioned.getAmpliaPath(element + 'Identifier')] ||
                        entityData[$jsonFinderHelper.collected.getAmpliaPath(element + 'Identifier')]) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData, function(itemData, item) {
                            if (item.startsWith('provision.device.communicationModules[].' + element) ||
                                item.startsWith('device.communicationModules[].' + element)) {
                                angular.forEach(itemData, function(value, itemIdx) {
                                    if (value._index) {
                                        if (!resultsFound[idx]) {
                                            resultsFound[idx] = {};

                                            resultsFound[idx]['$device'] = entityData;
                                        }
                                        resultsFound[idx][item] = value;
                                    }
                                });
                            } else if (item.startsWith('provision.administration')) {
                                if (!resultsFound[idx]) {
                                    resultsFound[idx] = {};

                                    resultsFound[idx]['$device'] = entityData;
                                }

                                resultsFound[idx][item] = itemData;
                            }
                        });
                    }
                });

                // De todos los leidos hacemos
                angular.forEach(resultsFound, function(entities, entitiesKey) {
                    resultList.push(entities);
                });
            }

            return resultList;
        }

        function extractSubscribers(entityList, destinationList) {
            var entityList = genericExtractor(entityList, 'subscriber');
            if (destinationList) {
                destinationList = entityList;
            }

            return entityList;
        }

        function extractSubscriptions(entityList, destinationList) {
            var entityList = genericExtractor(entityList, 'subscription');
            if (destinationList) {
                destinationList = entityList;
            }

            return entityList;
        }

        return {
            extractSubscribers: extractSubscribers,
            extractSubscriptions: extractSubscriptions
        };
    }])
    .service('$entityExtractor', function() {
        function genericExtractor(entityList, element) {
            var resultList = [];

            if ((entityList && entityList.length > 0) || entityList && entityList.length > 0) {
                angular.forEach(entityList, function(entityData, idx) {
                    var finalData = null;

                    if (entityData.provision.device && entityData.provision.device.communicationModules &&
                        entityData.provision.device.communicationModules.length > 0) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData.provision.device.communicationModules, function(commData, commIdx) {
                            if (commData[element]) {
                                if (!finalData) {
                                    finalData = {
                                        provision: {}
                                    };
                                } else if (!finalData.provision) {
                                    finalData.provision = {};
                                }

                                finalData.provision[element] = commData[element];
                            }
                        });
                    }

                    if (entityData.device && entityData.device.communicationModules &&
                        entityData.device.communicationModules.length > 0) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData.device.communicationModules, function(commData, commIdx) {
                            if (commData[element]) {
                                if (!finalData) {
                                    finalData = {};
                                }

                                finalData[element] = commData[element];
                            }
                        });
                    }

                    if (finalData) {
                        resultList.push(finalData);
                    }

                });
            }

            return resultList;
        }

        function extractSubscribers(entityList, destinationList) {
            var final;

            if (entityList && entityList.devices) {
                final = genericExtractor(entityList.devices, 'subscriber');
            } else if (entityList && entityList.data && entityList.data.devices) {
                final = genericExtractor(entityList.data.devices, 'subscriber');
            }

            if (destinationList) {
                angular.copy(final, destinationList);
            }

            var finalEntityData = {
                subscribers: final
            };

            return finalEntityData;
        }

        function extractSubscriptions(entityList, destinationList) {
            var final;

            if (entityList && entityList.devices) {
                final = genericExtractor(entityList.devices, 'subscription');
            } else if (entityList && entityList.data && entityList.data.devices) {
                final = genericExtractor(entityList.data.devices, 'subscription');
            }

            if (destinationList) {
                angular.copy(final, destinationList);
            }

            var finalEntityData = {
                subscriptions: final
            };

            return finalEntityData;
        }

        return {
            extractSubscribers: extractSubscribers,
            extractSubscriptions: extractSubscriptions
        };
    });