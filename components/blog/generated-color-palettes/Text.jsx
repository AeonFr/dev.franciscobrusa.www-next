export const Headline = ({ tag = "h1", style, ...props }) => {
  const Tag = tag;
  return (
    <Tag
      style={{
        maxWidth: "35rem",
        fontSize: "2.5em",
        backgroundImage:
          "linear-gradient(90deg, var(--accent, #00DBDE) 0%, var(--accent-alt, #FC00FF) 100%)",
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
