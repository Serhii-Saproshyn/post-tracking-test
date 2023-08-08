import * as Yup from "yup";

const TrackingSchema = Yup.object({
  trackingNumber: Yup.string()
    .matches(/^\d{14}$/, "Tracking number must be exactly 14 numbers")
    .required("Please enter a tracking number"),
});

export default TrackingSchema;
