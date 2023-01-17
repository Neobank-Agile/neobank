import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storeToken } from "./store";
import Menu from "./Menu";

const LoginPage = () => {
  let { action } = useParams();
  const [tab, setTab] = useState(action);
  const navigate = useNavigate();

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
                    className="pa2 input-reset ba br3 b--light-blue bg-transparent hover-bg-blue hover-white w-100"
                    type="text"
                    name="username"
                    id="username"
                  />
                </div>
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
                <div className="mt3">
                  <label className="db fw6 lh-copy f5" for="phone">
                    Phone Number
                  </label>
                  <input
                    className="pa2 input-reset ba br3 b--light-blue bg-transparent hover-bg-blue hover-white w-100"
                    type="text"
                    name="phone"
                    id="phone"
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
                  title="Sign Up"
                >
                  Sign up
                </div>
              </div>
            </div>
          </form>
        </main>
      )}
    </>
  );
};

export default LoginPage;
