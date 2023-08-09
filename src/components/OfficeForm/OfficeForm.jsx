import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

import css from "./OfficeForm.module.scss";

const OfficeForm = () => {
  const [offices, setOffices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cityName, setCityName] = useState("");
  const itemsPerPage = 20;

  const fetchOffices = async (city, page) => {
    try {
      const response = await axios.post(
        "https://api.novaposhta.ua/v2.0/json/",
        {
          apiKey: "f45cbadcbc8973c2c2b63e2376046972",
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
        }
      );
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
    <div className={css.officeFormContainer}>
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
          <div>
            <button className={css.officeButton} type="submit">
              Find
            </button>
          </div>
        </Form>
      </Formik>
      {cityName && offices.length > 0 && (
        <div className={css.officesContainer}>
          <h3>Offices:</h3>
          <ul>
            {offices.map((office, index) => (
              <li key={index}>
                <p>{office.Description}</p>
              </li>
            ))}
          </ul>
          <div className={css.pagination}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous page
            </button>
            <button onClick={handleNextPage}>Next page</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeForm;
