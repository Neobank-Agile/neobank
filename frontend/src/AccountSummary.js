import { useState, useEffect } from "react";
import { restFetch } from "./utils";
import { API_URL } from "./api";
import loading from "./loading.svg";
import { getToken } from "./store";
import MessageBox from "./MessageBox";

const AccountSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState("");
  const [account, setAccount] = useState({});

  useEffect(() => {
    const getAccount = async () => {
      const token = getToken();
      setIsLoading(true);
      const resp = await restFetch("GET", API_URL + `/accounts`, {
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
        if (resp.length > 0) {
          setAccount(resp[0]);
        } else {
          setMessages(["invalid account"]);
        }
      }
    };
    getAccount();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="center tc mt3 mv3">
          <img className="w3 h3 dib" src={loading} alt="loading..." />
        </div>
      ) : null}
      {messages ? <MessageBox messages={messages} /> : null}
      <div className="pa4 mw9 f3 white measure center ba b--light-blue br3 pa3 mv3 dib">
        <div className="f3 w-100 tl mb3">Account Summary</div>
        <div className="fl w-50 tl pa2 f4 b">Name</div>
        <div className="fl w-50 tl pa2 f4">
          <span>{account.username}</span>
        </div>
        <div className="fl w-50 fl tl pa2 f4 b">Account number</div>
        <div className="fl w-50 fl tl pa2 f4">
          <span>{account.id}</span>
        </div>
        <div className="fl w-50 fl tl pa2 f4 b">Email</div>
        <div className="fl w-50 fl tl pa2 f4">
          <span>{account.email}</span>
        </div>
        <div className="fl w-50 fl tl pa2 f4 b ">Phone</div>
        <div className="fl w-50 fl tl pa2 f4 ">
          <span>{account.phone}</span>
        </div>
      </div>
    </>
  );
};

export default AccountSummary;
