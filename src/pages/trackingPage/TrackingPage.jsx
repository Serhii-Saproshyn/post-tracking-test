import TrackingForm from "components/TrackingForm/TrackingForm";
import css from "./TrackingPage.module.scss";

const TrackingPage = () => {
  return (
    <div className={css.container}>
      <TrackingForm></TrackingForm>
    </div>
  );
};

export default TrackingPage;
