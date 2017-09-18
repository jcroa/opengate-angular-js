'use strict';

angular.module('opengate-angular-js')
    .service('$jsonFinderHelper', ['jsonPath',
        function(jsonPath) {
            JsonFinderHelper.prototype.jsonPath = jsonPath;
            return {
                administration: new JsonFinderHelper({
                    'identifier': 'provision.administration.identifier',
                    'organization': 'provision.administration.organization',
                    'channel': 'provision.administration.channel'
                }),
                provisoned: new ProvisionJsonFinderHelper(),
                collected: new CollectedJsonFinderHelper()
            };
        }
    ]);

JsonFinderHelper.prototype.getPath = function(field) {
    if (!this.fields[field]) throw new Error('Field <' + field + '> not found. Available:' + JSON.stringify(Object.keys(this.fields)));
    return this.fields[field];
};
JsonFinderHelper.prototype.findOne = function(data, field) {
    return this.findAll(data, field)[0];
};
JsonFinderHelper.prototype.findAll = function(data, field) {
    return this.jsonPath(data, this.getPath(field) + '._current.value') || [];
};
JsonFinderHelper.prototype.fields = {
    'identifier': 'provision.administration.identifier',
    'organization': 'provision.administration.organization',
    'channel': 'provision.administration.channel'
};

function JsonFinderHelper() {}

CollectedJsonFinderHelper.prototype = new JsonFinderHelper();

CollectedJsonFinderHelper.prototype.fields = Object.assign(
    CollectedJsonFinderHelper.prototype.fields, {
        'specificType': 'device.specificType'
    });

function CollectedJsonFinderHelper() {}

ProvisionJsonFinderHelper.prototype = new CollectedJsonFinderHelper();
ProvisionJsonFinderHelper.prototype.fields = Object.assign(
    ProvisionJsonFinderHelper.prototype.fields, {});


ProvisionJsonFinderHelper.prototype.getPath = function(field) {
    var path = JsonFinderHelper.prototype.getPath(field);
    if (!path.startsWith('provision.')) {
        path = 'provision.' + path;
    }
    return path;
};

function ProvisionJsonFinderHelper() {}