import { useEffect, useState } from "react";
import { HomeWithForSale } from "./components/HomeWithForSale";

export type GB = {
  url: string;
  title: string;
  currentPrice: string;
  bids: string;
  ends: string;
  description: string;
  images: string[];
};

function App() {
  const [gbs, setGbs] = useState<GB[] | null>(null);

  useEffect(() => {
    fetch("https://fetch-ebay.nikkitaftw.workers.dev/")
      .then((rsp) => rsp.json())
      .then(setGbs);
  }, []);

  return (
    <>
      {!gbs ? (
        <div className="mx-auto text-center">
          <p className="block">Fetching ebay data</p>
          <div className="border border-[#05A4E3] w-20 h-20 mx-auto mt-8 loader"></div>
        </div>
      ) : gbs.length ? (
        <HomeWithForSale gbs={gbs} />
      ) : null}
    </>
  );
}

export default App;
