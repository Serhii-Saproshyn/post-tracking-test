import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TrackingSchema from "./TrackingSchema";
import css from "./TrackingForm.module.scss";

const { REACT_APP_BASE_URL, REACT_APP_API_KEY } = process.env;

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
      const response = await axios.post(REACT_APP_BASE_URL, {
        apiKey: REACT_APP_API_KEY,
        modelName: "TrackingDocument",
        calledMethod: "getStatusDocuments",
        methodProperties: {
          Documents: [{ DocumentNumber: values.trackingNumber }],
        },
      });

      if (
        response.data.data.length > 0 &&
        response.data.data[0].Status === "Номер не найден"
      ) {
        toast.error("This package was not found");
      } else {
        setStatuses(response.data.data);

        if (!trackingNumbers.includes(values.trackingNumber)) {
          const updatedNumbers = [
            values.trackingNumber,
            ...trackingNumbers,
          ].slice(0, 5);
          setTrackingNumbers(updatedNumbers);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleTrackingNumberClick = (number) => {
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
              placeholder="Enter a 14 digit number"
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
          <ToastContainer autoClose={3000} theme="colored" />
        </div>
      )}
    </>
  );
};

export default TrackingForm;
