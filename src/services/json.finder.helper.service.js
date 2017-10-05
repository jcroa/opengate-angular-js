'use strict';

angular.module('opengate-angular-js')
    .service('$jsonFinderHelper', ['jsonPath',
        function (jsonPath) {
            JsonFinderHelper.prototype.jsonPath = jsonPath;
            return {
                administration: new JsonFinderHelper(),
                provisioned: new ProvisionJsonFinderHelper(),
                collected: new CollectedJsonFinderHelper()
            };
        }
    ]);

JsonFinderHelper.prototype.getPath = function (field) {
    if (!this.fields[field]) throw new Error('Field <' + field + '> not found. Available:' + JSON.stringify(Object.keys(this.fields)));
    return this.fields[field].replace('[]', '[*]');
};
JsonFinderHelper.prototype.findOne = function (data, field) {
    return this.findAll(data, field)[0];
};
JsonFinderHelper.prototype.findAll = function (data, field) {
    return this.jsonPath(data, this.getPath(field) + '._current.value') || [];
};
JsonFinderHelper.prototype.fields = {
    'identifier': 'provision.administration.identifier',
    'organization': 'provision.administration.organization',
    'serviceGroup': 'provision.administration.serviceGroup',
    'channel': 'provision.administration.channel',
    'feed': 'provision.administration.defaultFeed',
    'resourceType': 'resourceType'
};

function JsonFinderHelper() { }

CollectedJsonFinderHelper.prototype = new JsonFinderHelper();

CollectedJsonFinderHelper.prototype.fields = Object.assign(
    {}, {
        'specificType': 'device.specificType',
        'location': 'device.location',
        'name': 'device.name',
        'description': 'device.description',
        'operationalStatus': 'device.operationalStatus',
        'serialNumber': 'device.serialNumber',
        'identifier': 'device.identifier',
        'model': 'device.model',
        'software': 'device.software',
        'trustedBoot': 'device.trustedBoot',

        'subscriberIdentifier': 'device.communicationModules[].subscriber.identifier',
        'subscriberSerialNumber': 'device.communicationModules[].subscriber.serialNumber',
        'subscriberSpecificType': 'device.communicationModules[].subscriber.specificType',
        'subscriberName': 'device.communicationModules[].subscriber.name',
        'subscriberDescription': 'device.communicationModules[].subscriber.description',

        'subscriptionIdentifier': 'device.communicationModules[].subscription.identifier',
        'subscriptionSpecificType': 'device.communicationModules[].subscription.specificType',
        'subscriptionName': 'device.communicationModules[].subscription.name',
        'subscriptionDescription': 'device.communicationModules[].subscription.description',
        'subscriptionImsi': 'device.communicationModules[].subscription.mobile.imsi',
        'subscriptionMsisdn': 'device.communicationModules[].subscription.mobile.msisdn',
        'subscriptionMsisdnVoice': 'device.communicationModules[].subscription.mobile.voice.msisdn',
        'subscriptionAddress': 'device.communicationModules[].subscription.address',
        'subscriptionHomeOperator': 'device.communicationModules[].subscription.mobile.homeOperator',
        'subscriptionRegisteredOperator': 'device.communicationModules[].subscription.mobile.registeredOperator'
    });

function CollectedJsonFinderHelper() { }

ProvisionJsonFinderHelper.prototype = new CollectedJsonFinderHelper();
ProvisionJsonFinderHelper.prototype.fields = Object.assign({},
    ProvisionJsonFinderHelper.prototype.fields, {
        'adState': 'provision.device.administrativeState',
        'certificates': 'provision.device.certificates',
        'subscriberAdState': 'device.communicationModules[].subscriber.administrativeState',
        'subscriptionAdState': 'device.communicationModules[].subscription.administrativeState',
        'subscriberIcc': 'provision.device.communicationModules[].subscriber.mobile.icc'
    });


ProvisionJsonFinderHelper.prototype.getPath = function (field) {
    var path = JsonFinderHelper.prototype.getPath(field);
    if (!path.startsWith('provision.')) {
        path = 'provision.' + path;
    }
    return path;
};

function ProvisionJsonFinderHelper() { }