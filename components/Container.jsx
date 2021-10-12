import Block from "./Block";
import * as layoutStyles from "../styles/layout.css";

export default function Container(props) {
  const { className, ...restOfProps } = props;
  return (
    <Block>
      <div
        className={layoutStyles.content + " " + (className || "")}
        {...restOfProps}
      />
    </Block>
  );
}
