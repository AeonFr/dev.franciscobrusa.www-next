import { globalStyle, style } from "@vanilla-extract/css";

export const article = style({
  "@media": {
    "(min-width: 768px)": {
      fontSize: "1.25rem",
    },
  },
});

globalStyle(
  `${article} h1,
  ${article} h2,
  ${article} h3,
  ${article} h4`,
  {
    lineHeight: 1.2,
  }
);

globalStyle(
  `${article} p,
  ${article} li`,
  {
    lineHeight: 1.675,
  }
);

globalStyle(
  `${article} img
  ${article} svg`,
  {
    maxWidth: "100%",
  }
);

globalStyle(`${article} a`, {
  fontWeight: 600,
  wordBreak: "break-word",
});

globalStyle(`${article} blockquote`, {
  margin: 0,
  paddingLeft: "2rem",
  paddingRight: "calc(2rem + 2px)",
});
