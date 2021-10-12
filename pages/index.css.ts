import { style } from "@vanilla-extract/css";

export const listContainer = style({
  padding: 0,
  listStyle: "none",
  "@media": {
    "(min-width: 58em)": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(20em, 1fr))",
      gap: "1em",
      alignItems: "start",
    },
  },
});

export const listItem = style({
  margin: "2em 0",
  listStyle: "none",
  padding: "1em 1em 1.5em 1.5em",
  backgroundColor: "var(--code-bg)",
  borderRadius: "1em",
  cursor: "pointer",
});

export const thumbnail = style({
  borderTopLeftRadius: "1em",
  borderTopRightRadius: "1em",
  margin: "-1em -1em 1.5em -1.5em",
  width: "calc(100% + 2.5em)",
});

export const link = style({
  color: "inherit",
  fontSize: "1.5em",
  fontWeight: "bold",
  textDecoration: "none",
  lineHeight: 1.2,
});

export const excerpt = style({
  fontSize: "0.875em",
  lineHeight: 1.2,
  marginTop: "0.5em",
  marginBottom: 0,
});

export const label = style({
  display: "inline-block",
  backgroundColor: "var(--accent)",
  color: "var(--bg)",
  padding: "0.175em 0.5em",
  borderRadius: "0.5em",
  fontSize: "0.825em",
  fontWeight: "bold",
});
