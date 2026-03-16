import { Sequence } from "remotion";
import { Scene } from "./Scene";
import Chart from "./components/chart";

export const StockVideo = ({
  hook,
  snapshot,
  news,
  takeaway,
  cta,
  stockData
}) => {

  return (
    <>

      <Sequence durationInFrames={60}>
        <Scene title="Stock Alert" text={hook} />
      </Sequence>

      <Sequence from={60} durationInFrames={60}>
        <Scene title="Stock Snapshot" text={snapshot} />
        <Chart data={stockData} />
      </Sequence>

      <Sequence from={120} durationInFrames={60}>
        <Scene title="Market News" text={news} />
      </Sequence>

      <Sequence from={180} durationInFrames={60}>
        <Scene title="Investor Takeaway" text={takeaway} />
      </Sequence>

      <Sequence from={240} durationInFrames={60}>
        <Scene title="Follow For More" text={cta} />
      </Sequence>

    </>
  );
};