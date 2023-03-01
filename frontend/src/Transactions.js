import { useState, useEffect } from "react";
import { restFetch } from "./utils";
import { API_URL } from "./api";
import loading from "./loading.svg";
import { getToken } from "./store";
import MessageBox from "./MessageBox";

const Transactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState("");
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    const getTxs = async () => {
      const token = getToken();
      setIsLoading(true);
      const resp = await restFetch("GET", API_URL + `/transactions`, {
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
        setTxs(resp);
      }
    };
    getTxs();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="center tc mt3 w-100">
          <img className="w3 h3 dib" src={loading} alt="loading..." />
        </div>
      ) : null}
      {messages ? <MessageBox messages={messages} /> : null}
      <div className="pa4 f3 white measure center ba b--light-blue br3 pa3">
        {txs.length < 1 ? (
          <div>No transactions.</div>
        ) : (
          <>
            <div className="f3 tl w-100 pa0">Transaction History</div>
            <div className="pa4">
              <table className="f6 w-100 mw8 center" cellspacing="0">
                <thead>
                  <tr>
                    <th className="fw6 bb b--black-20 tl pb3 pr3 white">
                      Date
                    </th>
                    <th className="fw6 bb b--black-20 tl pb3 pr3 white">
                      Operation
                    </th>
                    <th className="fw6 bb b--black-20 tl pb3 pr3 white">
                      Amount
                    </th>
                    <th className="fw6 bb b--black-20 tl pb3 pr3 white">
                      Currency
                    </th>
                  </tr>
                </thead>
                <tbody className="lh-copy">
                  {txs.map((el) => (
                    <tr>
                      <td className="tl pv3 pr3 bb b--black-20">
                        {el.created_at}
                      </td>
                      <td className="tl pv3 pr3 bb b--black-20">{el.type}</td>
                      <td className="tl pv3 pr3 bb b--black-20">{el.amount}</td>
                      <td className="tl pv3 pr3 bb b--black-20">
                        {el.type == "deposit" || el.type == "exchange_buy"
                          ? el.destination
                          : el.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Transactions;
