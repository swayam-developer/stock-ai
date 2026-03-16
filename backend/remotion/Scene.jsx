import { useCurrentFrame, interpolate } from "remotion";

export const Scene = ({ title, text }) => {

  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <div
      style={{
        flex: 1,
        background: "#020617",
        color: "#38bdf8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: 60,
        textAlign: "center",
        opacity
      }}
    >

      <h1 style={{ fontSize: 70 }}>{title}</h1>

      <p
        style={{
          fontSize: 42,
          maxWidth: 800,
          lineHeight: 1.4
        }}
      >
        {text}
      </p>

    </div>
  );
};