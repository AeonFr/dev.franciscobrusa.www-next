import { style } from "@vanilla-extract/css";

const mediaDesktop = ({ ...styles }) => {
  return {
    "@media": {
      "(min-width: 780px)": styles,
    },
  };
};

export const listContainer = style({
  padding: 0,
  listStyle: "none",
  ...mediaDesktop({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(20em, 1fr))",
    gap: "1em",
    alignItems: "start",
  }),
});

export const listItem = style({
  margin: "2em 0",
  listStyle: "none",
  backgroundColor: "var(--code-bg)",
  borderRadius: "1em",
  cursor: "pointer",
});

export const linkWrapper = style({
  display: "grid",
  gridTemplateColumns: "10fr 2fr",
  gridTemplateRows: "auto auto",
  gridGap: "0.25rem",
  ...mediaDesktop({
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto auto",
    gridGap: "1rem",
  }),
});

export const thumbnail = style({
  maxWidth: "100%",
  borderRadius: 0,
  borderTopRightRadius: "1rem",
  borderBottomRightRadius: "1rem",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top",
  gridColumnStart: 2,
  gridColumnEnd: 3,
  gridRowStart: 1,
  gridRowEnd: 3,
  ...mediaDesktop({
    borderRadius: 0,
    borderTopRightRadius: "1rem",
    borderTopLeftRadius: "1rem",
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 2,
  }),
});

export const link = style({
  color: "inherit",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "1rem",
  lineHeight: 1,
  padding: "1rem 0 0 1rem",
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 2,
  ...mediaDesktop({
    fontSize: "1.5rem",
    lineHeight: 1.2,
    padding: "0 1.5rem",
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRowStart: 2,
    gridRowEnd: 3,
  }),
});

export const excerpt = style({
  fontSize: "0.875em",
  lineHeight: 1.2,
  padding: "0rem 0rem 1rem 1rem",
  marginBottom: 0,
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 2,
  gridRowEnd: 3,
  ...mediaDesktop({
    padding: "0 1.5rem 1.5rem",
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRowStart: 3,
    gridRowEnd: 4,
  }),
});

export const label = style({
  display: "inline-block",
  backgroundColor: "var(--accent)",
  color: "var(--bg)",
  padding: "0.175em 0.5em",
  borderRadius: "0.5em",
  fontSize: "0.825em",
  fontWeight: "bold",
  marginRight: "0.25rem",
});
