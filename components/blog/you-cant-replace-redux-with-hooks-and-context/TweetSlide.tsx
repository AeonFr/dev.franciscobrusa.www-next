import * as styles from "./styles.css";

export default function TweetSlide({ children }) {
  return (
    <div className={styles.singleColumn}>
      <blockquote className={styles.tweetColumn}>{children}</blockquote>
    </div>
  );
}
