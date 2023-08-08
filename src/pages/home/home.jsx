import TrackingForm from "components/TrackingForm/TrackingForm";
import css from "./home.module.scss";

const Home = () => {
  return (
    <div className={css.container}>
      <TrackingForm></TrackingForm>
    </div>
  );
};

export default Home;
