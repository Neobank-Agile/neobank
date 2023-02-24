import { useState } from "react";
//import { useParams, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import MessageBox from "./MessageBox";
import { getCardType } from "./utils";
import trash from "./trash.svg";
import plus from "./plus.svg";

const SettingsPage = () => {
  const [messages, setMessages] = useState([]);
  const [cards, setCards] = useState([
    {
      number: "4026 5678 9012 3456",
      holder: "Christian Kuroki",
      expiration: "02-2025",
      csv: 123,
    },
    {
      number: "3780 1234 5678 9012",
      holder: "Christian Kuroki",
      expiration: "10-2028",
      csv: 456,
    },
  ]);
  const [validHolder, setValidHolder] = useState(true);
  const [validNumber, setValidNumber] = useState(true);
  const [validExpiration, setValidExpiration] = useState(true);
  const [validCSV, setValidCSV] = useState(true);
  const [addMode, setAddMode] = useState(false);

  return (
    <>
      <Menu />
      {addMode ? (
        <main className="pa4 white">
          <form className="measure center ba b--light-blue br3">
            <div className="w-100 center tc bg-blue">
              <div className="fl w-100 pa3 bg-navy f2 br3 br--top">
                Add credit card
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
                  />
                </div>
              </fieldset>
              <div>
                <MessageBox messages={messages} />
              </div>
              <div className="center tc">
                <div
                  className="link dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
                  title="Add"
                  onClick={() => setAddMode(false)}
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
        <article>
          <div className="f2 fw3 pa3 mv2 tc">
            {cards.length < 1 ? "No available cards" : "Available cards"}
            <img
              className="ml3 w2 h2 dib link dim pointer"
              src={plus}
              alt="plus"
              onClick={(ev) => setAddMode(true)}
            />{" "}
          </div>
          {cards.length > 0 ? (
            <div className="cf pa3 center">
              {cards.map((el) => (
                <div className="fl w-50 w-25-m w-20-l pa2 code ba ma2 br3">
                  <dl className="mt2 f4 white lh-copy">
                    <dt className="clip">Type</dt>
                    <dd className="ml0 truncate w-100">
                      {getCardType(el.number)}
                      <span className="fr link dim pointer">
                        <img className="w2 h2 dib" src={trash} alt="trash" />{" "}
                      </span>
                    </dd>
                    <dt className="clip">Number</dt>
                    <dd className="ml0 truncate w-100">{el.number}</dd>
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

export default SettingsPage;
