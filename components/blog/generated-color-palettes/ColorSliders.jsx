import { useState } from "react";

export const SaturationSlider = () => {
  const [saturation, setSaturation] = useState(0);

  const color = `hsl(0, ${saturation}%, 50%)`;

  return (
    <div>
      <div
        style={{
          width: "15rem",
          maxWidth: "100%",
        }}
      >
        <code>
          hsl(0,{" "}
          <span style={{ color: `hsl(0, 100%, 50%)` }}>{saturation}%</span>,
          50%)
        </code>

        <div
          style={{
            backgroundColor: color,
            paddingBottom: "100%",
            margin: "1rem 0",
          }}
        />

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
    </div>
  );
};

export const HueSlider = () => {
  const [hue, setHue] = useState(0);

  const color = `hsl(${hue}, 100%, 50%)`;

  return (
    <div>
      <div
        style={{
          width: "15rem",
          maxWidth: "100%",
        }}
      >
        <code>
          hsl(
          <span style={{ color: `hsl(0, 100%, 50%)` }}>{hue}</span>, 100%, 50%)
        </code>

        <div
          style={{
            backgroundColor: color,
            paddingBottom: "100%",
            margin: "1rem 0",
          }}
        />

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
    </div>
  );
};
