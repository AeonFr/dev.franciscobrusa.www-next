import layoutStyles from "../styles/Layout.module.css";

export default function Container(props) {
  return (
    <div className={layoutStyles["App-frame"]}>
      <div className={layoutStyles["App-content"]} {...props} />
    </div>
  );
}
