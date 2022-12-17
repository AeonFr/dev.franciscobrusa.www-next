import { style, createVar } from "@vanilla-extract/css";

export const DESKTOP_MEDIA_QUERY = "(min-width: 750px)";

const contentMaxWidth = createVar("36rem");
const contentMarginLeftDesktop = createVar("10rem");
const columnGapDesktop = createVar("4rem");

const mediaDesktop = ({ ...styles }) => {
  return {
    "@media": {
      [DESKTOP_MEDIA_QUERY]: styles,
    },
  };
};

const flexChild = {
  // sensitive defaults for all flex remildrens
  minWidth: 0,
  margin: 0,
};

export const layoutRoot = style({
  vars: {
    [contentMaxWidth]: "29rem",
    [contentMarginLeftDesktop]: "5rem",
    [columnGapDesktop]: "4rem",
  },
});

export const documentFlow = style({
  display: "flex",
  gap: "1.25rem",
  flexDirection: "column",
});

export const singleColumn = style({
  alignSelf: "flex-start",
  ...mediaDesktop({
    marginLeft: contentMarginLeftDesktop,
    marginRight: "auto",
  }),
});

export const doubleColumn = style({
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
  maxWidth: `calc(${contentMaxWidth} + ${columnGapDesktop} - 1rem)`,
});

export const intersectionStopInline = style({
  position: "relative",
  "::before": {
    content: '""',
    borderRight: "2px solid var(--code-bg)",
    borderBottom: "2px solid transparent",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
});

const columnChild = {
  ...flexChild,
  paddingLeft: "1rem",
  paddingRight: "1rem",
};

export const paragraph = style({
  ...columnChild,
  fontSize: "1rem",
  lineHeight: 1.55,
  maxWidth: contentMaxWidth,
});

export const title1 = style({
  ...columnChild,
  fontSize: "1.5rem",
  lineHeight: 1.2,
  maxWidth: contentMaxWidth,
  marginTop: "4rem",
  marginBottom: "2rem",
  ...mediaDesktop({
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: "2rem",
  }),
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
  fontSize: "1.2rem",
  lineHeight: 1.4,
  maxWidth: contentMaxWidth,
});

export const hr = style({
  border: 0,
  height: 2,
  backgroundColor: "var(--code-bg)",
  width: "100%",
});

export const tweetColumn = style({
  ...columnChild,
  maxWidth: "550px",
  lineHeight: 1.6,
  fontSize: "1.2rem",
});

export const nonHighlightedCodeLine = style({
  opacity: 0.55,
  transition: "opacity .2s",
});

export const highlightedCodeLine = style({
  fontWeight: "600",
});
