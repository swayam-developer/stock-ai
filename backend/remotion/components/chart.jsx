import { useCurrentFrame } from "remotion";

export default function Chart({ data }) {

  const frame = useCurrentFrame();

  const progress = frame / 60;

  return (
    <svg width="600" height="300">

      {data.map((point, i) => {

        const x = i * 120 + 50;
        const y = 300 - point.price;

        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={6}
            fill="#22c55e"
            opacity={progress}
          />
        );

      })}

    </svg>
  );
}