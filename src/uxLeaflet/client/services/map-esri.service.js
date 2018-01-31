angular.module('uxleaflet')

/** 
 * Cambiar a [uxleaflet/client]
 * PlaceFinderEsri carga en segundo plano las librerías requeridas
 * de ESRI para implementar la funcionalidad de PlaceFinder.
 * 
 * Sin implementar. Es posible que se use otro proveedor.
 */
.service('mapEsriService', function($window, jsonPath, $api, mapUxService) {

    'use strict';
    console.info('TESTING l_placefinder_esri');

    // check required esri classes

    var BASE_CLASS = jsonPath('L.esri.Geocoding.Geosearch');
    if (BASE_CLASS) {
        console.warn('Error not found L.esri.Geocoding.Geosearch ');
    }

    /*
 constructor: 'L.esri.Geocoding.Geosearch',
                    defaultOpts: {
                        providers: [
                            L.esri.Geocoding.arcgisOnlineProvider(),
                            L.esri.Geocoding.mapServiceProvider({
                                label: 'States and Counties',
                                url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
                                layers: [2, 3],
                                searchFields: ['NAME', 'STATE_NAME']
                            })
                        ]
                    }
   */

    /* 
     * Extension for L.esri.Geocoding.Geosearch class 
     * this class allows simple options
     */
    L.Control.PlaceFinderEsri = BASE_CLASS.extend({

        /* Sample {
               providerName: [ 'arcgisOnlineProvider', 'mapServiceProvider' ],
               layers: [2, 3],
               searchFields: ['NAME', 'STATE_NAME'] }
        */
        initialize: function(options) {

            var opt2 = {
                providers: [
                    L.esri.Geocoding.arcgisOnlineProvider(),
                    L.esri.Geocoding.mapServiceProvider({
                        label: 'States and Counties',
                        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
                        layers: options.layers,
                        searchFields: options.searchFields
                    })
                ]
            };
            BASE_CLASS.prototype.initialize.call(this, opt2);
        },

        _buildContainer: function(options) {
            BASE_CLASS.prototype._buildContainer.call(this, options);
            // Solo debe invocarse si existe google.maps.places.Autocomplete
            // var _that = this;
            // L.ensureExtraApi('esri', ['google.maps.places.Autocomplete'], function() {
            //     BASE_CLASS.prototype._buildContainer.call(_that, options);
            // });
        },

        addTo: function(map) {
            BASE_CLASS.prototype.addTo.call(this, map);
            // solo debe invocarse cuando exista this._container.
            // var _that = this;
            // var tInterval = window.setInterval(function() {
            //     if (_that.container) {
            //         window.clearInterval(tInterval);
            //         BASE_CLASS.prototype.addTo.call(_that, map);
            //     }
            // }, 
            // 100); // check this._container each 100 ms
        }

    });

});