import { style } from "@vanilla-extract/css";

export const row = style({
  display: "flex",
  gap: "1em",
  flexWrap: "wrap",
  flexDirection: "column",
  margin: "0",
  "@media": {
    "screen and (min-width: 40em)": {
      flexDirection: "row",
    },
  },
});

export const column = style({
  flex: 1,
  "@supports": {
    "not ((gap: 1em) with (display: flex))": {
      // dirty safari fallback
      marginBottom: "1em",
      marginRight: "1em",
    },
  },
});
