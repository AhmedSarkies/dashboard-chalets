import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";

import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { FaPen } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { IoMdClose } from "react-icons/io";

import anonymous from "../../assets/images/anonymous.png";

import {
  deleteChaletApi,
  getChalets,
  getChaletsApi,
  addChaletApi,
  updateChaletApi,
  deleteChalet,
  addChalet,
  updateChalet,
} from "../../store/slices/chaletSlice";

import { useFormik } from "formik";

import Swal from "sweetalert2";

import { toast } from "react-toastify";

import { useFiltration, useSchema } from "../../hooks";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
  price: "",
  description: "",
  image_array: [],
  Image_OwnerChalet: "",
  name_OwnerChalet: "",
  phone_OwnerChalet: "",
  email_OwnerChalet: "",
  whatsapp_OwnerChalet: "",
  name_area: "",
  image_area: {
    file: "",
    preview: "",
  },
  sub_description_area: "",
  Property_type: "",
  Display_type: "",
  space: "",
  number_rooms: "",
  Furnishing: "",
  Bathroom: "",
  image: {
    file: "",
    preview: "",
  },
};

const Chalets = ({ dashboard }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validationSchema } = useSchema();
  const fileRef = useRef();
  const { chalets, loading, error } = useSelector((state) => state.chalet);
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
      image: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      price: true,
      status: true,
      control: true,
    },
  });

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema.chalets,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("image_array", values.image_array);
      formData.append("Image_OwnerChalet", values.Image_OwnerChalet);
      formData.append("name_OwnerChalet", values.name_OwnerChalet);
      formData.append("phone_OwnerChalet", values.phone_OwnerChalet);
      formData.append("email_OwnerChalet", values.email_OwnerChalet);
      formData.append("whatsapp_OwnerChalet", values.whatsapp_OwnerChalet);
      formData.append("name_area", values.name_area);
      formData.append("image_area", values.image_area);
      formData.append("sub_description_area", values.sub_description_area);
      formData.append("Property_type", values.Property_type);
      formData.append("Display_type", values.Display_type);
      formData.append("space", values.space);
      formData.append("number_rooms", values.number_rooms);
      formData.append("Furnishing", values.Furnishing);
      formData.append("Bathroom", values.Bathroom);
      // Edit Chalet
      if (toggle.edit && formik.values.id) {
        dispatch(updateChaletApi(formik.values.id, formData)).then((res) => {
          if (!res.error) {
            dispatch(updateChalet(res.payload));
            toast.success(t("toast.chalets.updatedSuccess"));
          } else {
            toast.error(t("toast.chalets.updatedError"));
          }
        });
      } else {
        // Add Chalet
        dispatch(addChaletApi(formData)).then((res) => {
          if (!res.error) {
            dispatch(addChalet(res.payload));
            toast.success(t("toast.chalets.addedSuccess"));
          } else {
            toast.error(t("toast.chalets.addedError"));
          }
        });
      }
    },
  });

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image", {
        file: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // handle array image using foreach
  const handleArrayImage = (e) => {
    const files = e.currentTarget.files;
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          formik.setFieldValue("image_array", [
            ...formik.values.image_array,
            {
              file: file,
              preview: reader.result,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle Delete Image
  const handleDeleteImage = () => {
    fileRef.current.value = "";
    fileRef.current.files = null;
    formik.setValues({
      ...formik.values,
      image_area: {
        file: "",
        preview: "",
      },
    });
    setToggle({
      ...toggle,
      imagePreview: false,
    });
  };

  // handle Input Using Formik
  const handleInput = (e) => {
    formik.handleChange(e);
  };

  // Handle Edit Scholar
  const handleEdit = (scholar) => {
    formik.setValues(scholar);
  };

  // Delete Scholar
  const handleDelete = (chalets) => {
    Swal.fire({
      title: t("titleDeleteAlert") + chalets?.name + "?",
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
    { id: 1, name: "image", label: t("chalets.columns.image") },
    { id: 2, name: "name", label: t("chalets.columns.name") },
    { id: 3, name: "email", label: t("chalets.columns.email") },
    { id: 4, name: "phone", label: t("chalets.columns.phone") },
    { id: 5, name: "address", label: t("chalets.columns.address") },
    { id: 6, name: "price", label: t("chalets.columns.price") },
    { id: 7, name: "status", label: t("status") },
    { id: 8, name: "control", label: t("action") },
  ];
  const {
    PaginationUI,
    handleSort,
    handleSearch,
    handleToggleColumns,
    results,
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
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div className="scholar-container mt-4 m-3">
      <div className="table-header">
        {/* <button
          className="add-btn"
          onClick={() =>
            setToggle({
              ...toggle,
              add: !toggle.add,
            })
          }
        >
          <MdAdd />
          {t("chalets.addTitle")}
        </button> */}
        <Link className="add-btn" to="add-chalet">
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
              {/* Show and Hide Columns */}
              {toggle.toggleColumns.image && (
                <th className="table-th" onClick={() => handleSort(columns[0])}>
                  {t("chalets.columns.image")}
                  {toggle.sortColumn === columns[0].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.name && (
                <th className="table-th" onClick={() => handleSort(columns[1])}>
                  {t("chalets.columns.name")}
                  {toggle.sortColumn === columns[1].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.email && (
                <th className="table-th" onClick={() => handleSort(columns[2])}>
                  {t("chalets.columns.email")}
                  {toggle.sortColumn === columns[2].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.phone && (
                <th className="table-th" onClick={() => handleSort(columns[3])}>
                  {t("chalets.columns.phone")}
                  {toggle.sortColumn === columns[3].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.address && (
                <th className="table-th" onClick={() => handleSort(columns[4])}>
                  {t("chalets.columns.address")}
                  {toggle.sortColumn === columns[4].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.price && (
                <th className="table-th" onClick={() => handleSort(columns[5])}>
                  {t("chalets.columns.price")}
                  {toggle.sortColumn === columns[5].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.status && (
                <th className="table-th" onClick={() => handleSort(columns[6])}>
                  {t("status")}
                  {toggle.sortColumn === columns[6].name ? (
                    toggle.sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : null}
                </th>
              )}
              {toggle.toggleColumns.control && (
                <th className="table-th" onClick={() => handleSort(columns[7])}>
                  {t("action")}
                  {toggle.sortColumn === columns[7].name ? (
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
                <td className="table-td" colSpan="8">
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
                <td className="table-td" colSpan="8">
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
          {results.length === 0 && error === null && !loading && (
            <tbody>
              <tr className="no-data-container">
                <td className="table-td" colSpan="8">
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
                <td className="table-td" colSpan="8">
                  <p className="no-data no-columns mb-0">{t("noColumns")}</p>
                </td>
              </tr>
            </tbody>
          )}
          {/* Data */}
          {results.length > 0 && error === null && loading === false && (
            <tbody>
              {results?.map((result) => (
                <tr key={result?.id + new Date().getDate()}>
                  {toggle.toggleColumns.image && (
                    <td className="table-td">
                      <img
                        src={result?.image === "" ? anonymous : result?.image}
                        alt="scholar"
                        className="scholar-img"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                  )}
                  {toggle.toggleColumns.name && (
                    <td className="table-td name">{result?.name}</td>
                  )}
                  {toggle.toggleColumns.email && (
                    <td className="table-td">
                      <a
                        className="text-white"
                        href={`mailto:${result?.email}`}
                      >
                        {result?.email}
                      </a>
                    </td>
                  )}
                  {toggle.toggleColumns.phone && (
                    <td className="table-td">
                      <a className="text-white" href={`tel:${result?.phone}`}>
                        {result?.phone}
                      </a>
                    </td>
                  )}
                  {toggle.toggleColumns.address && (
                    <td className="table-td">{result?.address}</td>
                  )}
                  {toggle.toggleColumns.price && (
                    <td className="table-td">{result?.price}</td>
                  )}
                  {toggle.toggleColumns.status && (
                    <td className="table-td">
                      <span
                        className="table-status badge"
                        style={{
                          backgroundColor:
                            result?.status === "Approve"
                              ? "green"
                              : result?.status === "Pending"
                              ? "red"
                              : "red",
                        }}
                      >
                        {result?.status === "Approve"
                          ? t("approve")
                          : result?.status === "Pending"
                          ? t("pending")
                          : t("pending")}
                      </span>
                    </td>
                  )}
                  {toggle.toggleColumns.control && (
                    <td className="table-td">
                      <span className="table-btn-container">
                        <FaPen
                          className="edit-btn"
                          onClick={() => {
                            handleEdit(result);
                            setToggle({
                              ...toggle,
                              edit: !toggle.edit,
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
      {/* Add Chalets */}
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
          {t("chalets.addTitle")}
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
            <Row className="d-flex flex-row-reverse justify-content-end align-items-center p-3">
              <Col
                lg={12}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <div className="image-preview-container d-flex justify-content-center align-items-center">
                  <label
                    htmlFor={formik.values.image.preview ? "" : "image"}
                    className="form-label d-flex justify-content-center align-items-center"
                  >
                    <img
                      src={
                        formik.values.image && formik.values.image.preview
                          ? formik.values.image.preview
                          : anonymous
                      }
                      alt="avatar"
                      className="image-preview"
                      onClick={() =>
                        formik.values.image && formik.values.image.preview
                          ? setToggle({
                              ...toggle,
                              imagePreview: !toggle.imagePreview,
                            })
                          : ""
                      }
                    />
                    <Modal
                      isOpen={toggle.imagePreview}
                      toggle={() =>
                        setToggle({
                          ...toggle,
                          imagePreview: !toggle.imagePreview,
                        })
                      }
                      centered={true}
                      keyboard={true}
                      size={"md"}
                      contentClassName="modal-preview-image modal-add-scholar"
                    >
                      <ModalHeader
                        toggle={() =>
                          setToggle({
                            ...toggle,
                            imagePreview: !toggle.imagePreview,
                          })
                        }
                      >
                        <IoMdClose
                          onClick={() =>
                            setToggle({
                              ...toggle,
                              imagePreview: !toggle.imagePreview,
                            })
                          }
                        />
                      </ModalHeader>
                      <ModalBody className="d-flex flex-wrap justify-content-center align-items-center">
                        <img
                          src={
                            formik.values.image && formik.values.image.preview
                              ? formik.values.image.preview
                              : anonymous
                          }
                          alt="avatar"
                          className="image-preview"
                        />
                      </ModalBody>
                      <ModalFooter className="p-md-4 p-2">
                        <div className="form-group-container d-flex justify-content-center align-items-center">
                          <button
                            className="delete-btn cancel-btn"
                            onClick={handleDeleteImage}
                          >
                            {t("delete")}
                          </button>
                        </div>
                      </ModalFooter>
                    </Modal>
                  </label>
                </div>
                <div className="form-group-container d-flex justify-content-lg-start justify-content-center flex-row-reverse">
                  <label htmlFor="image" className="form-label">
                    <ImUpload /> {t("chooseImage")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-input form-img-input"
                    id="image"
                    ref={fileRef}
                    onChange={handleImageChange}
                  />
                </div>
                {formik.errors.image && formik.touched.image ? (
                  <span className="error text-center">
                    {formik.errors.image}
                  </span>
                ) : null}
              </Col>
            </Row>
            <Row className="d-flex flex-row-reverse justify-content-end align-items-center p-3">
              <Col lg={6}>
                <div
                  className="form-group-container d-flex flex-column align-items-end mb-3"
                  style={{ marginTop: "-4px" }}
                >
                  <label htmlFor="title" className="form-label">
                    {t("chalets.columns.title")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="title"
                    placeholder={t("chalets.columns.title")}
                    name="title"
                    value={formik.values.title}
                    onChange={handleInput}
                  />
                  {formik.errors.title && formik.touched.title ? (
                    <span className="error">{formik.errors.title}</span>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group-container d-flex flex-column align-items-end mb-3">
                  <label htmlFor="price" className="form-label">
                    {t("chalets.columns.price")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="price"
                    placeholder={t("chalets.columns.price")}
                    name="price"
                    value={formik.values.price}
                    onChange={handleInput}
                  />
                  {formik.errors.price && formik.touched.price ? (
                    <span className="error">{formik.errors.price}</span>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group-container d-flex flex-column align-items-end mb-3">
                  <label htmlFor="description" className="form-label">
                    {t("chalets.columns.description")}
                  </label>
                  <textarea
                    className="form-input"
                    id="description"
                    placeholder={t("chalets.columns.description")}
                    name="description"
                    value={formik.values.description}
                    onChange={handleInput}
                  />
                  {formik.errors.description && formik.touched.description ? (
                    <span className="error">{formik.errors.description}</span>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group-container d-flex flex-column align-items-end mb-3">
                  <label htmlFor="image_array" className="form-label">
                    {t("chalets.columns.imageArray")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-input"
                    id="image_array"
                    multiple
                    onChange={handleArrayImage}
                  />
                  {formik.errors.image_array && formik.touched.image_array ? (
                    <span className="error">{formik.errors.image_array}</span>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row className="d-flex flex-row-reverse justify-content-end align-items-center p-3">
              <Col lg={6}>
                <div className="form-group-container d-flex flex-column justify-content-center align-items-end mb-3">
                  <label htmlFor="status" className="form-label">
                    {t("status")}
                  </label>
                  <div className="dropdown form-input">
                    <button
                      type="button"
                      onClick={() => {
                        setToggle({
                          ...toggle,
                          status: !toggle.status,
                        });
                      }}
                      className="dropdown-btn d-flex justify-content-between align-items-center"
                    >
                      {formik.values.status === "Pending"
                        ? t("pending")
                        : formik.values.status === "Approve"
                        ? t("approve")
                        : t("status")}
                      <TiArrowSortedUp
                        className={`dropdown-icon ${
                          toggle.status ? "active" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`dropdown-content ${
                        toggle.status ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`item ${
                          formik.values.status === "Pending" ? "active" : ""
                        }`}
                        value="Pending"
                        name="status"
                        onClick={(e) => {
                          setToggle({
                            ...toggle,
                            status: !toggle.status,
                          });
                          formik.setFieldValue("status", "Pending");
                        }}
                      >
                        {t("pending")}
                      </button>
                      <button
                        type="button"
                        className={`item ${
                          formik.values.status === "Approve" ? "active" : ""
                        }`}
                        value="Approve"
                        name="status"
                        onClick={(e) => {
                          setToggle({
                            ...toggle,
                            status: !toggle.status,
                          });
                          formik.setFieldValue("status", "Approve");
                        }}
                      >
                        {t("approve")}
                      </button>
                    </div>
                  </div>
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
      {/* Edit Chalets */}
      <Modal
        isOpen={toggle.edit}
        toggle={() => {
          formik.handleReset();
          setToggle({
            ...toggle,
            edit: !toggle.edit,
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
              edit: !toggle.edit,
            });
          }}
        >
          {t("chalets.editTitle")}
          <IoMdClose
            onClick={() => {
              formik.handleReset();
              setToggle({
                ...toggle,
                edit: !toggle.edit,
              });
            }}
          />
        </ModalHeader>
        <ModalBody>
          <form className="overlay-form" onSubmit={formik.handleSubmit}>
            <Row className="d-flex justify-content-end align-items-center p-3 pb-lg-2 pb-0">
              <Col
                lg={5}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <div className="image-preview-container d-flex justify-content-center align-items-center">
                  <label
                    htmlFor={
                      formik.values?.image
                        ? formik.values?.image.file === ""
                          ? "image"
                          : ""
                        : "image"
                    }
                    className="form-label d-flex justify-content-center align-items-center"
                  >
                    <img
                      src={
                        formik.values?.image.file === undefined
                          ? formik.values?.image
                          : formik.values?.image.file === ""
                          ? anonymous
                          : formik.values?.image.preview
                      }
                      alt="avatar"
                      className="image-preview"
                      onClick={() =>
                        formik.values?.image && formik.values?.image.file === ""
                          ? ""
                          : setToggle({
                              ...toggle,
                              imagePreview: !toggle.imagePreview,
                            })
                      }
                    />
                    <Modal
                      isOpen={toggle.imagePreview}
                      toggle={() =>
                        setToggle({
                          ...toggle,
                          imagePreview: !toggle.imagePreview,
                        })
                      }
                      centered={true}
                      keyboard={true}
                      size={"md"}
                      contentClassName="modal-preview-image modal-add-scholar"
                    >
                      <ModalHeader
                        toggle={() =>
                          setToggle({
                            ...toggle,
                            imagePreview: !toggle.imagePreview,
                          })
                        }
                      >
                        <IoMdClose
                          onClick={() =>
                            setToggle({
                              ...toggle,
                              imagePreview: !toggle.imagePreview,
                            })
                          }
                        />
                      </ModalHeader>
                      <ModalBody className="d-flex flex-wrap justify-content-center align-items-center">
                        <img
                          src={
                            formik.values?.image.file
                              ? formik.values?.image.preview
                              : formik.values?.image
                          }
                          alt="avatar"
                          className="image-preview"
                        />
                      </ModalBody>
                      <ModalFooter className="p-md-4 p-2">
                        <div className="form-group-container d-flex justify-content-center align-items-center">
                          <button
                            className="delete-btn cancel-btn"
                            onClick={handleDeleteImage}
                          >
                            {t("delete")}
                          </button>
                        </div>
                      </ModalFooter>
                    </Modal>
                  </label>
                </div>
                <div className="form-group-container d-flex justify-content-lg-start justify-content-center flex-row-reverse">
                  <label htmlFor="image" className="form-label">
                    <ImUpload /> {t("chooseImage")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-input form-img-input"
                    id="image"
                    ref={fileRef}
                    onChange={handleImageChange}
                  />
                </div>
                {formik.values?.image?.file ? (
                  formik.errors.image && formik.touched.image ? (
                    <span className="error">{formik.errors.image}</span>
                  ) : (
                    formik.values.image.file === undefined &&
                    formik.values?.image.includes("https")
                  )
                ) : null}
              </Col>
              <Col lg={7} className="mb-5">
                <div
                  className="form-group-container d-flex flex-column align-items-end mb-3"
                  style={{ marginTop: "-4px" }}
                >
                  <label htmlFor="name" className="form-label">
                    {t("chalets.columns.name")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="name"
                    placeholder={t("chalets.columns.name")}
                    name="name"
                    value={formik.values?.name}
                    onChange={handleInput}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <span className="error">{formik.errors.name}</span>
                  ) : null}
                </div>
                <div className="form-group-container d-flex flex-column align-items-end mb-3">
                  <label htmlFor="email" className="form-label">
                    {t("chalets.columns.email")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="email"
                    placeholder={t("chalets.columns.email")}
                    name="email"
                    value={formik.values?.email}
                    onChange={handleInput}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <span className="error">{formik.errors.email}</span>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row className="d-flex flex-row-reverse justify-content-end align-items-center p-3 pt-lg-2 pt-0">
              <Col lg={6}>
                <div className="form-group-container d-flex flex-column align-items-end mb-3">
                  <label htmlFor="phone" className="form-label">
                    {t("chalets.columns.phone")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="phone"
                    placeholder={t("chalets.columns.phone")}
                    name="phone"
                    value={formik.values?.phone}
                    onChange={handleInput}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <span className="error">{formik.errors.phone}</span>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group-container d-flex flex-column align-items-end mb-3">
                  <label htmlFor="address" className="form-label">
                    {t("chalets.columns.address")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="address"
                    placeholder={t("chalets.columns.address")}
                    name="address"
                    value={formik.values?.address}
                    onChange={handleInput}
                  />
                  {formik.errors.address && formik.touched.address ? (
                    <span className="error">{formik.errors.address}</span>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group-container d-flex flex-column align-items-end mb-3">
                  <label htmlFor="price" className="form-label">
                    {t("chalets.columns.price")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="price"
                    placeholder={t("chalets.columns.price")}
                    name="price"
                    value={formik.values?.price}
                    onChange={handleInput}
                  />
                  {formik.errors.price && formik.touched.price ? (
                    <span className="error">{formik.errors.price}</span>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group-container d-flex flex-column justify-content-center align-items-end">
                  <label htmlFor="status" className="form-label">
                    {t("status")}
                  </label>
                  <div className="dropdown form-input">
                    <button
                      type="button"
                      onClick={() => {
                        setToggle({
                          ...toggle,
                          status: !toggle.status,
                        });
                      }}
                      className="dropdown-btn d-flex justify-content-between align-items-center"
                    >
                      {formik.values?.status === "Pending"
                        ? t("pending")
                        : formik.values?.status === "Approve"
                        ? t("approve")
                        : t("status")}
                      <TiArrowSortedUp
                        className={`dropdown-icon ${
                          toggle.status ? "active" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`dropdown-content ${
                        toggle.status ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`item ${
                          formik.values?.status === "Pending" ? "active" : ""
                        }`}
                        value="Pending"
                        name="status"
                        onClick={() => {
                          setToggle({
                            ...toggle,
                            status: !toggle.status,
                          });
                          formik.setFieldValue("status", "Pending");
                        }}
                      >
                        {t("pending")}
                      </button>
                      <button
                        type="button"
                        className={`item ${
                          formik.values?.status === "Approve" ? "active" : ""
                        }`}
                        value="Approve"
                        name="status"
                        onClick={() => {
                          setToggle({
                            ...toggle,
                            status: !toggle.status,
                          });
                          formik.setFieldValue("status", "Approve");
                        }}
                      >
                        {t("approve")}
                      </button>
                    </div>
                  </div>
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
                      t("save")
                    )}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setToggle({
                        ...toggle,
                        edit: !toggle.edit,
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
      {results.length > 0 && error === null && loading === false && (
        <PaginationUI />
      )}
    </div>
  );
};

export default Chalets;
