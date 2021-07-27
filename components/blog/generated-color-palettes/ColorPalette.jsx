import hsluv from "hsluv";

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
