import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { restFetch } from "./utils";
import { storeToken } from "./store";
import loading from "./loading.svg";
import { API_URL } from "./api";
import Menu from "./Menu";

const LoginPage = () => {
  let { action } = useParams();
  const [tab, setTab] = useState(action);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [validUser, setValidUser] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateFields = () => {
    const phoneExp =
      /^\+?([0-9]{2})\)?[-. ]?([0-9]{2})?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!password || password.length < 8) {
      setErrors([...errors, "password should have a minimum of 8 characters"]);
      setValidPass(false);
    }
    if (!username || username.length < 4) {
      setErrors([...errors, "username should have a minimum of 4 characters"]);
      setValidUser(false);
    }
    if (!phone || !phone.match(phoneExp)) {
      setErrors([...errors, "invalid phone"]);
      setValidPhone(false);
    }
    if (!email || !email.match(emailExp)) {
      setErrors([...errors, "invalid email"]);
      setValidEmail(false);
    }
  };
  const postAccount = async () => {
    setIsLoading(true);
    setErrors([]);
    const respPost = await restFetch(
      "POST",
      API_URL + `/accounts`,
      { "Content-Type": "application/json" },
      JSON.stringify({
        username,
        email,
        phone,
        password,
        second_factor: "email",
        status: "not verified",
      })
    );
    console.log(respPost);
    setIsLoading(false);
  };

  return (
    <>
      <Menu />
      {tab === "login" ? (
        <main className="pa4 white">
          <form className="measure center ba b--light-blue br3">
            <div className="w-100 center tc bg-blue">
              <div className="fl w-50 pa3 bg-navy f3 br3 br--left br--top">
                Login
              </div>
              <div
                className="link fl w-50 pa3 bg-blue white f3 br3 br--right pointer"
                onClick={() => setTab("signup")}
              >
                Sign Up
              </div>
            </div>
            <div className="pa3">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0 mw6">
                <div className="mt3">
                  <label className="db fw6 lh-copy f5" for="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba br3 b--light-blue bg-transparent hover-bg-blue hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f5" for="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba br3 b--light-blue bg-transparent hover-bg-blue hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </fieldset>
              <div className="center tc">
                <div
                  className="link dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
                  title="Login"
                  onClick={() => {
                    storeToken("MOCK_TOKEN");
                    navigate("/main");
                  }}
                >
                  Log In
                </div>
              </div>
            </div>
          </form>
        </main>
      ) : (
        <main className="pa4 white">
          <form className="measure center ba b--light-blue br3">
            <div className="w-100 center tc bg-blue">
              <div
                className="link fl w-50 pa3 bg-blue white f3 br3 br--left br--top pointer"
                onClick={() => setTab("login")}
              >
                Login
              </div>
              <div className="fl w-50 pa3 bg-navy f3 br3 br--right">
                Sign Up
              </div>
            </div>
            <div className="pa3">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0 mw6">
                <div className="mt3">
                  <label className="db fw6 lh-copy f5" for="username">
                    Username
                  </label>
                  <input
                    className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                      validUser ? "b--light-blue" : "b--red"
                    }`}
                    type="text"
                    name="username"
                    id="username"
                    onChange={(ev) => {
                      setUsername(ev.target.value);
                      setValidUser(true);
                    }}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f5" for="email-address">
                    Email
                  </label>
                  <input
                    className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                      validEmail ? "b--light-blue" : "b--red"
                    }`}
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={(ev) => {
                      setEmail(ev.target.value);
                      setValidEmail(true);
                    }}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f5" for="phone">
                    Phone Number
                  </label>
                  <input
                    className={`pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                      validPhone ? "b--light-blue" : "b--red"
                    }`}
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={(ev) => {
                      setPhone(ev.target.value);
                      setValidPhone(true);
                    }}
                    value={phone}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f5" for="password">
                    Password
                  </label>
                  <input
                    className={`b pa2 input-reset ba br3 bg-transparent hover-bg-blue hover-white white w-100 ${
                      validPass ? "b--light-blue" : "b--red"
                    }`}
                    type="password"
                    name="password"
                    id="password"
                    onChange={(ev) => {
                      setPassword(ev.target.value);
                      setValidPass(true);
                    }}
                    value={password}
                  />
                </div>
              </fieldset>
              <div className="center tc">
                {isLoading ? (
                  <div>
                    <img className="w3 h3 dib" src={loading} alt="loading..." />
                  </div>
                ) : (
                  <div
                    className="link dim br3 bg-blue white pv2 ph3 f5 f5-l dib mr3 mr4-l pointer"
                    title="Sign Up"
                    onClick={() => {
                      if (validateFields()) {
                        postAccount();
                      }
                    }}
                  >
                    Sign up
                  </div>
                )}
              </div>
            </div>
          </form>
        </main>
      )}
    </>
  );
};

export default LoginPage;
