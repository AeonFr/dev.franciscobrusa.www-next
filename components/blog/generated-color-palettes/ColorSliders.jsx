import { useState } from "react";
import { ColorPalette, HSLuvColorPalette } from "./ColorPalette";

export const RGBSlider = () => {
  const [rgb, setRgb] = useState([247, 103, 187]);

  const color = `rgb(${rgb.join(",")})`;
  const hex =
    "#" +
    componentToHex(rgb[0]) +
    componentToHex(rgb[1]) +
    componentToHex(rgb[2]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2em",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minWidth: "5em",
          maxWidth: "50%",
          flexShrink: 0,
          flexGrow: 1,
        }}
      >
        <div
          style={{
            backgroundColor: color,
            paddingBottom: "100%",
          }}
        />
      </div>
      <div
        style={{
          minWidth: "10em",
          flexShrink: 0,
          flexGrow: 2,
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <span>
          Hex: <code>{hex}</code>
        </span>

        <RangeColorInput
          label="Red"
          value={rgb[0]}
          onChange={(r) => setRgb([r, rgb[1], rgb[2]])}
        />
        <RangeColorInput
          label="Green"
          value={rgb[1]}
          onChange={(g) => setRgb([rgb[0], g, rgb[2]])}
        />
        <RangeColorInput
          label="Blue"
          value={rgb[2]}
          onChange={(b) => setRgb([rgb[0], rgb[1], b])}
        />
      </div>
    </div>
  );
};

const RangeColorInput = ({ label, value, onChange, max = 255 }) => {
  return (
    <div style={{ display: "flex" }}>
      <label
        htmlFor="red"
        style={{
          width: "7.2em",
          display: "flex",
          justifyContent: "space-between",
          marginRight: "1em",
        }}
      >
        {label}:<code style={{ width: "1.9em" }}>{value}</code>
      </label>
      <input
        id="red"
        type="range"
        min="0"
        max={max}
        style={{ flexGrow: "1" }}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
};

const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const SaturationSlider = () => {
  const [saturation, setSaturation] = useState(0);

  const color = `hsl(0, ${saturation}%, 50%)`;

  return (
    <div
      style={{
        width: "15rem",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: color,
          paddingBottom: "100%",
        }}
      />

      <code
        style={{
          display: "block",
          textAlign: "center",
          margin: "1rem 0",
        }}
      >
        hsl(0, <span style={{ color: `hsl(0, 100%, 50%)` }}>{saturation}%</span>
        , 50%)
      </code>

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={saturation}
        onChange={(e) => setSaturation(e.target.value)}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export const HueSlider = () => {
  const [hue, setHue] = useState(0);

  const color = `hsl(${hue}, 100%, 50%)`;

  return (
    <div
      style={{
        width: "15rem",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: color,
          paddingBottom: "100%",
        }}
      />

      <code
        style={{
          display: "block",
          textAlign: "center",
          margin: "1rem 0",
        }}
      >
        hsl(
        <span style={{ color: `hsl(0, 100%, 50%)` }}>{hue}</span>, 100%, 50%)
      </code>

      <input
        type="range"
        min="0"
        max="360"
        step="1"
        value={hue}
        onChange={(e) => setHue(e.target.value)}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export const ColorPaletteSlider = () => {
  const [hue, setHue] = useState(325);
  const [saturation, setSaturation] = useState(90);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <ColorPalette hue={hue} saturation={saturation} />
      <RangeColorInput label="Hue" value={hue} onChange={setHue} max={360} />
      <RangeColorInput
        label="Saturation"
        value={saturation}
        onChange={setSaturation}
        max={100}
      />
    </div>
  );
};

export const HSLuvColorPaletteSlider = () => {
  const [hue, setHue] = useState(325);
  const [saturation, setSaturation] = useState(90);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <HSLuvColorPalette hue={hue} saturation={saturation} />
      <RangeColorInput label="Hue" value={hue} onChange={setHue} max={360} />
      <RangeColorInput
        label="Saturation"
        value={saturation}
        onChange={setSaturation}
        max={100}
      />
    </div>
  );
};

export const HCLColorPaletteSlider = () => {
  const [hue, setHue] = useState(325);
  const [saturation, setSaturation] = useState(90);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <HCLColorPalette hue={hue} saturation={saturation} />
      <RangeColorInput label="Hue" value={hue} onChange={setHue} max={360} />
      <RangeColorInput
        label="Saturation"
        value={saturation}
        onChange={setSaturation}
        max={100}
      />
    </div>
  );
};
