import OfficeForm from "components/OfficeForm/OfficeForm";
import css from "./postOffice.module.scss";
const PostOffice = () => {
  return (
    <div className={css.container}>
      <OfficeForm></OfficeForm>
    </div>
  );
};

export default PostOffice;
