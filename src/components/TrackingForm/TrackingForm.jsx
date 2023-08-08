import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import TrackingSchema from "./TrackingSchema";
import css from "./TrackingForm.module.scss";

const TrackingForm = () => {
  const onSubmit = (values) => {
    console.log("Tracking number:", values.trackingNumber);
  };

  return (
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
  );
};

export default TrackingForm;
