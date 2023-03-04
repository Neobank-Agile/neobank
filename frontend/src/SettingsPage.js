import Menu from "./Menu";
import PersonalInformation from "./PersonalInformation";
import Cards from "./Cards";

const SettingsPage = () => {
  return (
    <>
      <Menu />
      <article className="center ph3 ph5-ns tc br2 pv5 mt3 light-blue mb5">
        <PersonalInformation />
        <Cards />
      </article>
    </>
  );
};

export default SettingsPage;
