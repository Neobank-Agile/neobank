import Menu from "./Menu";
import Balances from "./Balances";
import TransactionsForm from "./TransactionsForm";

const TransactionsPage = () => {
  return (
    <>
      <Menu />
      <article className="mw7 center ph3 ph5-ns tc br2 pv5 mt3 light-blue mb5">
        <Balances />
        <div className="pa3" />
        <TransactionsForm />
      </article>
    </>
  );
};

export default TransactionsPage;
