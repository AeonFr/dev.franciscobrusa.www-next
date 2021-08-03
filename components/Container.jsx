import * as layoutStyles from "../styles/layout.css";

export default function Container(props) {
  const { className, ...restOfProps } = props;
  return (
    <div className={layoutStyles.block}>
      <div
        className={layoutStyles.content + " " + (className || "")}
        {...restOfProps}
      />
    </div>
  );
}
