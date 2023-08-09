import React from "react";
import css from "./OfficeData.module.scss";

const OfficeData = ({
  offices,
  currentPage,
  itemsPerPage,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <>
      {offices.length > 0 && (
        <div className={css.officeData}>
          <h3>Offices:</h3>
          <ul className={css.officeList}>
            {offices.map((office, index) => (
              <li key={index}>
                <p>{office.Description}</p>
              </li>
            ))}
          </ul>
          <div className={css.officePagination}>
            <button
              className={css.officePaginationButton}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous page
            </button>

            <button
              className={css.officePaginationButton}
              onClick={handleNextPage}
              disabled={offices.length === 0 || offices.length < itemsPerPage}
            >
              Next page
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OfficeData;
