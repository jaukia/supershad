import eaze from 'eaze';

/*************************
 * INTERFACES
 *************************/

type Optional<Type> = {
  [Property in keyof Type]+?: Type[Property];
};

interface ShadowParams {
  xAngleDeg: number;
  yAngleDeg: number;
  resolution: number;
  crispness: number;
  useSpread: boolean;
  useStroke: boolean;
  useDebug: boolean;
  hslPartialShadowColor: string;
}

const defaultShadowParams: ShadowParams = {
  xAngleDeg: 10.0,
  yAngleDeg: 30.0,
  resolution: 0.5,
  crispness: 0.5,
  useSpread: true,
  useStroke: true,
  useDebug: false,
  hslPartialShadowColor: 'var(--shadow-color)',
};

/*************************
 * SUPERSHAD MAIN FUNCTIONS
 *************************/

export const supershad = (
  elevations = [0.025, 0.1, 0.25, 1.0],
  baseElevation = 200.0,
  paramsIn: Optional<ShadowParams> = {},
): string[] => {
  const params = {
    ...defaultShadowParams,
    ...paramsIn,
  };
  return elevations.map((val: number) => generateShadow(params, baseElevation * val));
};

function generateShadow(params: ShadowParams, elevation: number): string {
  const crispRatio = params.crispness;

  const xOffsetMax = offsetFromAngle(degToRad(params.xAngleDeg), elevation);
  const yOffsetMax = offsetFromAngle(degToRad(params.yAngleDeg), elevation);

  // heuristics dor deciding how many steps (layers) to generate
  // based on the (abs) distance of the shadow
  const planeDistance = Math.sqrt(xOffsetMax * xOffsetMax + yOffsetMax * yOffsetMax);
  let steps;
  if (planeDistance < 10) {
    steps = computeLayerCount(2, 3, params.resolution);
  } else if (planeDistance < 15) {
    steps = computeLayerCount(2, 5, params.resolution);
  } else if (planeDistance < 25) {
    steps = computeLayerCount(3, 5, params.resolution);
  } else {
    steps = computeLayerCount(3, 10, params.resolution);
  }

  const opacityEasing: [number, number, number, number] = [0, 0, 1, 1];
  const maxOpacity = Math.min(0.8 * (1.0 / (steps + 1.5)) * (0.6 + 0.4 * crispRatio), 1.0);
  const minOpacity = maxOpacity * (1.0 - 0.5 * crispRatio);
  const maxOpacityChange = maxOpacity * 0.5 * crispRatio;

  // more blur for large distances
  // relatively more blur for small amounts of layers and for small crisp ratios
  let maxBlur = (planeDistance + 4.0) * (1.0 - (0.5 * crispRatio - 0.25));

  // more negative spread for large distances and higher crispness
  let maxSpread = -1.0 * planeDistance * (0.1 * 2.0 * crispRatio);

  if (!params.useSpread) maxSpread = 0.0;
  if (params.useDebug) {
    maxBlur = 0.0;
  }

  // these are all using now ease-in (circ) like easing https://www.cssportal.com/css-cubic-bezier-generator/
  const blurEasing: [number, number, number, number] = [0.7, 0.1, 0.9, 0.3];
  const spreadEasing: [number, number, number, number] = [0.7, 0.1, 0.9, 0.3];

  // from linear to ease-out
  const offsetEasing: [number, number, number, number] = [0.5 + 0.5 * crispRatio, 0.1, 0.9, 0.7];

  const eased = eaze(
    steps,
    { value: xOffsetMax, easing: offsetEasing },
    { value: yOffsetMax, easing: offsetEasing },
    { value: maxBlur, easing: blurEasing },
    { value: maxSpread, easing: spreadEasing },
    { value: maxOpacityChange, easing: opacityEasing, reverse: true },
  );

  // clean up long decimals
  const fixed = (num: number, precision = 2) => parseFloat(num.toFixed(precision)).toString();

  const shadows: string[] = eased.map(([xOffset, yOffset, blur, spread, opacityChange]: number[]) => {
    const opacity = minOpacity + opacityChange;
    const cssString = `${fixed(xOffset)}px ${fixed(yOffset)}px ${fixed(blur)}px ${fixed(spread)}px hsl(${
      params.hslPartialShadowColor
    } / ${fixed(opacity)})`;
    return cssString;
  });

  if (params.useStroke) {
    shadows.push(`0px 0px 0px 1px hsl(${params.hslPartialShadowColor} / 0.04)`);
  }

  return shadows.join(',\n');
}

function computeLayerCount(min: number, max: number, res: number) {
  return Math.round(min + ((max - min) * res) / 100.0);
}

function degToRad(angleDeg: number) {
  return (angleDeg * Math.PI) / 180.0;
}

function offsetFromAngle(angleRad: number, depth: number) {
  return depth * Math.tan(angleRad);
}

/*************************
 * DEFAULT EXPORT
 *************************/

export default supershad;
