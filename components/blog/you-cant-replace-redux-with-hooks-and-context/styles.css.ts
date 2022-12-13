import { style, createVar } from "@vanilla-extract/css";

export const DESKTOP_MEDIA_QUERY = "(min-width: 750px)";

const contentMaxWidth = createVar("36ch");
const contentMarginLeftDesktop = createVar("10ch");
const columnGapDesktop = createVar("4ch");

const mediaDesktop = ({ ...styles }) => {
  return {
    "@media": {
      [DESKTOP_MEDIA_QUERY]: styles,
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
  vars: {
    [contentMaxWidth]: "36ch",
    [contentMarginLeftDesktop]: "10ch",
  },
  alignSelf: "flex-start",
  ...mediaDesktop({
    marginLeft: contentMarginLeftDesktop,
    marginRight: "auto",
  }),
});

export const doubleColumn = style({
  vars: {
    [contentMaxWidth]: "36ch",
    [contentMarginLeftDesktop]: "10ch",
    [columnGapDesktop]: "4ch",
  },
  ...mediaDesktop({
    marginLeft: contentMarginLeftDesktop,
    position: "relative",
  }),
});

export const leftColumn = style({});

export const rightColumn = style({
  ...mediaDesktop({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: "-50%",
    left: `calc(${contentMaxWidth} + ${columnGapDesktop})`,
  }),
});

export const rightColumnStickyWrapper = style({
  ...mediaDesktop({
    position: "sticky",
    top: "50%",
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

export const overflowWrapper = style({
  ...mediaDesktop({
    maxHeight: "100vh",
    overflowY: "auto",
  }),
});

export const intersectionStop = style({
  borderRight: "1px solid var(--code-bg)",
  maxWidth: `calc(${contentMaxWidth} + ${columnGapDesktop} - 1ch)`,
});

export const intersectionStopInline = style({
  position: "relative",
  "::before": {
    content: '""',
    borderRight: "2px solid var(--code-bg)",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
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
  maxWidth: contentMaxWidth,
});

export const title1 = style({
  ...columnChild,
  fontSize: "1.3rem",
  lineHeight: 1.2,
  maxWidth: contentMaxWidth,
  ...mediaDesktop({ paddingLeft: 0 }),
});

export const title2 = style({
  ...columnChild,
  fontSize: "1.2rem",
  lineHeight: 1.2,
  maxWidth: contentMaxWidth,
  ...mediaDesktop({ paddingLeft: 0 }),
});

export const pre = style({
  ...columnChild,
  overflowX: "auto",
  maxWidth: "100vw",
});

export const lead = style({
  ...columnChild,
  fontSize: "1.25rem",
  lineHeight: 1.25,
  maxWidth: contentMaxWidth,
});

export const tweetColumn = style({
  ...columnChild,
  maxWidth: "550px",
});

export const highlightedCodeLine = style({
  fontWeight: "bold",
  backgroundColor: "var(--bg)",
  backgroundImage:
    "linear-gradient(to right, var(--code-bg), var(--bg) 10%, var(--code-bg))",
  transition: "background .5s",
  marginLeft: "-1em",
  paddingLeft: "1em",
});
