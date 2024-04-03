import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Col, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap";

import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import {
  addBrokerApi,
  deleteBrokerApi,
  getBrokersApi,
  updateBrokerApi,
} from "../../store/slices/brokerSlice";
import { useFormik } from "formik";
import { useFiltration, useSchema } from "../../hooks";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";

const initialValues = {
  Fullname: "",
  phone_number: "",
};

const Brokers = ({ dashboard }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { validationSchema } = useSchema();
  const location = useLocation();
  const { brokers, loading, error } = useSelector((state) => state.broker);
  const [toggle, setToggle] = useState({
    add: false,
    edit: false,
    imagePreview: false,
    status: false,
    searchTerm: "",
    activeColumn: false,
    activeRows: false,
    rowsPerPage: 5,
    currentPage: 1,
    sortColumn: "",
    sortOrder: "asc",
    toggleColumns: {
      name: true,
      phone: true,
      Registration_code: true,
      action: true,
    },
  });

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema.brokers,
    onSubmit: (values) => {
      // Add Broker
      if (!values.id) {
        dispatch(addBrokerApi(values)).then((res) => {
          if (!res.error) {
            dispatch(getBrokersApi());
            formik.handleReset();
            setToggle({
              ...toggle,
              add: !toggle.add,
            });
            toast.success(t("toast.brokers.addedSuccess"));
          } else {
            toast.error(t("toast.brokers.addedError"));
            dispatch(getBrokersApi());
          }
        });
      } else {
        // Update Broker
        dispatch(updateBrokerApi(values)).then((res) => {
          if (!res.error) {
            dispatch(getBrokersApi());
            formik.handleReset();
            setToggle({
              ...toggle,
              add: !toggle.add,
            });
            toast.success(t("toast.brokers.updatedSuccess"));
          } else {
            toast.error(t("toast.brokers.updatedError"));
            dispatch(getBrokersApi());
          }
        });
      }
    },
  });

  // Delete Scholar
  const handleDelete = (broker) => {
    Swal.fire({
      title: t("titleDeleteAlert") + broker?.Fullname + "?",
      text: t("textDeleteAlert"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0d1d34",
      confirmButtonText: t("confirmButtonText"),
      cancelButtonText: t("cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBrokerApi(broker?.id)).then((res) => {
          if (!res.error) {
            dispatch(getBrokersApi());
            Swal.fire({
              title: `${t("titleDeletedSuccess")} ${broker?.Fullname}`,
              text: `${t("titleDeletedSuccess")} ${broker?.Fullname} ${t(
                "textDeletedSuccess"
              )}`,
              icon: "success",
              confirmButtonColor: "#0d1d34",
              confirmButtonText: t("doneDeletedSuccess"),
            }).then(() => toast.success(t("toast.brokers.deletedSuccess")));
          } else {
            toast.error(t("toast.brokers.deletedError"));
            dispatch(getBrokersApi());
          }
        });
      }
    });
  };

  // handle Input Using Formik
  const handleInput = (e) => {
    formik.handleChange(e);
  };

  // Filtration, Sorting, Pagination
  // Columns
  const columns = [
    { id: 1, name: "name", label: t("brokers.columns.name") },
    { id: 2, name: "phone", label: t("brokers.columns.phone") },
    {
      id: 3,
      name: "Registration_code",
      label: t("brokers.columns.Registration_code"),
    },
    { id: 4, name: "action", label: t("action") },
  ];
  const {
    PaginationUI,
    handleSort,
    handleSearch,
    handleToggleColumns,
    searchResults,
  } = useFiltration({
    rowData: brokers,
    toggle,
    setToggle,
  });

  // get data from api
  useEffect(() => {
    try {
      dispatch(getBrokersApi());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, location.pathname]);

  return (
    <div className="scholar-container mt-4 m-3">
      <div className="table-header">
        <button
          className="add-btn"
          onClick={() =>
            setToggle({
              ...toggle,
              add: !toggle.add,
            })
          }
        >
          <MdAdd />
          {t("brokers.addTitle")}
        </button>
        {dashboard && <h2>{t("brokers.title")}</h2>}
      </div>
      <div className="scholar">
        <div className="table-header">
          {/* Search */}
          <div className="search-container form-group-container form-input">
            <input
              type="text"
              className="form-input"
              placeholder={t("search")}
              onChange={handleSearch}
            />
          </div>
          {/* Show and Hide Columns */}
          <div className="dropdown columns form-input">
            <button
              type="button"
              onClick={() => {
                setToggle({
                  ...toggle,
                  activeColumn: !toggle.activeColumn,
                });
              }}
              className="dropdown-btn d-flex justify-content-between align-items-center"
              style={{
                width: "180px",
              }}
            >
              <span>{t("columnsFilter")}</span>
              <TiArrowSortedUp
                className={`dropdown-icon ${
                  toggle.activeColumn ? "active" : ""
                }`}
              />
            </button>
            <div
              className={`dropdown-content ${
                toggle.activeColumn ? "active" : ""
              }`}
              style={{
                width: "180px",
                maxHeight: "160px",
              }}
            >
              {columns.map((column) => (
                <button
                  type="button"
                  key={column.id}
                  className="item filter d-flex justify-content-end"
                  onClick={() => handleToggleColumns(column.name)}
                >
                  <span className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox-column"
                      checked={toggle.toggleColumns[column.name]}
                      readOnly
                    />
                    <span>{column.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <table className="table-body">
          <thead>
            <tr>
              {/* Show and Hide Columns */}
              {toggle.toggleColumns.name && (
                <th className="table-th" onClick={() => handleSort(columns[0])}>
                  {t("brokers.columns.name")}
                  {toggle.sortColumn === columns[0].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.phone && (
                <th className="table-th" onClick={() => handleSort(columns[1])}>
                  {t("brokers.columns.phone")}
                  {toggle.sortColumn === columns[1].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.Registration_code && (
                <th className="table-th" onClick={() => handleSort(columns[2])}>
                  {t("brokers.columns.Registration_code")}
                  {toggle.sortColumn === columns[2].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.action && (
                <th className="table-th">{t("action")}</th>
              )}
            </tr>
          </thead>
          {/* Error */}
          {error !== null && loading === false && (
            <tbody>
              <tr className="no-data-container">
                <td className="table-td" colSpan="4">
                  <p className="no-data mb-0">
                    {error === "Network Error"
                      ? t("networkError")
                      : error === "Request failed with status code 404"
                      ? t("noData")
                      : error === "Request failed with status code 500"
                      ? t("serverError")
                      : t("someError")}
                  </p>
                </td>
              </tr>
            </tbody>
          )}
          {/* Loading */}
          {loading && (
            <tbody>
              <tr className="no-data-container">
                <td className="table-td" colSpan="4">
                  <div className="no-data mb-0">
                    <Spinner
                      style={{
                        height: "3rem",
                        width: "3rem",
                        color: "var(--main-color)",
                      }}
                    >
                      Loading...
                    </Spinner>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
          {/* No Data */}
          {searchResults?.length === 0 && error === null && !loading && (
            <tbody>
              <tr className="no-data-container">
                <td className="table-td" colSpan="4">
                  <p className="no-data mb-0">{t("noData")}</p>
                </td>
              </tr>
            </tbody>
          )}
          {/* There is no any columns */}
          {Object.values(toggle.toggleColumns).every(
            (column) => column === false
          ) && (
            <tbody>
              <tr className="no-data-container">
                <td className="table-td" colSpan="4">
                  <p className="no-data no-columns mb-0">{t("noColumns")}</p>
                </td>
              </tr>
            </tbody>
          )}
          {/* Data */}
          {searchResults?.length > 0 && error === null && loading === false && (
            <tbody>
              {searchResults?.map((result) => (
                <tr key={result?.id + new Date().getDate()}>
                  {toggle.toggleColumns.name && (
                    <td className="table-td name">
                      <Link to={`/chalets/chalets-brokers/${result?.id}`}>
                        {result?.Fullname}
                      </Link>
                    </td>
                  )}
                  {toggle.toggleColumns.phone && (
                    <td className="table-td">
                      <a
                        className="text-white"
                        href={`tel:${result?.phone_number}`}
                      >
                        {result?.phone_number}
                      </a>
                    </td>
                  )}
                  {toggle.toggleColumns.Registration_code && (
                    <td className="table-td">{result?.Registration_code}</td>
                  )}
                  {toggle.toggleColumns.action && (
                    <td className="table-td">
                      <span className="table-btn-container">
                        <FaPen
                          className="edit-btn"
                          onClick={() => {
                            setToggle({
                              ...toggle,
                              add: !toggle.add,
                            });
                            formik.setValues({
                              id: result?.id,
                              Fullname: result?.Fullname,
                              phone_number: result?.phone_number,
                            });
                          }}
                        />
                        <MdDeleteOutline
                          className="delete-btn"
                          onClick={() => handleDelete(result)}
                        />
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {/* Add brokers */}
      <Modal
        isOpen={toggle.add}
        toggle={() => {
          formik.handleReset();
          setToggle({
            ...toggle,
            add: !toggle.add,
          });
        }}
        centered={true}
        keyboard={true}
        size={"md"}
        contentClassName="modal-add-scholar"
      >
        <ModalHeader
          toggle={() => {
            formik.handleReset();
            setToggle({
              ...toggle,
              add: !toggle.add,
            });
          }}
        >
          {formik.values.id ? t("brokers.editTitle") : t("brokers.addTitle")}
          <IoMdClose
            onClick={() => {
              formik.handleReset();
              setToggle({
                ...toggle,
                add: !toggle.add,
              });
            }}
          />
        </ModalHeader>
        <ModalBody>
          <form className="overlay-form" onSubmit={formik.handleSubmit}>
            <Row className="d-flex justify-content-end align-items-center p-3 pb-lg-2 pb-0">
              <Col lg={12}>
                <div
                  className="form-group-container d-flex flex-column align-items-end mb-3"
                  style={{ marginTop: "-4px" }}
                >
                  <label htmlFor="Fullname" className="form-label">
                    {t("brokers.columns.name")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="Fullname"
                    placeholder={t("brokers.columns.name")}
                    name="Fullname"
                    value={formik.values.Fullname}
                    onChange={handleInput}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <span className="error">{formik.errors.name}</span>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <div className="form-group-container d-flex flex-column align-items-end mb-3">
                  <label htmlFor="phone_number" className="form-label">
                    {t("brokers.columns.phone")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="test"
                    placeholder={t("brokers.columns.phone")}
                    name="phone_number"
                    value={formik.values.phone_number}
                    onChange={handleInput}
                  />
                  {formik.errors.phone_number && formik.touched.phone_number ? (
                    <span className="error">{formik.errors.phone_number}</span>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row className="d-flex justify-content-end align-items-center p-3 pt-0">
              <Col lg={12}>
                <div className="form-group-container d-flex flex-row-reverse justify-content-lg-start justify-content-center gap-3">
                  <button type="submit" className="add-btn">
                    {/* loading */}
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      t("add")
                    )}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setToggle({
                        ...toggle,
                        add: !toggle.add,
                      });
                      formik.handleReset();
                    }}
                  >
                    {t("cancel")}
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      {/* Pagination */}
      {searchResults?.length > 0 && error === null && loading === false && (
        <PaginationUI />
      )}
    </div>
  );
};

export default Brokers;
