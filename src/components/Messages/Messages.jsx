import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

import { MdRemoveRedEye } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import { getMessagesApi, getMessages } from "../../store/slices/messagesSlice";

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useFiltration } from "../../hooks";
import { useTranslation } from "react-i18next";
const Messages = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.messages);
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
      first_name: true,
      subject: true,
      email: true,
      phone: true,
      readMessage: true,
    },
    message: {
      first_name: "",
      email: "",
      phone: "",
      subject: "",
    },
  });

  // Filtration, Sorting, Pagination
  // Columns
  const columns = [
    { id: 0, name: "first_name", label: t("message.columns.name") },
    { id: 1, name: "phone", label: t("message.columns.phone") },
    { id: 2, name: "email", label: t("message.columns.email") },
    { id: 3, name: "subject", label: t("message.columns.content") },
    { id: 4, name: "readMessage", label: t("message.columns.read") },
  ];
  const {
    PaginationUI,
    handleSort,
    handleSearch,
    handleToggleColumns,
    searchResults,
  } = useFiltration({
    rowData: messages,
    toggle,
    setToggle,
  });

  // get data from api
  useEffect(() => {
    try {
      dispatch(getMessagesApi()).then((res) => {
        if (!res.error) {
          dispatch(getMessages(res.payload));
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
              {toggle.toggleColumns?.first_name && (
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
              {toggle.toggleColumns?.phone && (
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
              {toggle.toggleColumns?.email && (
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
              {toggle.toggleColumns?.subject && (
                <th className="table-th" onClick={() => handleSort(columns[3])}>
                  {t("message.columns.content")}
                  {toggle.sortColumn === columns[3].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns?.readMessage && (
                <th className="table-th" onClick={() => handleSort(columns[4])}>
                  {t("message.columns.read")}
                  {toggle.sortColumn === columns[4].name ? (
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
                <td className="table-td" colSpan="5">
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
                <td className="table-td" colSpan="5">
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
                <td className="table-td" colSpan="5">
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
                <td className="table-td" colSpan="5">
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
                  <td className="table-td read-more">
                    <MdRemoveRedEye
                      onClick={() =>
                        setToggle({
                          ...toggle,
                          readMessage: !toggle.readMessage,
                          message: result,
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
              {/* Read Message*/}
              <Modal
                isOpen={toggle.readMessage}
                toggle={() =>
                  setToggle({
                    ...toggle,
                    readMessage: !toggle.readMessage,
                  })
                }
                centered={true}
                keyboard={true}
                size={"md"}
                contentClassName="modal-read-more modal-add-scholar"
              >
                <ModalHeader
                  toggle={() =>
                    setToggle({
                      ...toggle,
                      readMessage: !toggle.readMessage,
                    })
                  }
                  dir="rtl"
                >
                  {toggle.message?.first_name}
                  <IoMdClose
                    onClick={() =>
                      setToggle({
                        ...toggle,
                        readMessage: !toggle.readMessage,
                      })
                    }
                  />
                </ModalHeader>
                <ModalBody>
                  <div className="read-more-container text-center">
                    <h3 className="text-center mb-3">
                      {toggle.message?.first_name}
                    </h3>
                    <div className="content text-end">
                      {toggle.message?.phone}
                    </div>
                    <div className="content text-end">
                      {toggle.message?.email}
                    </div>
                    <div className="content text-end">
                      {toggle.message?.subject}
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </tbody>
          )}
        </table>
      </div>
      {/* Pagination */}
      {searchResults.length > 0 && error === null && loading === false && (
        <PaginationUI />
      )}
    </div>
  );
};

export default Messages;
