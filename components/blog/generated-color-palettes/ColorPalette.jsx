export const ColorPalette = ({ hue = 0, saturation = 0 }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(11, 1fr)" }}>
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((step) => (
        <div
          key={step}
          style={{
            backgroundColor: `hsl(${hue}, ${saturation}%, ${step}%)`,
            height: "100%",
          }}
        />
      ))}
    </div>
  );
};
