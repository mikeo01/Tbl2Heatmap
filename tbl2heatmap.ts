namespace Heatmap {
    // Default values
    const SATURATION: number = 80;
    const LIGHTNESS: number = 50;

    /**
     * HSL defines HSL object required for Hue class
     */
    interface HSL {
        h: number;
        s: number;
        l: number;
    }

    /**
     * Static hues for use with heatmap (default colours)
     */
    enum Hues {
        Red = 0,
        Orange = 30,
        Yellow = 60,
        Green = 90,
        Turquoise = 180,
        Blue = 240,
        Purple = 260,
        Pink = 300,
    }

    /**
     * Colors is for use externally if a default HSL is desired
     */
    export class Colors {
        static readonly Red: HSL = { h: Hues.Red, s: SATURATION, l: LIGHTNESS };
        static readonly Orange: HSL = { h: Hues.Orange, s: SATURATION, l: LIGHTNESS };
        static readonly Yellow: HSL = { h: Hues.Yellow, s: SATURATION, l: LIGHTNESS };
        static readonly Green: HSL = { h: Hues.Green, s: SATURATION, l: LIGHTNESS };
        static readonly Turquoise: HSL = { h: Hues.Turquoise, s: SATURATION, l: LIGHTNESS };
        static readonly Blue: HSL = { h: Hues.Blue, s: SATURATION, l: LIGHTNESS };
        static readonly Purple: HSL = { h: Hues.Purple, s: SATURATION, l: LIGHTNESS };
        static readonly Pink: HSL = { h: Hues.Pink, s: SATURATION, l: LIGHTNESS };
        /**
         * Helper method to generate a HSL
         */
        static readonly generateHSL = function (h: number, s: number, l: number): HSL {
            return {
                h: h,
                s: s,
                l: l
            };
        };
        /**
         * Helper method to output HSL string
         */
        static readonly output = function (hsl: HSL): string {
            return `hsl(` + hsl.h + `, ` + hsl.s + `%, ` + hsl.l + `%)`;
        };
    }

    /**
     * IHeatmap describes the methods required for heatmap generation
     */
    export interface IHeatmap {
        /**
         * getShade should return a string a HSL shade for heatmap use
         */
        getShade(): HSL;
        /**
         * getTable should return the table HTMLElement to convert to heatmap
         */
        getTable(): HTMLElement;
    }

    /**
     * Generic interface which describes heatmap information
     */
    interface Heatmap {
        hsl: HSL | null; // Shade to use (nullable)
        htmlElements: Array<HTMLElement>; // Elements which use this shade
    }

    /**
     * Dictionary types that is described by Heatmap
     */
    type Dictionary = { [key: string]: Heatmap };

    /**
     * generateHeatmap builds a heatmap from tabular data
     * @param h         IHeatmap    Interface required for heatmap generation
     * @param selector  String      DOM selector for heatmap
     */
    export function generateHeatmap(h: IHeatmap, selector: string = '.heatmap-cell'): boolean {
        try {
            const hsl: HSL = h.getShade();
            const cells: any = Array.prototype.slice.call(
                h.getTable().querySelectorAll('.heatmap .heatmap-row ' + selector)
            );

            // For dynamic heatmap
            let heatmap: Dictionary = {};

            // Build up heatmap information
            for (const cell of cells) {
                // Clear any characters which shouldn't be there
                const val = String(parseInt(cell.innerHTML));

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
            const range: number = 100 - hsl.l;
            // Calculate spread
            const spread: number = range / Object.keys(heatmap).length;
            // Calculate heatmap length
            let x = Object.keys(heatmap).length;

            // Calculate HSL and apply background colours
            for (let h in heatmap) {
                // Calculate HSL
                heatmap[h].hsl = Colors.generateHSL(hsl.h, hsl.s, (spread * x) + range);

                // Apply background colours
                for (const cell of heatmap[h].htmlElements) {
                    cell.style.backgroundColor = Colors.output(
                        heatmap[h].hsl
                    );
                }

                --x;
            }

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
