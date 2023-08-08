import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

import TrackingSchema from "./TrackingSchema";
import css from "./TrackingForm.module.scss";

const TrackingForm = () => {
  const [statuses, setStatuses] = useState([]);
  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://api.novaposhta.ua/v2.0/json/",
        {
          apiKey: "f45cbadcbc8973c2c2b63e2376046972",
          modelName: "TrackingDocument",
          calledMethod: "getStatusDocuments",
          methodProperties: {
            Documents: [{ DocumentNumber: values.trackingNumber }],
          },
        }
      );

      setStatuses(response.data.data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ trackingNumber: "" }}
        validationSchema={TrackingSchema}
        onSubmit={onSubmit}
      >
        <Form className={css.trackingForm}>
          <div className={css.inputContainer}>
            <Field
              type="text"
              name="trackingNumber"
              placeholder="Enter a tracking number of 14 digits"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="trackingNumber"
              component="div"
            />
          </div>
          <div>
            <button className={css.trackingButton} type="submit">
              Track
            </button>
          </div>
        </Form>
      </Formik>
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
              <li key={index}>
                <p>Status: {Status}</p>
                <p>Actual Delivery Date: {ActualDeliveryDate}</p>
                <p>City Sender: {CitySender}</p>
                <p>Warehouse Recipient: {WarehouseRecipient}</p>
                <p>City Recipient: {CityRecipient}</p>
                <p>Number: {Number}</p>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default TrackingForm;
