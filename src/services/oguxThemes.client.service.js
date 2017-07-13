'use strict';
angular.module('opengate-angular-js').service('$oguxThemes', [
    function() {
        var themes = [{
            'name': 'default'
        }, {
            'name': 'light'
        }];

        var colorThemes = {
            'red': {
                'id': 'red',
                'sample': '#f44336',
                'name': 'Red',
                'theme': ['light', 'default']
            },
            'pink': {
                'id': 'pink',
                'sample': '#e91e63',
                'name': 'Pink',
                'theme': ['light', 'default']
            },
            'purple': {
                'id': 'purple',
                'sample': '#9c27b0',
                'name': 'Purple',
                'theme': ['light']
            },
            'deeppurple': {
                'id': 'deeppurple',
                'sample': '#673ab7',
                'name': 'Deep Purple',
                'theme': ['light']
            },
            'indigo': {
                'id': 'indigo',
                'sample': '#3f51b5',
                'name': 'Indigo',
                'theme': ['light']
            },
            'blue': {
                'id': 'blue',
                'sample': '#2196f3',
                'name': 'Blue',
                'theme': ['light', 'default']
            },
            'lightblue': {
                'id': 'lightblue',
                'sample': '#03a9f4',
                'name': 'Light Blue',
                'theme': ['light', 'default']
            },
            'cyan': {
                'id': 'cyan',
                'sample': '#00bcd4',
                'name': 'Cyan',
                'theme': ['light', 'default']
            },
            'teal': {
                'id': 'teal',
                'sample': '#009688',
                'name': 'Teal',
                'theme': ['light', 'default']
            },
            'green': {
                'id': 'green',
                'sample': '#4caf50',
                'name': 'Green',
                'theme': ['light', 'default']
            },
            'lightgreen': {
                'id': 'lightgreen',
                'sample': '#8bc34a',
                'name': 'Light Green',
                'theme': ['light', 'default']
            },
            'lime': {
                'id': 'lime',
                'sample': '#cddc39',
                'name': 'Lime',
                'theme': ['default']
            },
            'yellow': {
                'id': 'yellow',
                'sample': '#ffeb3b',
                'name': 'Yellow',
                'theme': ['default']
            },
            'amber': {
                'id': 'amber',
                'sample': '#ffc107',
                'name': 'Amber',
                'theme': ['default']
            },
            'orange': {
                'id': 'orange',
                'sample': '#ff9800',
                'name': 'Orange',
                'theme': ['light', 'default']
            },
            'deeporange': {
                'id': 'deeporange',
                'sample': '#ff5722',
                'name': 'Deep Orange',
                'theme': ['light', 'default']
            },
            'brown': {
                'id': 'brown',
                'sample': '#795548',
                'name': 'Brown',
                'theme': ['light']
            },
            'grey': {
                'id': 'grey',
                'sample': '#9e9e9e',
                'name': 'Grey',
                'theme': ['light', 'default']
            },
            'bluegrey': {
                'id': 'bluegrey',
                'sample': '#607d8b',
                'name': 'Blue Grey',
                'theme': ['light', 'default']
            },
            'darkgrey': {
                'id': 'darkgrey',
                'sample': '#2D2D2D',
                'name': 'Dark Grey',
                'theme': ['light']
            }
        };

        return {
            colors: function() {
                return colorThemes;
            },
            themes: function() {
                return themes;
            },
            getColorConfig: function(colorId) {
                if (colorThemes[colorId]) {
                    return colorThemes[colorId];
                } else {
                    return undefined;
                }
            },
            getColorsKeys: function() {
                return Object.keys(colorThemes);
            },
            colorsByTheme: function(theme) {
                var themeColors = [];
                angular.forEach(colorThemes, function(config, color) {
                    if (config.theme.indexOf(theme) !== -1) {
                        themeColors.push(config);
                    }
                });
                return themeColors;
            }
        };
    }
]);