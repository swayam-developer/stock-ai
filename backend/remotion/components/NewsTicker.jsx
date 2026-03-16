import { useCurrentFrame } from "remotion";

export default function NewsTicker({ text }) {

  const frame = useCurrentFrame();

  return (

    <div
      style={{
        position:"absolute",
        bottom:80,
        fontSize:40,
        color:"#facc15",
        whiteSpace:"nowrap",
        transform:`translateX(${100 - frame}px)`
      }}
    >
      📰 {text}
    </div>

  );

}