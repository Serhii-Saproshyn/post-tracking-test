import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import css from "./OfficeForm.module.scss";

const { REACT_APP_BASE_URL, REACT_APP_API_KEY } = process.env;

const OfficeForm = () => {
  const [offices, setOffices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cityName, setCityName] = useState("");
  const itemsPerPage = 10;

  const fetchOffices = async (city, page) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL, {
        apiKey: process.env.REACT_APP_API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: city,
          Page: page.toString(),
          Limit: itemsPerPage.toString(),
          Language: "UA",
          TypeOfWarehouseRef: "",
          WarehouseId: "",
        },
      });

      if (response.data.data.length === 0) {
        toast.error("Please enter a valid request");
      }

      setOffices(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (cityName) {
      fetchOffices(cityName, currentPage);
    }
  }, [currentPage, cityName]);

  const onSubmit = async (values) => {
    setCurrentPage(1);
    setCityName(values.cityName);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={css.officeСontainer}>
      <Formik initialValues={{ cityName: "" }} onSubmit={onSubmit}>
        <Form className={css.officeForm}>
          <div className={css.inputContainer}>
            <Field
              type="text"
              name="cityName"
              placeholder="Enter the name of the city in Ukrainian"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="cityName"
              component="div"
            />
          </div>

          <button className={css.officeButton} type="submit">
            Find
          </button>
        </Form>
      </Formik>
      {cityName && offices.length > 0 && (
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
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};

export default OfficeForm;
