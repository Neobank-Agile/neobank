import { useState, useEffect } from "react";
import { restFetch } from "./utils";
import { API_URL } from "./api";
import loading from "./loading.svg";
import edit from "./edit.svg";
import { getToken } from "./store";
import MessageBox from "./MessageBox";

const PersonalInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState("");
  const [account, setAccount] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [isModal, setModal] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [validUser, setValidUser] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [validConfPass, setValidConfPass] = useState(true);

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
          const acct = resp[0];
          setAccount(acct);
          setUsername(acct.username);
          setEmail(acct.email);
          setPhone(acct.phone);
          setPassword(acct.password);
          setConfPassword(acct.password);
        } else {
          setMessages(["invalid account"]);
        }
      }
    };
    getAccount();
  }, []);

  const postAccount = async () => {
    const token = getToken();
    setIsLoading(true);
    setMessages([]);
    const resp = await restFetch(
      "PUT",
      API_URL + `/accounts`,
      { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      JSON.stringify({
        username,
        email,
        phone,
        password,
      })
    );
    setIsLoading(false);
    if (resp.hasOwnProperty("error")) {
      // post error, display error message
      setMessages([resp.error]);
    } else {
      setMessages([]);
      setMessages(["Account successfuly updated"]);
      setModal(true);
      setEditing(false);
    }
  };

  const validateFields = () => {
    let result = true;
    let errs = [];
    const phoneExp =
      /^\+?([0-9]{2})\)?[-. ]?([0-9]{2})?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const emailExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!username || username.length < 4) {
      errs = [...errs, "Username should have a minimum of 4 characters"];
      setValidUser(false);
      result = false;
    }
    if (!phone || !phone.match(phoneExp)) {
      errs = [...errs, "Invalid phone"];
      setValidPhone(false);
      result = false;
    }
    if (!email || !email.match(emailExp)) {
      errs = [...errs, "Invalid email"];
      setValidEmail(false);
      result = false;
    }
    if (!password || password.length < 8) {
      errs = [...errs, "Password should have a minimum of 8 characters"];
      setValidPass(false);
      result = false;
    }
    if (!confPassword || confPassword !== password) {
      errs = [...errs, "Password and confirmation should match"];
      setValidConfPass(false);
      result = false;
    }
    setMessages(errs);
    return result;
  };

  return (
    <>
      {isLoading ? (
        <div className="center tc mt3 mv3">
          <img className="w3 h3 dib" src={loading} alt="loading..." />
        </div>
      ) : null}
      <div className="pa4 w-100 f3 white ba b--light-blue br3 pa3 mv3 dib">
        <div className="f3 w-100 tl mb2">
          Personal Information
          {!isEditing ? (
            <img
              className="ml3 w2 h2 dib v-btm link dim pointer"
              src={edit}
              alt="edit"
              onClick={(ev) => setEditing(true)}
            />
          ) : (
            <span className="ml2 v-top tc br3 pa2 bg-green mw2 f6">
              {" "}
              Editing
            </span>
          )}
        </div>
        <form className="measure tl">
          <div className="pa3">
            <fieldset className="ba b--transparent ph0 mh0 mw6">
              <div className="mt3">
                <label className="db fw6 lh-copy f5">Username</label>
                <input
                  className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                    validUser ? "b--light-blue" : "b--red"
                  }`}
                  readOnly={!isEditing}
                  type="text"
                  name="username"
                  onChange={(ev) => {
                    setUsername(ev.target.value);
                    setValidUser(true);
                  }}
                  value={username}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5">Email</label>
                <input
                  className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                    validEmail ? "b--light-blue" : "b--red"
                  }`}
                  type="email"
                  name="email-address"
                  readOnly={!isEditing}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    setValidEmail(true);
                  }}
                  value={email}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5">Phone</label>
                <input
                  className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                    validPhone ? "b--light-blue" : "b--red"
                  }`}
                  type="text"
                  name="phone"
                  readOnly={!isEditing}
                  onChange={(ev) => {
                    setPhone(ev.target.value);
                    setValidPhone(true);
                  }}
                  value={phone}
                />
              </div>
              <div className="mt3 mb0">
                <label className="db fw6 lh-copy f5">Password</label>
                <input
                  className={`b pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                    validPass ? "b--light-blue" : "b--red"
                  }`}
                  type="password"
                  name="password"
                  readOnly={!isEditing}
                  onChange={(ev) => {
                    setPassword(ev.target.value);
                    setValidPass(true);
                  }}
                  value={password}
                />
              </div>
              <div className="mt3 mb0">
                <label className="db fw6 lh-copy f5">Confirm Password</label>
                <input
                  className={`b pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                    validConfPass ? "b--light-blue" : "b--red"
                  }`}
                  type="password"
                  name="confPassword"
                  readOnly={!isEditing}
                  onChange={(ev) => {
                    setConfPassword(ev.target.value);
                    setValidConfPass(true);
                  }}
                  value={confPassword}
                />
              </div>
            </fieldset>
            <div className="fl w-100 mb2">
              <MessageBox messages={messages} />
            </div>
            <div className="mt3">
              {isLoading ? (
                <div>
                  <img className="w3 h3 dib" src={loading} alt="loading..." />
                </div>
              ) : null}
              {isEditing ? (
                <div className="dib pa2 tl measure center">
                  <div
                    className="link fl dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
                    title="Update"
                    onClick={() => {
                      if (validateFields()) {
                        postAccount();
                      }
                    }}
                  >
                    Update
                  </div>
                  <div
                    className="link fl dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
                    title="Cancel"
                    onClick={() => {
                      setMessages([]);
                      setUsername(account.username);
                      setEmail(account.email);
                      setPhone(account.phone);
                      setPassword(account.password);
                      setConfPassword(account.password);
                      setEditing(false);
                      setValidUser(true);
                      setValidEmail(true);
                      setValidPhone(true);
                      setValidPass(true);
                      setValidConfPass(true);
                    }}
                  >
                    Cancel
                  </div>
                </div>
              ) : null}
              {isModal ? (
                <>
                  <div
                    className="link fl dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
                    title="Ok"
                    onClick={() => {
                      setMessages([]);
                      setModal(false);
                      window.location.reload(false);
                    }}
                  >
                    Ok
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalInformation;
