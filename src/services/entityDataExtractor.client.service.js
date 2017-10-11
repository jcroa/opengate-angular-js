'use strict';

angular.module('opengate-angular-js')
    .service('$entityFlattenedExtractor', ['$jsonFinderHelper', function($jsonFinderHelper) {
        function extractFlattenedSubscribers(entityList) {
            var subscribersList = [];

            if (entityList && entityList.length > 0) {
                var subscribersFound = {};
                angular.forEach(entityList, function(entityData, idx) {
                    if (entityData[$jsonFinderHelper.provisioned.getAmpliaPath('subscriberIdentifier')]) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData, function(itemData, item) {
                            if (item.startsWith('provision.device.communicationModules[].subscriber')) {
                                angular.forEach(itemData, function(value, itemIdx) {
                                    if (value._index) {
                                        if (!subscribersFound[idx]) {
                                            subscribersFound[idx] = {};

                                            subscribersFound[idx]['$device'] = entityData;
                                        }
                                        subscribersFound[idx][item] = value;
                                    }
                                });
                            } else if (item.startsWith('provision.administration')) {
                                if (!subscribersFound[idx]) {
                                    subscribersFound[idx] = {};

                                    subscribersFound[idx]['$device'] = entityData;
                                }

                                subscribersFound[idx][item] = itemData;
                            }
                        });
                    }
                });

                // De todos los leidos hacemos
                angular.forEach(subscribersFound, function(subscriber, subskey) {
                    subscribersList.push(subscriber);
                });
            }

            return subscribersList;
        }


        return {
            extractSubscribers: extractFlattenedSubscribers
        };
    }])
    .service('$entityExtractor', function() {
        function extractSubscribers(entityList) {
            console.log(JSON.stringify(entityList));
            var subscribersList = [];

            if (entityList && entityList.length > 0) {
                angular.forEach(entityList, function(entityData, idx) {
                    if (entityData.provision.device &&
                        entityData.provision.device.communicationModules &&
                        entityData.provision.device.communicationModules.length > 0) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData.provision.device.communicationModules, function(commData, commIdx) {
                            if (commData.subscriber) {
                                var subscriberData = {
                                    subscriber: commData.subscriber
                                };

                                subscriberData['$device'] = entityData;

                                subscribersList.push(subscriberData);
                            }
                        });
                    }
                });
            }

            console.log(JSON.stringify(subscribersList));

            return subscribersList;
        }

        return {
            extractSubscriber: extractSubscribers
        };
    });