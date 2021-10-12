import { style } from "@vanilla-extract/css";

export const listContainer = style({
  padding: 0,
  listStyle: "none",
});

export const listItem = style({
  margin: "1em 0",
  listStyle: "none",
  padding: 0,
});

export const link = style({
  color: "inherit",
  fontSize: "1.25em",
  textDecoration: "none",
  borderBottom: "1px solid var(--accent)",
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
