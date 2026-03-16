import { Composition } from "remotion";
import { StockVideo } from "./StockVideo";

export const RemotionRoot = () => {

  return (
    <Composition
      id="StockVideo"
      component={StockVideo}
      durationInFrames={300}  // was 600
      fps={30}
      width={720}   // reduced resolution
      height={1280}
    />
  );

};