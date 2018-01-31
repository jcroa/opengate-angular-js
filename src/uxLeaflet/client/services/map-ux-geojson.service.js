angular.module('uxleaflet')

/**   
 *  mapUxGeoJsonService is an adf.widget.maps implemented for:
 *  - render custom json data as markers and geometries inside a leaflet layer.
 *  - edition of polygon, lines and markers.
 *  (en esta versión de sept/2017 solo se añadirá botón para añadir polígonos, 
 *   aunque puedan editarse resto de geometrías)
 * 
 * NOTE: only is allowed for edition: simple polygons, simple lines and points 
 *     (rendered as markers)
 */
.service('mapUxGeoJsonService',
    function($window, jsonPath, $api, $http, $timeout, mapUxService, mapMarkerService, $oguxThemes) {
        'use strict';
        var _markerGroup;
        var _currentFeatures = [];

        /* return an instance of UxGeoJsonManager */
        this.createLayerManager = createLayerManager;
        this.loadGeoJsonFromFile = loadGeoJsonFromFile;
        this.normalizeGeoJson = normalizeGeoJson;

        //
        // internal functions
        // 

        /**
         * create a geoJsonLayer Manager
         * @param {map: L.Map} leaflet map instance
         * @param {geoData: GeoJSON} String with serialized geodata
         * @param {options: JSON} optional callbacks for styling, popup, etc.
         */
        function createLayerManager(map, sGeoData, options) {
            options = options || {};
            try {
                var data = parseGeoJson(sGeoData);
                replaceDefaultProperties(data.features);

                // create wrapper with info about styles
                var mng = new UxGeoJsonManager(map, data, options);
                // leaflet layer based on geojson info
                return mng;
            } catch (err) {
                throw 'invalid data as geojson content. ' + err.message;
            }
        }

        /**
         * Create or replace properties on all features: name, description and drawing-styles
         * (De momento solo útil para polígonos)
         * @param {} features (single feature or array of features)
         */
        function replaceDefaultProperties(features) {

            // force to array
            features = Array.isArray(features) ? features : [features];

            var fillColor = '#ff6600';
            try {
                fillColor = $oguxThemes.getColorFromThemeComposition().sample;
            } catch (err) {
                console.error('WARN: Fail recovering theme from oguxThemes', err);
            }
            var i = 0;
            for (; i < features.length; i++) {
                var feat = features[i];
                try {
                    // required properties object 
                    var props = feat.properties = (feat.properties || {});
                    props.name = props.name || 'no-name'; // provisional. Si no hay nombre entonces 'no-name'

                    if (props.name) {
                        var popupContent = '';
                        popupContent += '<div><span class=\'text-primary\'>' + (props.name || '') + '</span><br>' +
                            (props.description || '') + '</div>';
                        props.popupContent = popupContent;
                    }
                    // default colors for polygons
                    props['fill-opacity'] = 0.2;
                    props.stroke = '#555555';
                    props['stroke-width'] = 1;
                    props['stroke-opacity'] = 1;
                    props.fill = fillColor;
                } catch (err) {
                    console.error('Error replacing properties on feature ', feat, err);
                }
            }

        }

        /**
         * try parse as a object from json string.
         * @param {* any} sJson 
         */
        function parseGeoJson(sJson) {
            if (sJson && sJson.features && (typeof sJson.type === 'string')) {
                // is already an object
                return sJson;
            }
            if (sJson.startsWith('<!')) {
                // 
                throw 'Not found geojson file.';
            }
            try {
                var obj = JSON.parse(sJson);
                if (typeof obj.type !== 'string') {
                    throw 'invalid geojson. Expected type property as string';
                }
                return obj;
            } catch (err) {
                throw 'invalid geojson. Expected JSON ' + err.message;
            }
        }


        function iifUndefined(value1, value2) {
            return (value1 !== undefined) ? value1 : value2;
        }

        /** Converts a point style from gjStyle (editor online) to leaflet style */
        function geoJsonCircleStyle2LeafletCircleStyle(gjStyle) {
            return {
                radius: iifUndefined(gjStyle.radius || 12),
                fillColor: iifUndefined(gjStyle['marker-color'] || '#ff0000'),
                color: iifUndefined(gjStyle.stroke || gjStyle['marker-color'], '#ff0000'),
                weight: iifUndefined(gjStyle['stroke-weight'], 1),
                opacity: iifUndefined(gjStyle['stroke-opacity'], 0.8),
                fillOpacity: iifUndefined(gjStyle['fill-opacity'], 0.2),
            };
        }

        /**
         * Converts style properties from standard app as http://geojson.io to
         * 'leaflet properties' used for styling markers and geometries.
         * @param {flat object} gjStyle 
         */
        function geoJsonStyle2LeafletStyle(gjStyle) {
            return {
                radius: iifUndefined(gjStyle.radius || 12),
                fillColor: iifUndefined(gjStyle.fill, '#ff7800'),
                color: iifUndefined(gjStyle.stroke, '#ff0000'),
                weight: iifUndefined(gjStyle['stroke-weight'], 1),
                opacity: iifUndefined(gjStyle['stroke-opacity'], 0.8),
                fillOpacity: iifUndefined(gjStyle['fill-opacity'], 0.2),
                popupContent: gjStyle.popupContent
            };
        }

        /**
         * load a file with valid geojson content. 
         * It call to callback if success or error; first param is Error (if exist), 
         * and second param is data as text (if success)
         * @param {file} File object.
         * @param {Function callback} called for success or fail result: f(err, data)
         */
        function loadGeoJsonFromFile(file, callback) {
            var fileName = file ? file.name : 'null';
            var freader = new FileReader();
            freader.onload = function() {
                try {
                    var result = freader.result;
                    validateGeoJsonContent(result);
                    callback(null, result);
                } catch (msg) {
                    callback(new Error('No valid GeoJson file: [' + fileName + ']\n' + msg), null);
                }
            };
            try {
                freader.readAsText(file);
            } catch (err) {
                callback(new Error('Invalid ' + fileName + '\n' + err.message), null);
            }
        }

        /**
         * validateGeoJsonContent
         * @param {data JSON} As valid GeoJson
         *  
         */
        function validateGeoJsonContent(data) {
            var obj;
            try {
                obj = JSON.parse(data);
            } catch (err) {
                throw 'Invalid JSON data';
            }
            if (typeof obj !== 'object') {
                throw 'Invalid GeoJSON. Expected JSON format';
            }
            if (obj.type !== 'FeatureCollection') {
                throw 'Invalid GeoJSON. Expected {type:\'FeatureCollection\'...';
            }
            var features = obj.features;
            if (Object.prototype.toString.call(features) !== '[object Array]') {
                throw 'Invalid GeoJSON. Expected {features:[...]...';
            }
        }

        var GEOJSON_TYPES = {
            Point: 'geometry',
            MultiPoint: 'geometry',
            LineString: 'geometry',
            MultiLineString: 'geometry',
            Polygon: 'geometry',
            MultiPolygon: 'geometry',
            GeometryCollection: 'geometry',
            Feature: 'feature',
            FeatureCollection: 'featurecollection'
        };

        /**
         * Normalize a GeoJSON feature into a FeatureCollection.
         * Based on https://github.com/mapbox/geojson-normalize/blob/master/index.js
         *
         * @param {object | string} gj geojson data (only one object)
         * @returns {object} normalized geojson data
         */
        function normalizeGeoJson(gj) {
            var orig = gj; // object or string
            if (typeof gj === 'string') {
                gj = JSON.parse(gj);
            } else if (typeof gj !== 'object') {
                throw new Error('geojson is required as object or string. Nor valid ' + orig);
            }
            if (!gj || !gj.type) {
                throw new Error('Invalid geojson object ', orig);
            }
            var type = GEOJSON_TYPES[gj.type];
            if (!type) {
                throw new Error('Invalid geojson type ' + gj.type);
            }

            if (type === 'geometry') {
                return {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        properties: {},
                        geometry: gj
                    }]
                };
            } else if (type === 'feature') {
                return {
                    type: 'FeatureCollection',
                    features: [gj]
                };
            } else if (type === 'featurecollection') {
                return gj;
            }
        }

        //
        // Classes
        // 

        /**
         * UxGeoJsonManager manage geojson layer creation and marker/geometries configuration.
         * Permite poner en modo edición sus geometrías y añade botones para añadir más geometrías.
         * @param {map L.Map} L.Map instance
         * @param {data JSON} valid geo json information
         * @param {options OBJECT} style, onEachFeature, pointToLayer, onFeatureCommited listener, etc.
         */
        function UxGeoJsonManager(map, data, options) {

            var _this = this;

            var defaultOptions = {
                radius: 12,
                fillColor: '#ff7800',
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.2,
                aweMarkerCss: 'hand-o-down',
                onFeatureCommited: _onFeatureCommited
            };

            // private fields
            this._map = map; // TODO - check valid map instance
            this._uxEditionControl = null;

            this.options = L.extend({}, defaultOptions, options);

            /** It represent de L.GeoJson FeatureLayer */
            this.layer = L.geoJson(data, {

                // UX configuration for geometries read from geoJSON

                style: this.options.style || function(feature) {
                    // default style
                    if (feature.properties) {
                        var style = geoJsonStyle2LeafletStyle(feature.properties);
                        return style;
                    } else {
                        return { color: '#ff8800' };
                    }
                },

                onEachFeature: this.options.onEachFeature || function(feature, layer) {
                    // default on each feature
                    if (feature.properties && feature.properties.popupContent) {
                        // usamos este valor como contenido de popup
                        layer.bindPopup(feature.properties.popupContent);
                    }
                },

                pointToLayer: this.options.pointToLayer || function(feature, latlng) {
                    var cssName = _this.options.aweMarkerCss;
                    var layer = mapMarkerService.createMarker(feature, latlng, { defaultAweSymbol: cssName });
                    return layer;
                },

                filter: this.options.filter || function(feature, layer) {
                    return true;
                }

            }); // layer creation

            /** Change edition mode in map passed as argument or in last map used. */
            this.setEditionMode = function (isEnabled) {
                // Add/remove buttons to add/remove geometries.
                // en primera versión usar solo botón para añadir polígonos.
                var map = this._map;
                if (!map) {
                    throw 'Error. No has Map associated to this GeoJson Manager';
                }

                if (isEnabled) {
                    this._uxEditionControl = new L.Control.UxEdition({ position: 'topright', onFeatureCommited: this.options.onFeatureCommited });
                    this._uxEditionControl.addTo(map);
                    this._uxEditionControl.setLayer(this.layer._layers);
                    //this._uxEditionControl.on;
                } else {
                    if (this._uxEditionControl) {
                        this._uxEditionControl.setLayer(undefined);
                        map.removeControl(this._uxEditionControl);
                        delete this._uxEditionControl;
                    }
                }

                // search editable geometries and set it in editionMode
                try {
                    for (var key in this.layer._layers) {
                        var geomLayer = this.layer._layers[key];
                        if (isEnabled) {
                            if (geomLayer.enableEdit) {
                                geomLayer.enableEdit(map);
                            } else {
                                // no editable
                            }
                        } else {
                            if (geomLayer.disableEdit) {
                                geomLayer.disableEdit();
                            } else {
                                // no editable
                            }
                        }
                    }
                } catch (err) {
                    console.error('Error interno habilitando edición de geometrías GeoJSON', err);
                }
            };

            /**
             * Generate geoJson string from all features contained in
             * current layer.
             * All elements of gj layer are layers editable and convertible to GeoJSON.
             * @param {* string} geojson string
             */
            this.layersToGeoJson = function () {
                var features = [];
                for (var key in this.layer._layers) {
                    var lyr = this.layer._layers[key];
                    try {
                        // layer editable
                        lyr.editor.commitDrawing();
                        var feature = lyr.toGeoJSON();
                        features.push(feature);
                    } catch (err) {
                        console.error(' Layer can be converted to feature: ', err);
                    }
                }
                var result = {
                    'type': 'FeatureCollection',
                    'features': features,
                    'lastEdition': new Date().toISOString()
                };
                var sResult = JSON.stringify(result);
                return sResult;
            };

            /* listener por defecto para 'commits' de los botones de edición */
            function _onFeatureCommited(evt) {
                var json = evt.layer.toGeoJSON ? evt.layer.toGeoJSON() : '';
                console.info('map-ux-geojson-service: commited feature. Action: ' + evt.action, json);
            }

        } // UxGeoJsonManager class

    }
);