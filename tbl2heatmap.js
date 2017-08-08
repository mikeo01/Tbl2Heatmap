var Heatmap;
(function (Heatmap) {
    // Default values
    var SATURATION = 80;
    var LIGHTNESS = 50;
    /**
     * Static hues for use with heatmap (default colours)
     */
    var Hues;
    (function (Hues) {
        Hues[Hues["Red"] = 0] = "Red";
        Hues[Hues["Orange"] = 30] = "Orange";
        Hues[Hues["Yellow"] = 60] = "Yellow";
        Hues[Hues["Green"] = 90] = "Green";
        Hues[Hues["Turquoise"] = 180] = "Turquoise";
        Hues[Hues["Blue"] = 240] = "Blue";
        Hues[Hues["Purple"] = 260] = "Purple";
        Hues[Hues["Pink"] = 300] = "Pink";
    })(Hues || (Hues = {}));
    /**
     * Colors is for use externally if a default HSL is desired
     */
    var Colors = (function () {
        function Colors() {
        }
        Colors.Red = { h: Hues.Red, s: SATURATION, l: LIGHTNESS };
        Colors.Orange = { h: Hues.Orange, s: SATURATION, l: LIGHTNESS };
        Colors.Yellow = { h: Hues.Yellow, s: SATURATION, l: LIGHTNESS };
        Colors.Green = { h: Hues.Green, s: SATURATION, l: LIGHTNESS };
        Colors.Turquoise = { h: Hues.Turquoise, s: SATURATION, l: LIGHTNESS };
        Colors.Blue = { h: Hues.Blue, s: SATURATION, l: LIGHTNESS };
        Colors.Purple = { h: Hues.Purple, s: SATURATION, l: LIGHTNESS };
        Colors.Pink = { h: Hues.Pink, s: SATURATION, l: LIGHTNESS };
        /**
         * Helper method to generate a HSL
         */
        Colors.generateHSL = function (h, s, l) {
            return {
                h: h,
                s: s,
                l: l
            };
        };
        /**
         * Helper method to output HSL string
         */
        Colors.output = function (hsl) {
            return "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
        };
        return Colors;
    }());
    Heatmap.Colors = Colors;
    /**
     * generateHeatmap builds a heatmap from tabular data
     * @param h IHeatmap    Interface required for heatmap generation
     */
    function generateHeatmap(h) {
        try {
            var hsl = h.getShade();
            var cells = Array.prototype.slice.call(h.getTable().querySelectorAll('.heatmap .heatmap-row .heatmap-cell'));
            // For dynamic heatmap
            var heatmap = {};
            // Build up heatmap information
            for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                var cell = cells_1[_i];
                // Clear any characters which shouldn't be there
                var val = String(parseInt(cell.innerHTML));
                // Initialise empty
                if (typeof heatmap[val] == 'undefined') {
                    heatmap[val] = {
                        hsl: null,
                        htmlElements: []
                    };
                }
                // Store cell which uses this particular entry
                heatmap[val].htmlElements.push(cell);
            }
            // Calculate range
            var range = 100 - hsl.l;
            // Calculate spread
            var spread = range / Object.keys(heatmap).length;
            // Calculate heatmap length
            var x = Object.keys(heatmap).length;
            // Calculate HSL and apply background colours
            for (var h_1 in heatmap) {
                // Calculate HSL
                heatmap[h_1].hsl = Colors.generateHSL(hsl.h, hsl.s, (spread * x) + range);
                // Apply background colours
                for (var _a = 0, _b = heatmap[h_1].htmlElements; _a < _b.length; _a++) {
                    var cell = _b[_a];
                    cell.style.backgroundColor = Colors.output(heatmap[h_1].hsl);
                }
                --x;
            }
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
    Heatmap.generateHeatmap = generateHeatmap;
})(Heatmap || (Heatmap = {}));
