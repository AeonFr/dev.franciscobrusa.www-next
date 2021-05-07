import layoutStyles from "../styles/Layout.module.css";

export default function Container(props) {
  return (
    <div className={layoutStyles["App-frame"]} {...props}>
      <div className={layoutStyles["App-content"]} children={props.children} />
    </div>
  );
}
