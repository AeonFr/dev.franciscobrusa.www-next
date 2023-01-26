import { style, globalStyle, createVar } from "@vanilla-extract/css";

export const DESKTOP_MEDIA_QUERY = "(min-width: 950px)";

const contentMaxWidth = createVar("content-max-width");
const contentMarginLeftDesktop = createVar("content-margin-left-desktop");
const columnGapDesktop = createVar("column-gap-desktop");

const mediaDesktop = ({ ...styles }) => {
  return {
    "@media": {
      [DESKTOP_MEDIA_QUERY]: styles,
    },
  };
};

export const svg = style({})

const flexChild = {
  // sensitive defaults for all flex remildrens
  minWidth: 0,
  margin: 0,
};

export const layoutRoot = style({
  vars: {
    [contentMaxWidth]: "29rem",
    [contentMarginLeftDesktop]: "max(5rem, calc(50vw - 33rem))",
    [columnGapDesktop]: "4rem",
  },
});

export const isActive = style({});

export const singleColumn = style({
  alignSelf: "flex-start",
  ...mediaDesktop({
    marginLeft: contentMarginLeftDesktop,
    marginRight: "auto",
  }),
});
export const overflowWrapper = style({
  ...mediaDesktop({
    maxHeight: "100vh",
    overflowY: "auto",
  }),
});

export const intersectionStop = style({
  maxWidth: `calc(${contentMaxWidth} + ${columnGapDesktop} - 1rem)`,
});

export const intersectionStopInline = style({
  position: "relative",
  transition: "color 0.2s",
  paddingTop: ".25rem",
  paddingBottom: ".25rem",
  ...mediaDesktop({
    "::before": {
      content: '""',
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: "3px",
      backgroundColor: "var(--comment)",
      borderRadius: "2px",
    },
    selectors: {
      [`&.${isActive}::before`]: {
        backgroundColor: "var(--accent)",
      },

      [[
        // uncomment to also dim previous lines
        //`&:has(~ .${isActive})`,
        `&.${isActive} ~ &:not(.${isActive})`,
      ].join(",")]: {
        color: "var(--comment)",
      },
    },
  }),
});

export const documentFlow = style({
  display: "flex",
  gap: "1.25rem",
  flexDirection: "column",
  transition: "color 0.5s",
  ...mediaDesktop({
    selectors: {
      [`&.${isActive}`]: {
        borderRightColor: "var(--accent)",
      },
      [[
        `&.${isActive} ~ &:not(.${isActive})`,
        // uncomment to also dim previous lines
        // `&:has(~ &.${isActive})`,
        // `&:has(~ .${isActive} .${intersectionStopInline}.${isActive})`,
      ].join(",")]: {
        color: "var(--comment)",
      },
    },
  }),
});

export const doubleColumn = style({
  ...mediaDesktop({
    marginLeft: contentMarginLeftDesktop,
    position: "relative",
  }),
});

export const leftColumn = style({
  transition: "color 0.2s",
  selectors: {
    [`${intersectionStopInline}.${isActive} ~ &:not(.${isActive})`]: {
      color: "var(--comment)",
    },
  },
});

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

export const title3 = style({
  ...columnChild,
  fontSize: "1rem",
  lineHeight: 1.2,
  maxWidth: contentMaxWidth,
  ...mediaDesktop({ paddingLeft: 0 }),
});

export const details = style({
  ...columnChild,
  vars: {
    [contentMaxWidth]: 'calc(29rem - 2rem)'
  },
});

globalStyle(`.${details} summary`, {
  marginBottom: "1rem",
  cursor: 'pointer',
});

export const pre = style({
  ...columnChild,
  overflowX: "auto",
  maxWidth: "100vw",
  fontSize: "14px",
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
  ...mediaDesktop({
    borderRadius: "8px",
  }),
  selectors: {
    [`.${details} &`]: {
      maxWidth: contentMaxWidth,
    }
  },
});

export const ol = style({
  ...columnChild,
  maxWidth: contentMaxWidth,
  paddingLeft: "2rem",
  lineHeight: 1.5,
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

export const interactiveColumn = style({
  ...columnChild,
  maxWidth: "550px",
  lineHeight: 1.6,
  fontSize: "1.2rem",
});

export const svgContainer = style({});

export const nonHighlightedCodeLine = style({
  opacity: 0.55,
  transition: "opacity .2s",
});

export const highlightedCodeLine = style({
  fontWeight: "600",
});
