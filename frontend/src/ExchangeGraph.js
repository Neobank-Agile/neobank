import { useState } from "react";
import { GRAFANA_URL } from "./api";

const ExchangeGraph = (props) => {
  const validPairs = {
    "BTC-USD": "roEqGf14k",
    "USD-EUR": "EXjUMBJVz",
    "EUR-USD": "_CrXGBJVz",
    "USD-BTC": "t9Ui7f14z",
  };
  const epochs = {
    "1m": "1673740800000",
    "1y": "1644883200000",
    "5y": "1518825600000",
  };
  const [epoch ,setEpoch] = useState("5y");
  const pair = props.pair || "USD-EUR";

  return (
    <>
    {
    ( pair in validPairs )?
      <>
      <iframe src={`${GRAFANA_URL}/d-solo/${validPairs[pair]}/${pair}?orgId=1&from=${epochs[epoch]}&to=1676419200000&panelId=2`} className="w-60-ns w-80 vh-25" frameborder="0"/> 
      <div className="ph3">
  <span className={`f6 pointer dim br3 ph3 pv2 mb2 dib white ${(epoch==="1m")?"bg-dark-gray":"bg-black"}`} onClick={ ()=> setEpoch("1m")}>1m</span>
  <span className={`f6 pointer dim br3 ph3 pv2 mb2 dib white ${(epoch==="1y")?"bg-dark-gray":"bg-black"}`} onClick={ ()=> setEpoch("1y")}>1y</span>
  <span className={`f6 pointer dim br3 ph3 pv2 mb2 dib white ${(epoch==="5y")?"bg-dark-gray":"bg-black"}`} onClick={ ()=> setEpoch("5y")}>5y</span>
</div>
      </> : null
    }
    </>
  );
};

export default ExchangeGraph;
