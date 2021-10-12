import * as layoutStyles from "../styles/layout.css";

export default function Block(props) {
  return (
    <div
      {...props}
      className={
        layoutStyles.block + (props.className ? " " + props.className : "")
      }
    />
  );
}
