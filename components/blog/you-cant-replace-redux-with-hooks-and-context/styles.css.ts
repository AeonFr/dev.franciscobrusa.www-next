import { globalStyle, style } from "@vanilla-extract/css";

const mediaDesktop = ({ ...styles }) => {
  return {
    "@media": {
      "(min-width: 750px)": styles,
    },
  };
};

const flexChild = {
  // sensitive defaults for all flex childrens
  minWidth: 0,
  margin: 0,
};

export const documentFlow = style({
  display: "flex",
  gap: "1.25rem",
  flexDirection: "column",
});

export const singleColumn = style({
  alignSelf: "flex-start",
  ...mediaDesktop({
    marginLeft: "10ch",
    marginRight: "auto",
  }),
});

export const doubleColumn = style({
  ...mediaDesktop({
    marginLeft: "10ch",
    position: "relative",
  }),
});

export const rightColumn = style({});

export const leftColumn = style({
  ...mediaDesktop({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: "calc(36ch + 4ch)",
  }),
});

export const leftColumnStickyWrapper = style({
  ...mediaDesktop({
    position: "sticky",
    top: "50%",
    bottom: "-50%",
    transform: "translateY(-50%)",
    "::after": {
      content: '""',
      position: "absolute",
      top: "calc(50% - 20px)",
      left: "-20px",
      border: "10px solid transparent",
      borderRight: "10px solid var(--code-bg)",
    },
  }),
});

export const intersectionStop = style({
  borderTop: "1px solid var(--code-bg)",
  width: "36ch",
});

const columnChild = {
  ...flexChild,
  paddingLeft: "2ch",
  paddingRight: "2ch",
};

export const paragraph = style({
  ...columnChild,
  fontSize: "1rem",
  lineHeight: 1.5,
  maxWidth: "36ch",
});

export const title1 = style({
  ...columnChild,
  fontSize: "1.2rem",
  lineHeight: 1.2,
  maxWidth: "40ch",
});

export const pre = style({
  ...columnChild,
  overflowX: "auto",
  maxWidth: "100%",
});

export const lead = style({
  ...columnChild,
  fontSize: "1.25rem",
  lineHeight: 1.25,
  maxWidth: "40ch",
});
