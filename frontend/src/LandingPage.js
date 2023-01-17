import Menu from "./Menu";

const LandingPage = () => {
  return (
    <>
      <Menu />
      <div className="center tc mt4 mt5-m mt6-l ph3">
        <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">
          Welcome to Neo Bank
        </h1>
        <h2 className="fw1 f3 white-80 mt3 mb4">
          Protect, access and grow your wealth from anywhere in the world with
          an international bank account.
        </h2>
      </div>
    </>
  );
};

export default LandingPage;
