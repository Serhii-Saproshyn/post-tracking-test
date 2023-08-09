import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrackingSchema from "./TrackingSchema";
import TrackingStatus from "../TrackingStatus/TrackingStatus";
import TrackingHistory from "../TrackingHistory/TrackingHistory";

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
      <TrackingStatus statuses={statuses} />
      <TrackingHistory
        trackingNumbers={trackingNumbers}
        handleTrackingNumberClick={onSubmit}
        handleClearTrackingNumbers={() => setTrackingNumbers([])}
      />
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
};

export default TrackingForm;
