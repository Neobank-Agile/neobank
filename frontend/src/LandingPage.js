import Menu from "./Menu";
import ExchangeForm from "./ExchangeForm";

const LandingPage = () => {
  return (
    <>
      <Menu />
      <div className="center tc mt4 mt5-m mt6-l ph3">
        <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">
          Welcome to Neo Bank
        </h1>
        <h2 className="fw1 f3 white-80 mt3 mb4">
          Simple, centralized currencies management.
        </h2>
      </div>
      <ExchangeForm postEnabled={false} />
      <div className="center tc mt3 ph3">
        <img className="w-100 mw7" alt="graph" src="graph.png" />
      </div>
      <div className="center tc mt3 mt4-m mt5-l ph3">
        <h1 className="f3 f2-l fw2 white-90 mb0 lh-title">
          Multiple Fiat and Crypto Currencies
        </h1>
        <h2 className="fw1 f4 white-80 mt3 mb4 mw6 center tj">
          Neobank is available in USD, EUR, and BTC. <br />
          Seamless exchange between any of this currencies. <br /> Simplify
          global money management.
          <br /> Pay invoices and subscriptions in multiple currencies.
          <br /> Receive payments just by sharing your account number or email
          address.
        </h2>
      </div>
      <div className="center tc mt3 mt4-m mt5-l ph3">
        <h1 className="f4 f2-l fw2 white-90 mb0 lh-title">
          One-step international Transfer
        </h1>
        <h2 className="fw1 f4 white-80 mt3 mb4 tj mw6 center">
          Under the traditional method, transferring money abroad requires to
          previously exchange currencies, or pay expensive rates for automatic
          exchange.
          <br />
          With our services, you can transfer money in one simple step, with the
          best rates.
        </h2>
      </div>
    </>
  );
};

export default LandingPage;
