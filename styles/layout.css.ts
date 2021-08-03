import { composeStyles, style } from "@vanilla-extract/css";

const contentPaddingDesktop = {
  "@media": {
    "(min-width: 40rem)": {
      padding: "2rem",
    },
  },
};

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const block = style({
  width: "100%",
  maxWidth: "70rem",
  margin: "0 auto",
});

export const headerLink = style({
  display: "inline-block",
  padding: "0.5rem 1rem",
  fontWeight: "bold",
  color: "var(--accent)",
  ...contentPaddingDesktop,
});

export const logo = composeStyles(
  headerLink,
  style({
    userSelect: "none",
    fontWeight: "bolder",
    fontSize: "1.5rem",
    padding: "1rem",
    textDecoration: "none",
  })
);

export const content = style({
  maxWidth: "50rem",
  padding: "1em",
  flexGrow: 1,
  ...contentPaddingDesktop,
});
