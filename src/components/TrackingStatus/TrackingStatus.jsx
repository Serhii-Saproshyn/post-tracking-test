import React from "react";
import css from "./TrackingStatus.module.scss";

const TrackingStatus = ({ statuses }) => {
  return (
    <div className={css.statusContainer}>
      <ul>
        {statuses.map(
          (
            {
              Status,
              ActualDeliveryDate,
              CitySender,
              WarehouseRecipient,
              CityRecipient,
              Number,
            },
            index
          ) => (
            <li className={css.statusList} key={index}>
              <p>Status: {Status}</p>
              <p>Actual Delivery Date: {ActualDeliveryDate}</p>
              <p>City Sender: {CitySender}</p>
              <p>City Recipient: {CityRecipient}</p>
              <p>Warehouse Recipient: {WarehouseRecipient}</p>
              <p>Number: {Number}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TrackingStatus;
