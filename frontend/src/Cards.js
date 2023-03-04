import { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import { getCardType, restFetch } from "./utils";
import { API_URL } from "./api";
import loading from "./loading.svg";
import trash from "./trash.svg";
import plus from "./plus.svg";
import { getToken } from "./store";

const Cards = () => {
  const [messages, setMessages] = useState([]);
  const [cards, setCards] = useState([]);
  const [validHolder, setValidHolder] = useState(true);
  const [validNumber, setValidNumber] = useState(true);
  const [validExpiration, setValidExpiration] = useState(true);
  const [validCSV, setValidCSV] = useState(true);
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [csv, setCSV] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        console.log(JSON.stringify(resp));
        setCards(resp);
      }
    };
    getCards();
  }, []);

  const validateFields = () => {
    let result = true;
    let errs = [];
    const expirationExp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})$/;
    const csvExp = /^([0-9]{3})$/;

    if (!holder || holder.length < 4) {
      errs = [...errs, "Holder should have a minimum of 4 characters"];
      setValidHolder(false);
      result = false;
    }
    const cardType = getCardType(number);
    if (!cardType) {
      errs = [...errs, "Invalid card number"];
      setValidNumber(false);
      result = false;
    }
    if (!expiration || !expiration.match(expirationExp)) {
      errs = [...errs, "Invalid expiration, should be like 02-2023"];
      setValidExpiration(false);
      result = false;
    }
    if (!csv || !csv.match(csvExp)) {
      errs = [...errs, "Invalid CSV should be a 3 digit number like 123"];
      setValidCSV(false);
      result = false;
    }
    setMessages(errs);
    return result;
  };

  const removeCard = async (ix) => {
    const token = getToken();
    const id = cards[ix].id;
    setIsLoading(true);
    const resp = await restFetch("DELETE", API_URL + `/cards?id=${id}`, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    setIsLoading(false);
    if (resp.hasOwnProperty("error")) {
      // post error, display error message
      setMessages([resp.error]);
    } else {
      // succesful delete
      setMessages([]);
      setCards([...cards.slice(0, ix), ...cards.slice(ix + 1)]);
    }
  };

  const addCard = async () => {
    const token = getToken();
    const cardType = getCardType(number);
    const newCard = {
      card_type: cardType,
      card_number: number,
      holder,
      expiration,
      csv,
    };
    setIsLoading(true);
    const resp = await restFetch(
      "POST",
      API_URL + `/cards`,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      JSON.stringify(newCard)
    );
    setIsLoading(false);
    console.log(resp);
    if (resp.hasOwnProperty("error")) {
      // post error, display error message
      setMessages([resp.error]);
    } else {
      // succesful createk
      setMessages([]);
      setCards([...cards, newCard]);
      setAddMode(false);
    }
  };

  //<main className="pa4 white">
  return (
    <>
      {isLoading ? (
        <div className="center tc mt3">
          <img className="w3 h3 dib" src={loading} alt="loading..." />
        </div>
      ) : null}
      {addMode ? (
        <main className="pa4 f3 white w-100 ba b--light-blue br3 pa3 mv3 dib">
          <form className="measure tl">
            <div className="w-100 center tc bg-blue">
              <div className="fl tl w-100 pa3 bg-navy f3 br3 br--top">
                Add Credit Card
              </div>
            </div>
            <div className="pa3">
              <fieldset className="ba b--transparent ph0 mh0 mw6">
                <div className="mt3">
                  <label className="db fw6 lh-copy f5">Card Number</label>
                  <input
                    className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                      validNumber ? "b--light-blue" : "b--red"
                    }`}
                    type="text"
                    name="number"
                    onChange={(ev) => {
                      setNumber(ev.target.value);
                      setValidNumber(true);
                    }}
                    value={number}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f5">Holder's Name</label>
                  <input
                    className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                      validHolder ? "b--light-blue" : "b--red"
                    }`}
                    type="text"
                    name="holder"
                    onChange={(ev) => {
                      setHolder(ev.target.value);
                      setValidHolder(true);
                    }}
                    value={holder}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f5">Expiration</label>
                  <input
                    className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                      validExpiration ? "b--light-blue" : "b--red"
                    }`}
                    type="text"
                    name="expiration"
                    onChange={(ev) => {
                      setExpiration(ev.target.value);
                      setValidExpiration(true);
                    }}
                    value={expiration}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f5">CSV</label>
                  <input
                    className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                      validCSV ? "b--light-blue" : "b--red"
                    }`}
                    type="password"
                    name="csv"
                    onChange={(ev) => {
                      setCSV(ev.target.value);
                      setValidCSV(true);
                    }}
                    value={csv}
                  />
                </div>
              </fieldset>
              <div className="pa2 mb2">
                <MessageBox messages={messages} />
              </div>
              <div className="center tl">
                <div
                  className="link dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
                  title="Add"
                  onClick={() => {
                    if (validateFields()) {
                      addCard();
                    }
                  }}
                >
                  Add
                </div>
                <div
                  className="link dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
                  title="Cancel"
                  onClick={() => setAddMode(false)}
                >
                  Cancel
                </div>
              </div>
            </div>
          </form>
        </main>
      ) : (
        <article className="pa4 f3 white w-100 ba b--light-blue br3 pa3 mv3 dib">
          <div className="f3 fw3 pa3 mv2 tl white">
            {cards.length < 1 ? "No cards available" : "Cards"}
            <img
              className="ml3 w2 h2 dib v-btm link dim pointer"
              src={plus}
              alt="plus"
              onClick={(ev) => setAddMode(true)}
            />{" "}
          </div>
          {cards.length > 0 ? (
            <div className="cf pa3 center">
              {cards.map((el, ix) => (
                <div
                  key={`${el.id}`}
                  className="fl w-50 w-25-m w-20-l pa2 code ba ma2 br3"
                >
                  <dl className="mt2 f5 white lh-copy">
                    <dt className="clip">Type</dt>
                    <dd className="ml0 truncate w-100">
                      {el.card_type}
                      <span
                        className="fr link dim pointer"
                        onClick={async () => await removeCard(ix)}
                      >
                        <img className="w2 h2 dib" src={trash} alt="trash" />{" "}
                      </span>
                    </dd>
                    <dt className="clip">Number</dt>
                    <dd className="ml0 truncate w-100">{el.card_number}</dd>
                    <dt className="clip">Name</dt>
                    <dd className="ml0 truncate w-100">{el.holder}</dd>
                    <dt className="clip">Exp</dt>
                    <dd className="ml0 truncate w-100">{el.expiration}</dd>
                  </dl>
                </div>
              ))}
            </div>
          ) : null}
        </article>
      )}
    </>
  );
};

export default Cards;
