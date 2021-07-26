import { Fragment } from "react";

export const LegibilityBrokenSample = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        textAlign: "center",
        fontSize: "2em",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          color: "hsl(230, 100%, 50%)",
          padding: "1em 0.5em",
        }}
      >
        Aa
      </div>
      <div
        style={{
          backgroundColor: "black",
          color: "hsl(230, 100%, 50%)",
          padding: "1em 0.5em",
        }}
      >
        Aa
      </div>
      <div
        style={{
          backgroundColor: "black",
          color: "hsl(60, 100%, 50%)",
          padding: "1em 0.5em",
        }}
      >
        Aa
      </div>
      <div
        style={{
          backgroundColor: "white",
          color: "hsl(60, 100%, 50%)",
          padding: "1em 0.5em",
        }}
      >
        Aa
      </div>
    </div>
  );
};

export const ContrastBrokenSample = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        minWidth: "10em",
        textAlign: "center",
      }}
    >
      {[270, 180].map((hue) => (
        <Fragment key={`c-${hue}`}>
          <div
            style={{
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
              paddingBottom: "100%",
              padding: "1em 0.5em",
              color: hue > 200 ? "white" : "black",
            }}
          >
            s:50%
          </div>
          <div
            style={{
              backgroundColor: `hsl(${hue}, 100%, 60%)`,
              paddingBottom: "100%",
              padding: "1em 0.5em",
              color: hue > 200 ? "white" : "black",
            }}
          >
            s:60%
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export const HueBrokenSample = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        minWidth: "10em",
        textAlign: "center",
      }}
    >
      {[30, 230].map((hue) => (
        <Fragment key={`h-${hue}`}>
          <div
            style={{
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
              padding: "1em 0.5em",
              color: hue > 200 ? "white" : "black",
            }}
          >
            h:{hue}
          </div>
          <div
            style={{
              backgroundColor: `hsl(${hue + 30}, 100%, 50%)`,
              padding: "1em 0.5em",
              color: hue > 200 ? "white" : "black",
            }}
          >
            h:{hue + 30}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
