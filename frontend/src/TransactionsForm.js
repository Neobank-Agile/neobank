import { useState, useEffect } from "react";
import { restFetch } from "./utils";
import loading from "./loading.svg";
import { API_URL } from "./api";
import MessageBox from "./MessageBox";
import { getToken } from "./store";

const TransactionsForm = () => {
  const [tab, setTab] = useState("deposit");
  const [messages, setMessages] = useState([]);
  const [card, setCard] = useState();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");
  const [destination, setDestination] = useState("");
  const [currency, setCurrency] = useState();
  const [cards, setCards] = useState([]);
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState();
  const [amt, setAmt] = useState();
  const [modal, setModal] = useState(false);
  const [exchangeAmount, setExchangeAmount] = useState(123);
  const [validAmount, setValidAmount] = useState(true);
  const [validAmt, setValidAmt] = useState(true);
  const [validDestination, setValidDestination] = useState(true);
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
    const getCards = async () => {
      const token = getToken();
      setIsLoading(true);
      const resp = await restFetch("GET", API_URL + `/cards`, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      setIsLoading(false);
      if (resp.hasOwnProperty("error")) {
        // post error, display error message
        setMessages([resp.error]);
      } else {
        // succesful fetch
        setMessages([]);
        setCards(resp);
        if (resp.length > 0) {
          setCard(resp[0]);
        }
      }
    };
    setCurrency("USD");
    getCards();
  }, []);

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

  const validateFields = () => {
    let result = true;
    let errs = [];

    if (tab === "exchange") {
      if (!amt || amt <= 0) {
        errs = ["Amount should be a positive number"];
        setValidAmt(false);
        result = false;
      }
    } else {
      if (!amount || amount <= 0) {
        errs = ["Amount should be a positive number"];
        setValidAmount(false);
        result = false;
      }
    }
    if (tab === "transfer" && (!destination || destination.length < 8)) {
      errs = [
        ...errs,
        "Destination should be an email or bank account number (more than 8 chars)",
      ];
      setValidDestination(false);
      result = false;
    }
    setMessages(errs);
    return result;
  };

  const postTx = async () => {
    setIsLoading(true);
    setMessages([]);
    const token = getToken();
    let payload = { type: tab, status: "OK", amount: amount };
    console.log(tab);
    console.log(card);
    console.log(currency);
    switch (tab) {
      case "deposit":
        payload.source = card;
        payload.destination = currency;
        break;
      case "withdraw":
        payload.source = currency;
        payload.destination = card;
        break;
      case "transfer":
        payload.source = currency;
        payload.destination = destination;
        break;
      default:
        return;
    }

    const resp = await restFetch(
      "POST",
      API_URL + `/transactions`,
      { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      JSON.stringify(payload)
    );
    setIsLoading(false);
    if (resp.hasOwnProperty("error")) {
      // post error, display error message
      setMessages([resp.error]);
    } else {
      // succesful post
      setMessages(["Transaction successfuly created"]);
      setModal(true);
    }
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
      <div className="w-100 center tc bg-blue dib white">
        <div
          className={`fl w-25 pa3 ${
            tab === "deposit" ? "bg-blue" : "bg-navy"
          } f3 br3 br--left br--top ba pointer`}
          onClick={(ev) => {
            setTab("deposit");
            setMessages([]);
            setAmount(0);
          }}
        >
          Deposit
        </div>
        <div
          className={`fl w-25 pa3 ${
            tab === "withdraw" ? "bg-blue" : "bg-navy"
          } f3 ba pointer`}
          onClick={(ev) => {
            setTab("withdraw");
            setMessages([]);
            setAmount(0);
          }}
        >
          Withdraw
        </div>
        <div
          className={`fl w-25 pa3 ${
            tab === "transfer" ? "bg-blue" : "bg-navy"
          } f3 ba pointer`}
          onClick={(ev) => {
            setTab("transfer");
            setMessages([]);
            setAmount(0);
          }}
        >
          Transfer
        </div>
        <div
          className={`fl w-25 pa3 ${
            tab === "exchange" ? "bg-blue" : "bg-navy"
          }  f3 br3 br--right br--top ba pointer`}
          onClick={(ev) => {
            setTab("exchange");
            setMessages([]);
            setAmt(0);
          }}
        >
          Exchange
        </div>
      </div>
      {tab !== "exchange" ? (
        <form className="f3 white measure center bl br bb b--blue w-100 dib pa4">
          <div className="fl w-70 pa2">
            <div className="white tl pv2">
              <label className="db tl fw6 lh-copy f5">Amount</label>
              <input
                className={`mt2 pa2 f5 tl input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-80 ${
                  validAmount ? "b--light-blue" : "b--red"
                }`}
                type="number"
                pattern="[0-9]*"
                inputMode={"numeric"}
                name="amount"
                onChange={(ev) => {
                  setMessages([]);
                  setValidAmount(true);
                  setAmount(ev.target.value);
                }}
                value={amount}
              />
            </div>
          </div>
          <div className="fl w-30 pa2">
            <div className="white tc pv2 truncate no-wrap">
              <label className="db tl fw6 lh-copy f5">Currency</label>
              <select
                className="w-100 br2 mt2 h2 db f6 bg-blue white"
                name="currency"
                onChange={(ev) => setCurrency(ev.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
          </div>
          <div className="fl w-100 pa2">
            {tab !== "transfer" ? (
              <div className="white tc pv0 truncate no-wrap">
                <label className="db tl fw6 lh-copy f5">Credit Card</label>
                <select
                  className="w-100 br2 mt2 h2 db f6 bg-blue white"
                  name="creditcard"
                  onChange={(ev) => setCard(ev.target.value)}
                >
                  {cards.map((el, ix) => (
                    <option key={ix} value="USD">
                      {el.card_type} {el.card_number}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="white tc pv0 truncate no-wrap">
                <label className="db tl fw6 lh-copy f5">Destination</label>
                <input
                  className={`mt2 fl pa2 f5 tl input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-80 ${
                    validDestination ? "b--light-blue" : "b--red"
                  }`}
                  type="text"
                  name="destination"
                  onChange={(ev) => {
                    setMessages([]);
                    setValidDestination(true);
                    setDestination(ev.target.value);
                  }}
                  value={destination}
                />
              </div>
            )}
          </div>
          <div className="fl w-100 pa2 mt3">
            <div className="f5 mt2">
              {messages ? <MessageBox messages={messages} /> : null}
            </div>
            <div
              className="link ttu dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
              title="post"
              onClick={() => {
                if (modal) {
                  setModal(false);
                  setMessages([]);
                  window.location.reload(false);
                } else {
                  if (validateFields()) {
                    postTx();
                  }
                }
              }}
            >
              {modal ? "Ok" : tab}
            </div>
          </div>
        </form>
      ) : (
        <form className="f3 white measure center bl br bb b--blue w-100 dib pa4">
          <div className="fl w-30 pa2">
            <div className="white tc pv2 truncate no-wrap">
              <label className="db tl fw6 lh-copy f5">From</label>
              <select
                className="w-100 br2 mt2 h2 db f6 bg-blue white"
                name="from"
                onChange={(ev) => {
                  setFrom(ev.target.value);
                }}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
          </div>
          <div className="fl w-70 pa2">
            <div className="white tl pv2">
              <label className="db tl fw6 lh-copy f5">Amount</label>
              <input
                className={`mt2 pa2 f5 wl input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-80 ${
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
          </div>
          <div className="fl w-30 pa2">
            <div className="white tc pv2 truncate no-wrap">
              <label className="db tl fw6 lh-copy f5">To</label>
              <select
                className="w-100 br2 mt2 h2 db f6 bg-blue white"
                name="to"
                onChange={(ev) => {
                  setTo(ev.target.value);
                }}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
          </div>
          <div className="fl w-70 pa2">
            <div className="white tl pv2">
              <label className="db tl fw6 lh-copy f5">Exchange amount</label>
              <input
                className="mt2 pa2 f5 tl input-reset ba br3 bg-transparent white w-80 b--light-blue"
                type="exchangeAmount"
                name="exchangeAmount"
                value={exchangeAmount}
              />
            </div>
          </div>
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
              {modal ? "Ok" : tab}
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default TransactionsForm;
