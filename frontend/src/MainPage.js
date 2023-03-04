import Menu from "./Menu";
import AccountSummary from "./AccountSummary";
import Balances from "./Balances";
import Transactions from "./Transactions";

const MainPage = () => {
  return (
    <>
      <Menu />
      <article className="center ph3 ph5-ns tc br2 pv5 mt3 light-blue mb5">
        <AccountSummary />
        <Balances />
        <Transactions />
      </article>
    </>
  );
};

export default MainPage;
