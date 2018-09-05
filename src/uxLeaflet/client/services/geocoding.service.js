'use strict';

angular.module('uxleaflet').service('geocodingService', UxLeaflet_GeocodingService);

/**   
 * uxleaflet.geocodingService implements geo utilities search address and locations.
 * It allows search a lo location from address.
 * It allows reverse search of the nearest address from a geo location
 * 
 * NOTE:
 * An instance of will be setted to L.Util.geocodingService (provisional)
 */
function UxLeaflet_GeocodingService($http) {

    var _this = this;

    var opts = {}; // default options for this service
    var _geoCodingService = new L.OsmGeocodingService($http, opts);

    /* Esto puede usarse para configurar el tipo de respuesta en reverse-geocoding */
    var FULL_RESPONSE_TEMPLATE = {
        'house_number': { 'Num casa': true },
        'road': { 'Calle': true },
        'suburb': { 'Suburb': false },
        'city': { 'Ciudad': true },
        'county': { 'Provincia': true },
        'state_district': { 'Suburb': false },
        'state': { 'Estado': false },
        'postcode': { 'CP': false },
        'country': { 'País': true },
        'country_code': { 'cc': false }
    };

    /**
     * Return information given a description of a feature.
     * @param {String} sDescription 
     * @param {*} callback (err, responseData)
     * @return {json array} a json like () [{'place_id':'179320264','osm_type':'relation','osm_id':'5326784',
     *  'boundingbox':['40.3119774','40.6437293','-3.8889539','-3.5179163'],
     *   'lat':'40.4167047','lon':'-3.7035825',
     *   'display_name':'Madrid, Área metropolitana de Madrid y Corredor del Henares, Comunidad de Madrid, España',
     *   'class':'place','type':'city','importance':0.29353044801777,
     *   'icon':'http:\/\/nominatim.openstreetmap.org\/images\/mapicons\/poi_place_city.p.20.png',
     *   'address':{'city':'Madrid','county':'Área metropolitana de Madrid y Corredor del Henares',
     *       'state':'Comunidad de Madrid','country':'España','country_code':'es'}}]
     */
    _this.search = function(sDescription, options, callback) {

        var escapedText = sDescription; // TODO - escapar
        var limit = (!options && '2') || (options.limit || '3');

        _geoCodingService.search(escapedText, options, callback);

    };

    /**
     * https://nominatim.openstreetmap.org/reverse
     * @param {*} lat 
     * @param {*} lon 
     * @param {*} callback 
     * @param {*} optFormat. formato del json respuesta, por defecto se devuelve todo lo que responde el webservce
     * @return JSON object with data and metadata of this location
     */
    _this.reverseSearch = function(lat, lon, zoom, callback, optFormat, language_code) {

        var resp = $.extend({}, FULL_RESPONSE_TEMPLATE);
        optFormat = $.extend({}, optFormat);

        _geoCodingService.reverseSearch(lat, lon, zoom, function(err, data) {
            // 
            if (err) {
                callback(err);
            } else {
                // formatear respuesta
                var resp2 = formatGeoResponse(data);
                callback(null, resp2);
            }
        }, optFormat, language_code);

    };

    /**
     * 
     * @param {*} baseUrl 
     * @param {*} lat
     * @param {*} lon 
     * @param {*} zoom 
     */
    function formatGeoResponse(geoData) {
        // usar FULL_RESPONSE_TEMPLATE para formatear la respuesta si fuera necesario
        return geoData;
    }

}

/*
  Ejemplo:
   
  https://nominatim.openstreetmap.org/reverse?format=xml&lat=52.548&lon=-1.81607&zoom=15&addressdetails=1

    lat/lon  4 decimales ya tienen precisión de 1 metro.
    zoom: (18, 1) nivel de detalle de la respuesta: 18 número de casa, 15 barrio, 10 ciudad ...

    Ejemplo con nivel 18;
    ---------------------
    <addressparts>
        <house_number>137</house_number>
        <road>Pilkington Avenue</road>
        <suburb>Sutton Coldfield</suburb>
        <city>Birmingham</city>
        <county>West Midlands Combined Authority</county>
        <state_district>West Midlands</state_district>
        <state>Inglaterra</state>
        <postcode>B72 1LH</postcode>
        <country>Reino Unido</country>
        <country_code>gb</country_code>
    </addressparts>

    https://nominatim.openstreetmap.org/reverse?format=json&lat=52.5487429714954&lon=-1.81602098644987&zoom=18&addressdetails=1

    {
        'place_id':'91015268',
        'licence':'Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright',
        'osm_type': 'way',
        'osm_id':'90394420',
        'lat':'52.54877605',
        'lon':'-1.81627033283164',
        'display_name':'137, Pilkington Avenue, Sutton Coldfield, Birmingham, West Midlands Combined Authority, West Midlands, Inglaterra, B72 1LH, Reino Unido',
        'address':{
            'house_number':'137',
            'road':'Pilkington Avenue',
            'suburb':'Sutton Coldfield','city':'Birmingham','county':'West Midlands Combined Authority',
            'state_district':'West Midlands',
            'state':'Inglaterra',
            'postcode':'B72 1LH',
            'country':'Reino Unido',
            'country_code':'gb'
        },
        'boundingbox':['52.5487321','52.5488299','-1.8163514','-1.8161885']}
    
 */