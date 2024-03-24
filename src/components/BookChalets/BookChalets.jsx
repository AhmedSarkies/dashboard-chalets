import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "reactstrap";

import { IoMdCheckmarkCircle } from "react-icons/io";

import {
  getBookChaletsApi,
  // acceptBookChaletApi,
  // rejectBookChaletApi,
  getBookChalets,
} from "../../store/slices/bookChaletSlice";
import { TiArrowSortedDown, TiArrowSortedUp, TiDelete } from "react-icons/ti";
import { useFiltration } from "../../hooks";
import { useTranslation } from "react-i18next";

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
      user: {
        name: true,
        email: true,
        phone: true,
      },
      chalet: {
        address: true,
        price: true,
        name: true,
        date: true,
        time: true,
      },
      control: true,
    },
  });

  // Filtration, Sorting, Pagination
  // Columns
  const columns = [
    { id: 0, name: "name", label: t("bookChalets.columns.user.name") },
    { id: 1, name: "phone", label: t("bookChalets.columns.user.phone") },
    { id: 2, name: "email", label: t("bookChalets.columns.user.email") },
    { id: 3, name: "chalet", label: t("bookChalets.columns.chalet.name") },
    { id: 4, name: "address", label: t("bookChalets.columns.chalet.address") },
    { id: 5, name: "price", label: t("bookChalets.columns.chalet.price") },
    { id: 6, name: "date", label: t("bookChalets.columns.chalet.date") },
    { id: 7, name: "time", label: t("bookChalets.columns.chalet.time") },
    { id: 8, name: "control", label: t("action") },
  ];
  const {
    PaginationUI,
    handleSort,
    handleSearch,
    handleToggleColumns,
    results,
  } = useFiltration({
    rowData: bookChalets,
    toggle,
    setToggle,
  });

  // get data from api
  useEffect(() => {
    try {
      dispatch(getBookChaletsApi()).then((res) => {
        if (!res.error) {
          dispatch(getBookChalets(res.payload));
        }
      });
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
                  className={`item filter`}
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
              {toggle.toggleColumns?.user?.name && (
                <th className="table-th" onClick={() => handleSort(columns[0])}>
                  {t("message.columns.name")}
                  {toggle.sortColumn === columns[0].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.user?.phone && (
                <th className="table-th" onClick={() => handleSort(columns[1])}>
                  {t("message.columns.phone")}
                  {toggle.sortColumn === columns[1].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.user?.email && (
                <th className="table-th" onClick={() => handleSort(columns[2])}>
                  {t("message.columns.email")}
                  {toggle.sortColumn === columns[2].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.chalet?.name && (
                <th className="table-th" onClick={() => handleSort(columns[3])}>
                  {t("bookChalets.columns.chalet.name")}
                  {toggle.sortColumn === columns[3].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.chalet?.address && (
                <th className="table-th" onClick={() => handleSort(columns[4])}>
                  {t("bookChalets.columns.chalet.address")}
                  {toggle.sortColumn === columns[4].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.chalet?.price && (
                <th className="table-th" onClick={() => handleSort(columns[5])}>
                  {t("bookChalets.columns.chalet.price")}
                  {toggle.sortColumn === columns[5].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.chalet?.date && (
                <th className="table-th" onClick={() => handleSort(columns[6])}>
                  {t("bookChalets.columns.chalet.date")}
                  {toggle.sortColumn === columns[6].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.chalet?.time && (
                <th className="table-th" onClick={() => handleSort(columns[7])}>
                  {t("bookChalets.columns.chalet.time")}
                  {toggle.sortColumn === columns[7].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.control && (
                <th className="table-th" onClick={() => handleSort(columns[8])}>
                  {t("action")}
                  {toggle.sortColumn === columns[8].name ? (
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
                <td className="table-td" colSpan="9">
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
                <td className="table-td" colSpan="9">
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
          {results?.length === 0 && error === null && !loading && (
            <tbody>
              <tr className="no-data-container">
                <td className="table-td" colSpan="9">
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
                <td className="table-td" colSpan="9">
                  <p className="no-data no-columns mb-0">{t("noColumns")}</p>
                </td>
              </tr>
            </tbody>
          )}
          {/* Data */}
          {results?.length > 0 && error === null && loading === false && (
            <tbody>
              {results?.map((result) => (
                <tr key={result?.id + new Date().getDate()}>
                  <td className="table-td name">{result?.first_name}</td>
                  <td className="table-td phone">
                    <a href={`tel${result?.phone}`}>{result?.phone}</a>
                  </td>
                  <td className="table-td email">
                    <a href={`mailto:${result?.email}`}>{result?.email}</a>
                  </td>
                  <td className="table-td subject">
                    {result?.subject.length > 20
                      ? result?.subject.slice(0, 20) + "..."
                      : result?.subject}
                  </td>
                  <td className="table-td actions">
                    <IoMdCheckmarkCircle />
                    <TiDelete />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {/* Pagination */}
      {results.length > 0 && error === null && loading === false && (
        <PaginationUI />
      )}
    </div>
  );
};

export default BookChalets;
