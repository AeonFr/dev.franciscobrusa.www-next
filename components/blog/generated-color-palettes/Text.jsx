export const Headline = ({ tag = "h1", style, ...props }) => {
  const Tag = tag;

  // This gradient:
  // "linear-gradient(90deg, var(--accent, #00DBDE) 0%, var(--accent-alt, #FC00FF) 100%)",
  // But with Luv interpolation
  // (calculated thanks to chroma-js)

  // prettier-ignore
  const colors = ["#f767bb", "#f469bc", "#f26bbd", "#ef6dbe", "#ed6ebf", "#ea70c0", "#e772c1", "#e573c2", "#e275c3", "#df77c4", "#dc78c5", "#da7ac6", "#d77bc7", "#d47cc8", "#d17ec9", "#ce7fca", "#cb81cb", "#c882cc", "#c583cd", "#c284ce", "#bf86cf", "#bc87d0", "#b888d1", "#b589d2", "#b28ad3", "#ae8bd4", "#ab8cd5", "#a78dd6", "#a48fd7", "#a090d8", "#9c91d9", "#9892da", "#9493db", "#9094dc", "#8b94dd", "#8795de", "#8296df", "#7d97e0", "#7898e2", "#7399e3", "#6e9ae4", "#689be5", "#619ce6", "#5a9ce7", "#539de8", "#4a9ee9", "#419fea", "#359feb", "#26a0ec", "#0aa1ed"]; // chroma.scale(['#f767bb', '#0aa1ed']).mode('lab').colors(50);

  return (
    <Tag
      style={{
        maxWidth: "35rem",
        fontSize: "2.5em",
        backgroundImage:
          "linear-gradient(90deg, " +
          colors
            .map((color, i) => `${color} ${i * 2}% ${(i + 1) * 2}%`)
            .join(", ") +
          ")",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        textFillColor: "transparent",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
      {...props}
    />
  );
};

export const SmallText = ({ style, ...props }) => {
  return <div style={{ fontSize: "0.8em", ...style }} {...props} />;
};

export const BigText = ({ style, ...props }) => {
  return <div style={{ fontSize: "1.4em", ...style }} {...props} />;
};
