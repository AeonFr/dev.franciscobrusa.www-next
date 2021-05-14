import layoutStyles from "../styles/Layout.module.css";

export default function Container(props) {
  const { className, ...restOfProps } = props;
  return (
    <div className={layoutStyles["App-frame"]}>
      <div
        className={layoutStyles["App-content"] + " " + (className || "")}
        {...restOfProps}
      />
    </div>
  );
}
