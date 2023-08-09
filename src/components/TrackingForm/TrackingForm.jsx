import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

import TrackingSchema from "./TrackingSchema";
import css from "./TrackingForm.module.scss";

const TrackingForm = () => {
  const [statuses, setStatuses] = useState([]);
  const [trackingNumbers, setTrackingNumbers] = useState(
    JSON.parse(localStorage.getItem("trackingNumbers")) || []
  );

  useEffect(() => {
    localStorage.setItem("trackingNumbers", JSON.stringify(trackingNumbers));
  }, [trackingNumbers]);

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

      // Добавляем введенный номер в список
      if (!trackingNumbers.includes(values.trackingNumber)) {
        // Ограничиваем список до 10 элементов
        const updatedNumbers = [
          values.trackingNumber,
          ...trackingNumbers,
        ].slice(0, 10);
        setTrackingNumbers(updatedNumbers);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleTrackingNumberClick = (number) => {
    // Выполняем поиск по номеру при клике на нем
    onSubmit({ trackingNumber: number });
  };

  const handleClearTrackingNumbers = () => {
    setTrackingNumbers([]);
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
      {trackingNumbers.length > 0 && (
        <div className={css.trackingNumbersList}>
          <h3>Your last 5 requests:</h3>
          <ul className={css.trackingNumbersItem}>
            {trackingNumbers.map((number, index) => (
              <li key={index} onClick={() => handleTrackingNumberClick(number)}>
                {number}
              </li>
            ))}
          </ul>
          <button onClick={handleClearTrackingNumbers}>Clear All</button>
        </div>
      )}
    </>
  );
};

export default TrackingForm;
