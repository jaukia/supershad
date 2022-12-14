# Supershad

Create beautiful layered CSS shadows automatically.

Try it out on Runkit https://npm.runkit.com/supershad with this example:

```js
var supershad = require("supershad");
const shadowDefs = supershad.default({xAngleDeg:10,
    yAngleDeg:30,resolution:0.5,crispness:0.5,useDebug:false});

const styles = `margin:2em;height:4em;background:white;
    display:flex;justify-content:center;align-items:center;`;
const elem = shadowDefs.map((s, i) => 
    `<div style="--rgb-partial-shadow-color:50,63,103;${styles}
    box-shadow:${s};">Shadow ${i}</div>`).join("\n");
```

Import in your code:

```js
import { supershad } from "supershad";
const shadowDefs = superpal();
// => returns box-shadow CSS style definitions
```

Interactive notebook with visualizations on Observable:
https://observablehq.com/@jaukia/supershad-npm-example

## Inspiration and References

Eaze library by Philipp Brumm, used for easing the shadow parameters  
https://github.com/brumm/eaze

Shadow Palette generator and the related blog post by Josh Comeau, copied some example styles from it and also the UI is really big inspiration  
https://www.joshwcomeau.com/shadow-palette/  
https://www.joshwcomeau.com/css/introducing-shadow-palette-generator/

Smooth Shadow tool by Philipp Brumm  
https://shadows.brumm.af

Layered Shadows blog post by Tobias Sahlin  
https://tobiasahlin.com/blog/layered-smooth-box-shadows/

Interesting Stackoverflow answers on how material design shadows can be constructed
https://stackoverflow.com/questions/30533055/calculating-shadow-values-for-all-material-design-elevations/

Getting Deep Into Shadows (CSS-Tricks)  
https://css-tricks.com/getting-deep-into-shadows/

Example shadows from various web apps and sites  
https://getcssscan.com/css-box-shadow-examples

## License

MIT License