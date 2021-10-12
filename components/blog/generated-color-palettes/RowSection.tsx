import { row, column } from "./rows-and-columns.css";

export const Row = ({ tag = "div", ...props }) => {
  const Tag = tag as "div";
  return <Tag className={row} {...props} />;
};

export const Col = ({ tag = "div", ...props }) => {
  const Tag = tag as "div";
  return <Tag className={column} {...props} />;
};

export const Spacer = () => <div style={{ marginTop: "4rem" }} />;
