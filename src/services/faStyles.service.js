angular.module('opengate-angular-js')
    .factory('faStylesService', ['$http', FaStylesService]);
/**   
 *  FaStyles is a service for FontAwesome styles
 * 
 */
function FaStylesService($http) {
    'use strict';

    var FA_STYLES = {};
    var FA_DISCRIMINATOR_TEXT = 'font-awesome'; // text containg in all css with FA styles

    // async task. It fill FA_STYLES
    asyncInitFaStyles(FA_DISCRIMINATOR_TEXT);

    //
    return {
        /* return all fa styles existing at now */
        getStyles: function () {
            return FA_STYLES;
        },

        /**  */
        getChar: getChar
    };

    ///
    /// Internal functions
    ///

    /**
     * return a hex representation of a Char from a cssSelector (starting with dot, without dot, or without .fa-)
     * @param {*} cssSelector  (example  .fa-info-circle, fa-info-circle, info-circle)
     */
    function getChar(cssSelector) {
        if (!cssSelector) {
            return "";
        }
        cssSelector = name + '';
        if (cssSelector.startsWith('.fa-') === false) {
            if (cssSelector.startsWith('fa-')) {
                cssSelector = '.' + cssSelector;
            } else {
                cssSelector = '.fa-' + cssSelector;
            }
        }
        return FA_STYLES[name] || '';
    }


    /**
     * mapping with keys as -fa-circle-info, fa-pepe, fa-xxxx and
     * as value a unicode character
     */
    function asyncInitFaStyles(faDiscriminatorText) {

        var sheets = document.styleSheets;
        for (var i = 0; i < sheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (sheet.href && sheet.href.indexOf(faDiscriminatorText) > 0) {
                try {
                    addSelectorsFromCss(sheet.href);
                } catch (err) {
                    console.error('WARN: Error httpRequesting file from ' + sheet.href, err);
                }
            }
        }
    }

    /**
     * httpRequest from url, extratc -fa- selectors with text content and mix with old  FA_STYLES items. 
     * @param {*} url 
     */
    function addSelectorsFromCss(url) {
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var moreFaStyles = extractFaStyles(response);
            // mix new css selctors with old content
            FA_STYLES = angular.extend(FA_STYLES, moreFaStyles);
        }, function errorCallback(err) {
            console.error('WARN: Error retrieving file from ' + url, err);
        });
    }

    /**
     *  Return a dictionoary where key is css awesome ids and values are unicode content
     *  for a character.
     *  They are be selected all cssSelectors staring with '.fa-'
     *  @param {resp} response of angular.$http
     */
    function extractFaStyles(resp) {

        var faStyles = {};

        var cssFileContent = resp.data || '';
        // all rules end with '}';
        var rules = cssFileContent.split('}');

        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var parts = rule.split('{');
            if (parts.length !== 2) {
                continue;
            }

            // Get the value of 'content'
            var sValue = parts[1];
            if (sValue.indexOf('content') === -1) {
                // sin contenido
                continue;
            }
            var sValueParts = sValue.split('"');
            if (sValueParts.length !== 3) {
                // solo se acepta una pareja de comillas en todo el "valor"
                continue;
            }
            var unicodeText = sValueParts[1].substring(1);

            // get all selectors starting with .fa
            var cssSelectors = parts[0].trim(); // eliminado :before
            var items = cssSelectors.split(',');

            // add each selector with unicodeText as value
            for (var j = 0; j < items.length; j++) {
                var cssSelector = items[j].split(':')[0].trim();
                // only selected if start with '.fa-'
                if (cssSelector.startsWith('.fa-')) {
                    faStyles[cssSelector.substring(1)] = unicodeText;
                }
            }

        }
        return faStyles;
    }

}