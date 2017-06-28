window.assert = chai.assert;
describe('Test OpengateAngularJS', function() {
    // define variables for the services we want to access in tests
    var ogapi;
    beforeEach(function() {
        // load the module we want to test
        module('opengate-angular-js');

        // inject the services we want to test
        inject(function($ogapi) {
            ogapi = $ogapi;
        })
    });
    describe('Test OpengateAngularJS Service', function() {
        it('Should be thrown exception', function() {
            // Assert
            assert.throws(ogapi.api, Error, 'Must invoke create([options]) function before api() function');
            ogapi.release();
        });

        it('Should be instantiated after create method invoke', function() {
            // Assert
            ogapi.create();
            assert.isDefined(ogapi.api());
            ogapi.release();
        });

        it('Should be create and release ogapi instance', function() {
            // Assert
            ogapi.create();
            assert.throws(ogapi.release().api, Error, 'Must invoke create([options]) function before api() function');
        });

        it('Should be defined deviceSearchBuilder', function() {
            // Assert
            assert.isDefined(ogapi.create().devicesSearchBuilder(), 'Service ogapi not available');
        });
    });
});