import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const VideoTemplate = ({ script }) => {

  const frame = useCurrentFrame();

  // Split script into scenes
  const scenes = script.split("\n").filter(Boolean);

  const sceneIndex = Math.floor(frame / 90); // change scene every 3 sec

  const text = scenes[sceneIndex] || "";

  const opacity = interpolate(frame % 90, [0, 15], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        fontSize: 64,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        textAlign: "center",
        fontWeight: "bold"
      }}
    >
      <div
        style={{
          opacity,
          maxWidth: 900,
          lineHeight: 1.4
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};