import { useState, useEffect } from "react";
import { restFetch } from "./utils";
import { API_URL } from "./api";
import loading from "./loading.svg";
import { getToken } from "./store";
import MessageBox from "./MessageBox";

const Balances = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState("");
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const getBalances = async () => {
      const token = getToken();
      setIsLoading(true);
      const resp = await restFetch("GET", API_URL + `/balances`, {
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
        setBalances(resp);
      }
    };
    getBalances();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="center tc mt3">
          <img className="w3 h3 dib" src={loading} alt="loading..." />
        </div>
      ) : null}
      {messages ? <MessageBox messages={messages} /> : null}
      <div className="pa4 f3 white measure center ba b--light-blue br3 pa3">
        {balances.length < 1 ? (
          <div>No balances. Make a deposit</div>
        ) : (
          <div className="cf tl">
            <div className="f3 fl w-100">Balances</div>
            {balances.map((el, ix) => (
              <dl
                key={ix}
                className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l ba pa3 br3"
              >
                <dd className="f4 fw4 ml0">{el.currency}</dd>
                <dd className="f3 fw6 ml0">{el.balance}</dd>
              </dl>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Balances;
