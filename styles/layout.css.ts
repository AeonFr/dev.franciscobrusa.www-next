import { composeStyles, style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const block = style({
  width: "100%",
  maxWidth: "70rem",
  margin: "0 auto",
  padding: "1rem",
  "@media": {
    "(min-width: 40rem)": {
      padding: "1rem 2rem",
    },
  },
});

export const headerLink = style({
  display: "inline-block",
  padding: "0.5rem 1rem",
  fontWeight: "bold",
  color: "var(--accent)",
});

export const logo = composeStyles(
  headerLink,
  style({
    userSelect: "none",
    fontWeight: "bolder",
    fontSize: "1.5rem",
    padding: "0",
    textDecoration: "none",
  })
);

export const content = style({
  maxWidth: "55em",
  margin: "0 auto",
  flexGrow: 1,
  "@media": {
    "(min-width: 40rem)": {
      paddingRight: "5em",
    },
  },
});
