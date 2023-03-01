import { getToken, removeToken } from "./store";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const token = getToken();
  const navigate = useNavigate();

  return (
    <nav className="db dt-l w-100 border-box pa3 ph5-l bb b--white">
      {token.length < 1 ? (
        <>
          <a
            className="db dtc-l v-mid white link dim w-100 w-25-l tc tl-l mb2 mb0-l f3 fw5"
            href="/"
            title="Neobank"
          >
            Neobank
          </a>
          <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
            <a
              className="link dim blue f6 f5-l dib mr3 mr4-l"
              href="/login/signup"
              title="Sign up"
            >
              Sign up
            </a>
            <a
              className="link dim br3 bg-blue white pv2 ph3 f6 f5-l dib mr3 mr4-l"
              href="/login/login"
              title="Login"
            >
              Login
            </a>
          </div>
        </>
      ) : (
        <>
          <a
            className="db dtc-l v-mid white link dim w-100 w-25-l tc tl-l mb2 mb0-l f3 fw5"
            href="/"
            title="Home"
          >
            Neobank
          </a>
          <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
            <a
              className="link dim white f6 f5-l dib mr3 mr4-l"
              href="/main"
              title="Dashboard"
            >
              Dashboard
            </a>
            <a
              className="link dim white f6 f5-l dib mr3 mr4-l"
              href="/transactions"
              title="Logout"
            >
              Transactions
            </a>
            <a
              className="link dim white f6 f5-l dib mr3 mr4-l"
              href="/settings"
              title="Settings"
            >
              Settings
            </a>
            <div
              className="link dim blue f6 f5-l dib mr3 mr4-l pointer"
              title="Logout"
              onClick={() => {
                removeToken();
                navigate("/");
              }}
            >
              Logout
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
export default Menu;
