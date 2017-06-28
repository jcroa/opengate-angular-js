'use strict';

angular.module('opengate-angular-js')
    .service("$ogapi", function() {
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