import { Watch } from "react-loader-spinner";
import css from "components/Loader/Loader.module.css";

const Loader = () => {
  return (
    <div className={css.container}>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="rgb(255, 63, 63)"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
