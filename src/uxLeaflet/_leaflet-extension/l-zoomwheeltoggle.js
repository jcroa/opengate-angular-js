/*
 * [uxleaflet/client] 
 * https://github.com/ardhi/Leaflet.ZoomWheelToggle
 * File: l-zoomwheeltoggle.js 
 */

(function() {
    'use strict';

    L.Control.ZoomWheelToggle = L.Control.extend({
        options: {
            position: 'topleft',
            text: 'Click to enable zoom with mouse wheel',
            detectBodyScroll: true
        },

        onAdd: function(map) {
            this._container = L.DomUtil.create('div', 'leaflet-control-zoomwheeltoggle');
            this._span = L.DomUtil.create('span', '', this._container);
            this._suscribeEvents(map);
            this._refreshText();
            return this._container;
        },

        addTo: function(map) {
            this._map = map;
            // add directly to map Container
            this._container = this.onAdd(map);
            // L.DomUtil.addClass(this._container, 'leaflet-control');
            this._map._container.appendChild(this._container);
            return this;
        },

        removeFrom: function(map) {
            this._map._container.removeChild(this._container);
        },

        _isBodyScrollVisible: function() {
            var hasScrollBar = true;
            if (typeof window.innerWidth === 'number') {
                hasScrollBar = window.innerWidth > document.body.clientWidth;
            }
            return hasScrollBar;
        },

        _timeout: null,

        _suscribeEvents: function(map) {
            if (this._isBodyScrollVisible()) {
                map.scrollWheelZoom.disable();
                this._setTextVisible(false);
            }
            var _this = this;

            map.on('fullscreenchange', function(event) {
                var enable = event.target._isFullscreen;
                _this._setMouseWheelEnabled(enable, true);
            });

            map.on('contextmenu', function(event) {
                _this._setMouseWheelEnabled(true);
            });
            map.on('click', function(event) {
                _this._setMouseWheelEnabled(true);
            });

            map.on('mouseout', function(event) {
                _this._setMouseWheelEnabled(false, true);
            });
            map.on('blur', function(event) {
                // _this._setMouseWheelEnabled(false);
            });
            map.on('mousemove', function(event) {
                if (!event.target._isFullscreen) {
                    if (!map.scrollWheelZoom._enabled) {
                        _this._setTextVisible(true);
                    }
                }
            });
        },

        _setMouseWheelEnabled: function(v, preCondition) {
            if (preCondition) {
                // usamos precondición si this.detectBodyScrol
                if (this.options.detectBodyScroll) {
                    v = v || !this._isBodyScrollVisible();
                }
            }
            if (v) {
                this._map.scrollWheelZoom.enable();
                this._container.style.display = 'none';
            } else {
                this._map.scrollWheelZoom.disable();
                this._container.style.display = '';
                this._setTextVisible(true, 0, function() {
                    this._setTextVisible(false, 200);
                });
            }
            this._setTextVisible(false, 0);
        },

        _setTextVisible: function(v, millis, cb) {
            var _this = this;
            if (this._timeout) clearTimeout(this._timeout);
            this._timeout = setTimeout(function() {
                if (v) {
                    _this._container.style.opacity = '0.4';
                } else {
                    _this._container.style.opacity = '0';
                }
                if (cb) cb();
            }, millis || 0);
        },

        _windowResized: function(evt) {
            // TODO - detectar si hay scroll para evitar desactivar zoom-wheel
            if ($("body").height() > $(window).height()) {}
        },

        onRemove: function(map) {
            map.off('mousemove', this._onMouseMove);
        },

        setText: function(sText) {
            this.options.text = sText;
            this._refreshText();
        },
        _refreshText: function() {
            this._span.innerHTML = this.options.text;
        }

    });

    L.Map.mergeOptions({
        zoomWheelToggle: false
    });

    L.Map.addInitHook(function() {
        if (this.options.zoomWheelToggle) {
            var opts = this.options.zoomWheelToggle;
            opts = (typeof opts === 'object') ? opts : {};
            this.zoomWheelToggleControl = new L.Control.ZoomWheelToggle(opts);
            this.addControl(this.zoomWheelToggleControl);
        }
    });

    L.Map.prototype.enableWheelZoomToggle = function(options) {
        this.zoomWheelToggleControl = new L.Control.ZoomWheelToggle(options);
        this.addControl(this.zoomWheelToggleControl);
    };

    L.control.zoomWheelToggle = function(options) {
        return new L.Control.ZoomWheelToggle(options);
    };

    var styleElem = document.createElement('style');
    styleElem.type = 'text/css';

    styleElem.innerHTML = ' \n ' +
        '.leaflet-control-zoomwheeltoggle {  \n ' +
        '    position: absolute;  \n ' +
        '    text-align: center;  \n ' +
        '    pointer-events: none;  \n ' +
        '    width: 98%;  \n ' +
        '    opacity: .5;  \n ' +
        '    z-index: 1;  \n ' +
        '    transition: 1s;  \n ' +
        '    padding-top: 30px;  \n ' +
        ' } \n ' +
        '.leaflet-control-zoomwheeltoggle span {  \n ' +
        '    background-color: #000000;  \n ' +
        '    text-align: center;  \n ' +
        '    color: #ffffff;  \n ' +
        '    font-size: 14px;  \n ' +
        '    padding: 1em; \n ' +
        '    padding-left: 3em; \n ' +
        '    padding-right: 3em; \n ' +
        ' } \n ' +
        document.head.appendChild(styleElem);

})();