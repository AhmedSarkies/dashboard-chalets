import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "reactstrap";

import { IoMdCheckmarkCircle } from "react-icons/io";

import {
  getBookChaletsApi,
  acceptBookChaletApi,
  rejectBookChaletApi,
  deleteBookChaletApi,
} from "../../store/slices/bookChaletSlice";
import { TiArrowSortedDown, TiArrowSortedUp, TiDelete } from "react-icons/ti";
import { useFiltration } from "../../hooks";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";

const BookChalets = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { bookChalets, loading, error } = useSelector(
    (state) => state.bookChalet
  );
  const [toggle, setToggle] = useState({
    add: false,
    readMessage: false,
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
      other_details: true,
      date_arrival: true,
      Departure_Date: true,
      status: true,
      control: true,
    },
  });

  // Filtration, Sorting, Pagination
  // Columns
  const columns = [
    { id: 0, name: "name", label: t("bookChalets.columns.user.name") },
    { id: 1, name: "phone", label: t("bookChalets.columns.user.phone") },
    {
      id: 2,
      name: "other_details",
      label: t("bookChalets.columns.user.other_details"),
    },
    {
      id: 3,
      name: "date_arrival",
      label: t("bookChalets.columns.user.date_arrival"),
    },
    {
      id: 4,
      name: "Departure_Date",
      label: t("bookChalets.columns.user.Departure_Date"),
    },
    { id: 5, name: "status", label: t("status") },
    { id: 6, name: "control", label: t("action") },
  ];
  const {
    PaginationUI,
    handleSort,
    handleSearch,
    handleToggleColumns,
    searchResults,
  } = useFiltration({
    rowData: bookChalets,
    toggle,
    setToggle,
  });

  // get data from api
  useEffect(() => {
    try {
      dispatch(getBookChaletsApi());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div className="scholar-container mt-4 m-3">
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
              {toggle.toggleColumns?.name && (
                <th className="table-th" onClick={() => handleSort(columns[0])}>
                  {t("bookChalets.columns.user.name")}
                  {toggle.sortColumn === columns[0].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.phone && (
                <th className="table-th" onClick={() => handleSort(columns[1])}>
                  {t("bookChalets.columns.user.phone")}
                  {toggle.sortColumn === columns[1].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.other_details && (
                <th className="table-th" onClick={() => handleSort(columns[2])}>
                  {t("bookChalets.columns.user.other_details")}
                  {toggle.sortColumn === columns[2].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.date_arrival && (
                <th className="table-th" onClick={() => handleSort(columns[3])}>
                  {t("bookChalets.columns.user.date_arrival")}
                  {toggle.sortColumn === columns[3].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.Departure_Date && (
                <th className="table-th" onClick={() => handleSort(columns[4])}>
                  {t("bookChalets.columns.user.Departure_Date")}
                  {toggle.sortColumn === columns[4].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.status && (
                <th className="table-th" onClick={() => handleSort(columns[5])}>
                  {t("status")}
                  {toggle.sortColumn === columns[5].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.control && (
                <th className="table-th" onClick={() => handleSort(columns[6])}>
                  {t("action")}
                  {toggle.sortColumn === columns[6].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
            </tr>
          </thead>
          {/* Error */}
          {error !== null && loading === false && (
            <tbody>
              <tr className="no-data-container">
                <td className="table-td" colSpan="7">
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
                <td className="table-td" colSpan="7">
                  <div className="no-data mb-0">
                    <Spinner
                      color="primary"
                      style={{
                        height: "3rem",
                        width: "3rem",
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
                <td className="table-td" colSpan="7">
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
                <td className="table-td" colSpan="7">
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
                    <td className="table-td name">{result?.name}</td>
                  )}
                  {toggle.toggleColumns.phone && (
                    <td className="table-td">
                      <a className="text-white" href={`tel:${result?.phone}`}>
                        {result?.phone}
                      </a>
                    </td>
                  )}
                  {toggle.toggleColumns.other_details && (
                    <td className="table-td">
                      {result?.other_details?.slice(0, 15)}...
                    </td>
                  )}
                  {toggle.toggleColumns.date_arrival && (
                    <td className="table-td">{result?.date_arrival}</td>
                  )}
                  {toggle.toggleColumns.Departure_Date && (
                    <td className="table-td">{result?.Departure_Date}</td>
                  )}
                  {toggle.toggleColumns.status && (
                    <td className="table-td">
                      {result?.status === "pending" ? (
                        <span className="status pending">{t("pending")}</span>
                      ) : result?.status === "accept" ? (
                        <span className="status accepted">{t("accepted")}</span>
                      ) : (
                        <span className="status rejected">{t("rejected")}</span>
                      )}
                    </td>
                  )}
                  {toggle.toggleColumns.control && (
                    <td className="table-td control">
                      {result?.status === "pending" ? (
                        <>
                          <TiDelete
                            className="reject fs-4 text-danger"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              dispatch(rejectBookChaletApi(result?.id)).then(
                                (res) => {
                                  dispatch(getBookChaletsApi());
                                }
                              );
                            }}
                          />
                          <IoMdCheckmarkCircle
                            className="accept fs-4 text-success"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              dispatch(acceptBookChaletApi(result?.id)).then(
                                (res) => {
                                  dispatch(getBookChaletsApi());
                                }
                              );
                            }}
                          />
                        </>
                      ) : result?.status === "reject" ? (
                        <IoMdCheckmarkCircle
                          className="accept fs-4 text-success"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dispatch(acceptBookChaletApi(result?.id)).then(
                              (res) => {
                                dispatch(getBookChaletsApi());
                              }
                            );
                          }}
                        />
                      ) : (
                        <TiDelete
                          className="reject fs-4 text-danger"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dispatch(rejectBookChaletApi(result?.id)).then(
                              (res) => {
                                dispatch(getBookChaletsApi());
                              }
                            );
                          }}
                        />
                      )}
                      <MdDelete
                        className="delete fs-4 text-danger"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          dispatch(deleteBookChaletApi(result?.id)).then(() => {
                            dispatch(getBookChaletsApi());
                          });
                        }}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {/* Pagination */}
      {searchResults?.length > 0 && error === null && loading === false && (
        <PaginationUI />
      )}
    </div>
  );
};

export default BookChalets;
