import { useState, useEffect } from "react";
import { restFetch } from "./utils";
import loading from "./loading.svg";
import swapIcon from "./swap.svg";
import { API_URL } from "./api";
import MessageBox from "./MessageBox";
import { getToken } from "./store";

const ExchangeForm = (props) => {
  const [messages, setMessages] = useState([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [currency, setCurrency] = useState();
  const [rates, setRates] = useState({});
  const [amt, setAmt] = useState(100);
  const [modal, setModal] = useState(false);
  const [exchangeAmount, setExchangeAmount] = useState(123);
  const [validAmount, setValidAmount] = useState(true);
  const [validAmt, setValidAmt] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (from === to) {
      setExchangeAmount(amt);
    } else {
      const rate = rates[from + to];
      if (rate) {
        setExchangeAmount(amt * rate);
      }
    }
  }, [from, to, amt, rates]);

  useEffect(() => {
    const getRates = async () => {
      setIsLoading(true);
      const resp = await restFetch("GET", API_URL + `/rates`, {
        "Content-Type": "application/json",
      });
      setIsLoading(false);
      if (resp.hasOwnProperty("error")) {
        // post error, display error message
        setMessages([resp.error]);
      } else {
        // succesful fetch
        setMessages([]);
        let rates = {};
        for (let i = 0; i < resp.length; i++) {
          rates[resp[i].curr_from + resp[i].curr_to] = resp[i].rate;
        }
        setRates(rates);
      }
    };
    setCurrency("USD");
    getRates();
  }, []);

  const swap = () => {
    const fr = from;
    setFrom(to);
    setTo(fr);
    if (props.setPair) {
      props.setPair(fr+"-"+to);
    }
  };

  const validateFields = () => {
    let result = true;
    let errs = [];

    if (!amt || amt <= 0) {
      errs = ["Amount should be a positive number"];
      setValidAmt(false);
      result = false;
    }

    setMessages(errs);
    return result;
  };

  const postExchangeTx = async () => {
    setIsLoading(true);
    setMessages([]);
    const token = getToken();
    let payloadSell = {
      type: "exchange_sell",
      status: "OK",
      amount: amt,
      source: from,
      destination: to,
    };
    let payloadBuy = {
      type: "exchange_buy",
      status: "OK",
      amount: exchangeAmount,
      source: from,
      destination: to,
    };

    const respSell = await restFetch(
      "POST",
      API_URL + `/transactions`,
      { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      JSON.stringify(payloadSell)
    );
    setIsLoading(false);
    if (respSell.hasOwnProperty("error")) {
      // post error, display error message
      setMessages([respSell.error]);
    } else {
      setIsLoading(true);
      const respBuy = await restFetch(
        "POST",
        API_URL + `/transactions`,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(payloadBuy)
      );
      setIsLoading(false);
      if (respBuy.hasOwnProperty("error")) {
        // post error, display error message
        setMessages([respBuy.error]);
      } else {
        // succesful post
        setMessages(["Transaction successfuly created"]);
        setModal(true);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="center tc mt3">
          <img className="w3 h3 dib" src={loading} alt="loading..." />
        </div>
      ) : null}
      <div className="w-100 center tc bg-navy dib white pa3">
        <form className="f3 white measure center ba br3 b--blue w-100 dib pa4">
          <div className="fl w-third">
            <div className="white tl pv2">
              <input
                className={`mt2 pa2 f3 wl input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                  validAmt ? "b--light-blue" : "b--red"
                }`}
                type="number"
                name="amount"
                pattern="[0-9]*"
                inputMode={"numeric"}
                onChange={(ev) => {
                  setMessages([]);
                  setValidAmt(true);
                  setAmt(ev.target.value);
                }}
                value={amt}
              />
            </div>
            <div className="white tc pv2 truncate no-wrap">
              <select
                className="w-100 br2 mt2 h2 db f3 bg-blue white"
                name="from"
                onChange={(ev) => {
                  setFrom(ev.target.value);
                  if (props.setPair) {
                    props.setPair(ev.target.value+"-"+to);
                  }
                }}
                value={from}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
          </div>
          <div className="fl w-third">
            <div className="f3 fw3 pa3 mv2 tc white">
              <img
                className="ml3 w2 h2  dib v-btm link dim pointer"
                src={swapIcon}
                alt="swap"
                onClick={(ev) => swap()}
              />{" "}
            </div>
          </div>
          <div className="fl w-third">
            <div className="white tl pv2">
              <input
                className="mt2 pa2 f3 tl input-reset ba br3 bg-transparent white w-100 b--light-blue"
                type="exchangeAmount"
                name="exchangeAmount"
                value={exchangeAmount}
                readOnly
              />
            </div>
            <div className="white tc pv2 truncate no-wrap">
              <select
                className="w-100 br2 mt2 h2 db f3 bg-blue white"
                name="to"
                onChange={(ev) => {
                  setTo(ev.target.value);
                  if (props.setPair) {
                    props.setPair(from+"-"+ev.target.value);
                  }
                }}
                value={to}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
          </div>
          {props.postEnabled ? (
            <div className="fl w-100 pa2 mt3">
              <div className="f5 mt2">
                {messages ? <MessageBox messages={messages} /> : null}
              </div>
              <div
                className="link ttu dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
                title="post exchange tx"
                onClick={() => {
                  if (modal) {
                    setModal(false);
                    setMessages([]);
                    window.location.reload(false);
                  } else {
                    if (validateFields()) {
                      postExchangeTx();
                    }
                  }
                }}
              >
                {modal ? "Ok" : "Exchange"}
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default ExchangeForm;
