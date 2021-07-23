export const Row = ({ tag = "div", style, ...props }) => {
  const Tag = tag as "div";
  return (
    <Tag
      style={{ display: "flex", gap: "1em", flexWrap: "wrap", ...style }}
      {...props}
    />
  );
};

export const Col = ({ tag = "div", style, ...props }) => {
  const Tag = tag as "div";
  return <Tag style={{ flex: 1, ...style }} {...props} />;
};

export const Spacer = () => <div style={{ marginTop: "4rem" }} />;
