import React from "react";
import css from "./TrackingHistory.module.scss";

const TrackingHistory = ({
  trackingNumbers,
  handleTrackingNumberClick,
  handleClearTrackingNumbers,
}) => {
  return (
    <>
      {trackingNumbers.length > 0 && (
        <div className={css.trackingNumbersContainer}>
          <h3>Your last 5 requests:</h3>
          <ul className={css.trackingNumbersList}>
            {trackingNumbers.map((number, index) => (
              <li
                className={css.trackingNumbersItem}
                key={index}
                onClick={() => handleTrackingNumberClick(number)}
              >
                {number}
              </li>
            ))}
          </ul>
          <button
            className={css.trackingClearButton}
            onClick={handleClearTrackingNumbers}
          >
            Clear All
          </button>
        </div>
      )}
    </>
  );
};

export default TrackingHistory;
