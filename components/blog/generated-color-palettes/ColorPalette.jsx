import hsluv from "hsluv";
import { generateAdaptiveTheme } from "@adobe/leonardo-contrast-colors";

export const ColorPalette = ({ hue = 0, saturation = 100 }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(11, 1fr)" }}>
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((lightness) => (
        <div
          key={lightness}
          style={{
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            // We could use aspectRatio or paddingBottom,
            // using the latter for better browser support
            // aspectRatio: "1 / 1",
            paddingBottom: "100%",
          }}
        />
      ))}
    </div>
  );
};

export const HSLuvColorPalette = ({ hue = 0, saturation = 100 }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(11, 1fr)" }}>
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((lightness) => (
        <div
          key={lightness}
          style={{
            backgroundColor: hsluv.hsluvToHex([hue, saturation, lightness]),
            // We could use aspectRatio or paddingBottom,
            // using the latter for better browser support
            // aspectRatio: "1 / 1",
            paddingBottom: "100%",
          }}
        />
      ))}
    </div>
  );
};

export const AdobeContrastColorPalette = ({ hue = 0, saturation = 100 }) => {
  const myTheme = generateAdaptiveTheme({
    colorScales: [
      {
        name: "default",
        colorKeys: [`hsl(${hue}, ${saturation}%, 50%)`],
        ratios: {
          0: -2,
          1: 1.16,
          2: 1.56,
          3: 2.33,
          4: 3.36,
          5: 4.81,
          6: 6.76,
          7: 9.29,
          8: 12.47,
          9: 16.36,
          10: 21,
        },
      },
    ],
    baseScale: "default",
    brightness: 100,
  });

  console.log({
    // 0: -2,
    0: -2 * (-1.26508273818 ^ 0),
    // 1: 1.16,
    1: -2 * (-1.26508273818 ^ 1),
    // 2: 1.56,
    2: -2 * (-1.26508273818 ^ 2),
    // 3: 2.33,
    3: -2 * (-1.26508273818 ^ 3),
    // 4: 3.36,
    4: -2 * (-1.26508273818 ^ 4),
    // 5: 4.81,
    5: -2 * (-1.26508273818 ^ 5),
    // 6: 6.76,
    6: -2 * (-1.26508273818 ^ 6),
    // 7: 9.29,
    7: -2 * (-1.26508273818 ^ 7),
    // 8: 12.47,
    8: -2 * (-1.26508273818 ^ 8),
    // 9: 16.36,
    9: -2 * (-1.26508273818 ^ 9),
    // 10: 21,
    10: -2 * (-1.26508273818 ^ 10),
  });

  const colors = myTheme[1].values.reverse().map((colorObj) => colorObj.value);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(11, 1fr)" }}>
      {colors.map((color) => (
        <div
          key={color}
          style={{
            backgroundColor: color,
            // We could use aspectRatio or paddingBottom,
            // using the latter for better browser support
            // aspectRatio: "1 / 1",
            paddingBottom: "100%",
          }}
        />
      ))}
    </div>
  );
};
