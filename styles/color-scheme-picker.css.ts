import { composeStyles, globalStyle, style } from "@vanilla-extract/css";

export const wrapper = style({
  marginRight: "1rem", // compensate for scrollbar,
});

export const radioInput = style({
  display: "none",
});

export const label = style({
  display: "inline-flex",
  padding: "0.5rem",
  margin: "0.5rem 0",
  "@media": {
    "(min-width: 40rem)": {
      margin: "1.5rem 0.25rem",
    },
  },
});

export const svg = style({
  width: "1em",
  height: "1em",
});

globalStyle(`${wrapper} input:checked + label`, {
  borderRadius: "99px",
  color: "var(--bg)",
  backgroundColor: "var(--accent)",
});
