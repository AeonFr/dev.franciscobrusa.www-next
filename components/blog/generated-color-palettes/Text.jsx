import { bigText, headline, smallText } from "./text.css";

export const Headline = ({ tag = "h1", ...props }) => {
  const Tag = tag;

  return <Tag className={headline} {...props} />;
};

export const SmallText = (props) => {
  return <div className={smallText} {...props} />;
};

export const BigText = (props) => {
  return <div className={bigText} {...props} />;
};
