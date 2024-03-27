import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "reactstrap";

import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { FaPen } from "react-icons/fa";
import {
  deleteChaletApi,
  getChalets,
  getChaletsApi,
  deleteChalet,
} from "../../store/slices/chaletSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useFiltration } from "../../hooks";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";
import { getBrokerChaletsApi } from "../../store/slices/brokerSlice";
import Cookies from "js-cookie";

const Chalets = ({ dashboard }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = useParams().id;
  const { chalets, loading, error } = useSelector((state) => state.chalet);
  const { brokerChalets } = useSelector((state) => state.broker);
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
      control: true,
      title: true,
      description: true,
      price: true,
      image_array: true,
      Image_OwnerChalet: true,
      name_OwnerChalet: true,
      phone_OwnerChalet: true,
      email_OwnerChalet: true,
      whatsapp_OwnerChalet: true,
      name_area: true,
      image_area: true,
      sub_description_area: true,
      Property_type: true,
      Display_type: true,
      space: true,
      number_rooms: true,
      Furnishing: true,
      Bathroom: true,
      Registration_code: true,
      tag_name: true,
      days: true,
    },
  });

  // Delete Scholar
  const handleDelete = (chalets) => {
    Swal.fire({
      title: t("titleDeleteAlert") + chalets?.title + "?",
      text: t("textDeleteAlert"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0d1d34",
      confirmButtonText: t("confirmButtonText"),
      cancelButtonText: t("cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteChaletApi(chalets?.id)).then((res) => {
          if (!res.error) {
            dispatch(deleteChalet(chalets?.id));
            Swal.fire({
              title: `${t("titleDeletedSuccess")} ${chalets?.name}`,
              text: `${t("titleDeletedSuccess")} ${chalets?.name} ${t(
                "textDeletedSuccess"
              )}`,
              icon: "success",
              confirmButtonColor: "#0d1d34",
              confirmButtonText: t("doneDeletedSuccess"),
            }).then(() => toast.success(t("toast.chalets.deletedSuccess")));
          } else {
            toast.error(t("toast.chalets.deletedError"));
          }
        });
      }
    });
  };

  // Filtration, Sorting, Pagination
  // Columns
  const columns = [
    { id: 1, name: "image_array", label: t("chalets.columns.image_array") },
    { id: 2, name: "title", label: t("chalets.columns.title") },
    { id: 3, name: "price", label: t("chalets.columns.price") },
    { id: 4, name: "name_area", label: t("chalets.columns.name_area") },
    { id: 5, name: "Property_type", label: t("chalets.columns.Property_type") },
    { id: 6, name: "Display_type", label: t("chalets.columns.Display_type") },
    { id: 7, name: "space", label: t("chalets.columns.space") },
    { id: 8, name: "number_rooms", label: t("chalets.columns.number_rooms") },
    { id: 9, name: "Furnishing", label: t("chalets.columns.Furnishing") },
    { id: 10, name: "Bathroom", label: t("chalets.columns.Bathroom") },
    {
      id: 11,
      name: "name_OwnerChalet",
      label: t("chalets.columns.name_OwnerChalet"),
    },
    {
      id: 12,
      name: "phone_OwnerChalet",
      label: t("chalets.columns.phone_OwnerChalet"),
    },
    {
      id: 13,
      name: "email_OwnerChalet",
      label: t("chalets.columns.email_OwnerChalet"),
    },
    {
      id: 14,
      name: "whatsapp_OwnerChalet",
      label: t("chalets.columns.whatsapp_OwnerChalet"),
    },
    { id: 15, name: "control", label: t("action") },
  ];
  const {
    PaginationUI,
    handleSort,
    handleSearch,
    handleToggleColumns,
    searchResults,
  } = useFiltration({
    rowData: chalets,
    toggle,
    setToggle,
  });

  // get data from api
  useEffect(() => {
    try {
      dispatch(getChaletsApi()).then((res) => {
        if (!res.error) {
          dispatch(getChalets(res.payload));
        }
      });
      dispatch(getBrokerChaletsApi(id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, location.pathname, id]);

  return (
    <div className="scholar-container mt-4 m-3">
      <div className="table-header">
        <Link
          className="add-btn"
          to={
            id
              ? `/chalets/broker/add-broker-chalet/${brokerChalets.Registration_code}`
              : "/chalets/add-chalet"
          }
        >
          <MdAdd />
          {t("chalets.addTitle")}
        </Link>
        {dashboard && <h2>{t("chalets.title")}</h2>}
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
                  style={{
                    display:
                      id && column.name === "control" ? "none !important" : "",
                  }}
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
              {toggle.toggleColumns.image_array && (
                <th className="table-th" onClick={() => handleSort(columns[0])}>
                  {t("chalets.columns.image_array")}
                  {toggle.sortColumn === columns[0].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.title && (
                <th className="table-th" onClick={() => handleSort(columns[1])}>
                  {t("addChalet.columns.title")}
                  {toggle.sortColumn === columns[1].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.price && (
                <th className="table-th" onClick={() => handleSort(columns[2])}>
                  {t("chalets.columns.price")}
                  {toggle.sortColumn === columns[2].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.name_area && (
                <th className="table-th" onClick={() => handleSort(columns[3])}>
                  {t("chalets.columns.name_area")}
                  {toggle.sortColumn === columns[3].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.Property_type && (
                <th className="table-th" onClick={() => handleSort(columns[4])}>
                  {t("chalets.columns.Property_type")}
                  {toggle.sortColumn === columns[4].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.Display_type && (
                <th className="table-th" onClick={() => handleSort(columns[5])}>
                  {t("chalets.columns.Display_type")}
                  {toggle.sortColumn === columns[5].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.space && (
                <th className="table-th" onClick={() => handleSort(columns[6])}>
                  {t("chalets.columns.space")}
                  {toggle.sortColumn === columns[6].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.number_rooms && (
                <th className="table-th" onClick={() => handleSort(columns[7])}>
                  {t("chalets.columns.number_rooms")}
                  {toggle.sortColumn === columns[7].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.Furnishing && (
                <th className="table-th" onClick={() => handleSort(columns[8])}>
                  {t("chalets.columns.Furnishing")}
                  {toggle.sortColumn === columns[8].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.Bathroom && (
                <th className="table-th" onClick={() => handleSort(columns[9])}>
                  {t("chalets.columns.Bathroom")}
                  {toggle.sortColumn === columns[9].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.Registration_code && (
                <th
                  className="table-th"
                  onClick={() => handleSort(columns[10])}
                >
                  {t("chalets.columns.Registration_code")}
                  {toggle.sortColumn === columns[10].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.name_OwnerChalet && (
                <th
                  className="table-th"
                  onClick={() => handleSort(columns[11])}
                >
                  {t("chalets.columns.name_OwnerChalet")}
                  {toggle.sortColumn === columns[11].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.phone_OwnerChalet && (
                <th
                  className="table-th"
                  onClick={() => handleSort(columns[12])}
                >
                  {t("chalets.columns.phone_OwnerChalet")}
                  {toggle.sortColumn === columns[12].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.email_OwnerChalet && (
                <th
                  className="table-th"
                  onClick={() => handleSort(columns[13])}
                >
                  {t("chalets.columns.email_OwnerChalet")}
                  {toggle.sortColumn === columns[13].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.whatsapp_OwnerChalet && (
                <th
                  className="table-th"
                  onClick={() => handleSort(columns[14])}
                >
                  {t("chalets.columns.whatsapp_OwnerChalet")}
                  {toggle.sortColumn === columns[14].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {id
                ? null
                : toggle.toggleColumns.control && (
                    <th className="table-th">{t("action")}</th>
                  )}
            </tr>
          </thead>
          {/* Error */}
          {error !== null && loading === false && (
            <tbody>
              <tr className="no-data-container">
                <td className="table-td" colSpan={id ? 15 : 16}>
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
                <td className="table-td" colSpan={id ? 15 : 16}>
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
          {searchResults.length === 0 && error === null && !loading && (
            <tbody>
              <tr className="no-data-container">
                <td className="table-td" colSpan={id ? 15 : 16}>
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
                <td className="table-td" colSpan={id ? 15 : 16}>
                  <p className="no-data no-columns mb-0">{t("noColumns")}</p>
                </td>
              </tr>
            </tbody>
          )}
          {/* Data */}
          {id && error === null && loading === false && (
            <tbody>
              <tr key={brokerChalets?.id + new Date().getDate()}>
                {toggle.toggleColumns.image_array && (
                  <td className="table-td">
                    <img
                      src={brokerChalets?.image_area?.split(",")[0]}
                      alt={brokerChalets?.title}
                      className="table-img"
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </td>
                )}
                {toggle.toggleColumns.title && (
                  <td className="table-td name">{brokerChalets?.title}</td>
                )}
                {toggle.toggleColumns.price && (
                  <td className="table-td">{brokerChalets?.price}</td>
                )}
                {toggle.toggleColumns.name_area && (
                  <td className="table-td">{brokerChalets?.name_area}</td>
                )}
                {toggle.toggleColumns.Property_type && (
                  <td className="table-td">{brokerChalets?.Property_type}</td>
                )}
                {toggle.toggleColumns.Display_type && (
                  <td className="table-td">{brokerChalets?.Display_type}</td>
                )}
                {toggle.toggleColumns.space && (
                  <td className="table-td">{brokerChalets?.space}</td>
                )}
                {toggle.toggleColumns.number_rooms && (
                  <td className="table-td">{brokerChalets?.number_rooms}</td>
                )}
                {toggle.toggleColumns.Furnishing && (
                  <td className="table-td">{brokerChalets?.Furnishing}</td>
                )}
                {toggle.toggleColumns.Bathroom && (
                  <td className="table-td">{brokerChalets?.Bathroom}</td>
                )}
                {toggle.toggleColumns.Registration_code && (
                  <td className="table-td">
                    {brokerChalets?.Registration_code}
                  </td>
                )}
                {toggle.toggleColumns.name_OwnerChalet && (
                  <td className="table-td">
                    {brokerChalets?.name_OwnerChalet}
                  </td>
                )}
                {toggle.toggleColumns.phone_OwnerChalet && (
                  <td className="table-td">
                    <a
                      href={`tel:${brokerChalets?.phone_OwnerChalet}`}
                      className="phone"
                    >
                      {brokerChalets?.phone_OwnerChalet}
                    </a>
                  </td>
                )}
                {toggle.toggleColumns.email_OwnerChalet && (
                  <td className="table-td">
                    <a
                      href={`mailto:${brokerChalets?.email_OwnerChalet}`}
                      className="email"
                    >
                      {brokerChalets?.email_OwnerChalet}
                    </a>
                  </td>
                )}
                {toggle.toggleColumns.whatsapp_OwnerChalet && (
                  <td className="table-td">
                    <a
                      href={`mailto:${brokerChalets?.whatsapp_OwnerChalet}`}
                      className="email"
                    >
                      {brokerChalets?.whatsapp_OwnerChalet}
                    </a>
                  </td>
                )}
              </tr>
            </tbody>
          )}
          {searchResults.length > 0 &&
            error === null &&
            loading === false &&
            id === undefined && (
              <tbody>
                {searchResults?.map((result) => (
                  <tr key={result?.id + new Date().getDate()}>
                    {toggle.toggleColumns.image_array && (
                      <td className="table-td">
                        <img
                          src={result?.image_area?.split(",")[0]}
                          alt={result?.title}
                          className="table-img"
                          style={{
                            width: "50px",
                            height: "50px",
                          }}
                        />
                      </td>
                    )}
                    {toggle.toggleColumns.title && (
                      <td className="table-td name">{result?.title}</td>
                    )}
                    {toggle.toggleColumns.price && (
                      <td className="table-td">{result?.price}</td>
                    )}
                    {toggle.toggleColumns.name_area && (
                      <td className="table-td">{result?.name_area}</td>
                    )}
                    {toggle.toggleColumns.Property_type && (
                      <td className="table-td">{result?.Property_type}</td>
                    )}
                    {toggle.toggleColumns.Display_type && (
                      <td className="table-td">{result?.Display_type}</td>
                    )}
                    {toggle.toggleColumns.space && (
                      <td className="table-td">{result?.space}</td>
                    )}
                    {toggle.toggleColumns.number_rooms && (
                      <td className="table-td">{result?.number_rooms}</td>
                    )}
                    {toggle.toggleColumns.Furnishing && (
                      <td className="table-td">{result?.Furnishing}</td>
                    )}
                    {toggle.toggleColumns.Bathroom && (
                      <td className="table-td">{result?.Bathroom}</td>
                    )}
                    {toggle.toggleColumns.Registration_code && (
                      <td className="table-td">{result?.Registration_code}</td>
                    )}
                    {toggle.toggleColumns.name_OwnerChalet && (
                      <td className="table-td">{result?.name_OwnerChalet}</td>
                    )}
                    {toggle.toggleColumns.phone_OwnerChalet && (
                      <td className="table-td">
                        <a
                          href={`tel:${result?.phone_OwnerChalet}`}
                          className="phone"
                        >
                          {result?.phone_OwnerChalet}
                        </a>
                      </td>
                    )}
                    {toggle.toggleColumns.email_OwnerChalet && (
                      <td className="table-td">
                        <a
                          href={`mailto:${result?.email_OwnerChalet}`}
                          className="email"
                        >
                          {result?.email_OwnerChalet}
                        </a>
                      </td>
                    )}
                    {toggle.toggleColumns.whatsapp_OwnerChalet && (
                      <td className="table-td">
                        <a
                          href={`mailto:${result?.whatsapp_OwnerChalet}`}
                          className="email"
                        >
                          {result?.whatsapp_OwnerChalet}
                        </a>
                      </td>
                    )}
                    {toggle.toggleColumns.control && (
                      <td className="table-td">
                        <span className="table-btn-container">
                          <Link
                            to={`/chalets/edit-chalet/${result?.id}`}
                            className="edit-btn"
                          >
                            <FaPen className="edit-btn" />
                          </Link>
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
      {/* Pagination */}
      {searchResults.length > 0 && error === null && loading === false && (
        <PaginationUI />
      )}
    </div>
  );
};

export default Chalets;
