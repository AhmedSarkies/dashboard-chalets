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
  image_array: [],
  Image_OwnerChalet: {
    file: "",
    preview: "",
  },
  image_area: {
    file: "",
    preview: "",
  },
  title: "",
  price: "",
  description: "",
  name_OwnerChalet: "",
  phone_OwnerChalet: "",
  email_OwnerChalet: "",
  whatsapp_OwnerChalet: "",
  name_area: "",
  sub_description_area: "",
  Property_type: "",
  Display_type: "",
  space: "",
  number_rooms: "",
  Furnishing: "",
  Bathroom: "",
};

const AddChalet = () => {
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
      formik.setFieldValue("Image_OwnerChalet", {
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
      Image_OwnerChalet: {
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

  return (
    <div className="scholar-container mt-4 m-3">
      <div className="table-header d-flex justify-content-end">
        <h2>{t("chalets.addTitle")}</h2>
      </div>
      <div className="scholar">
        <form className="overlay-form" onSubmit={formik.handleSubmit}>
          <Row className="d-flex flex-row-reverse justify-content-end align-items-center p-3">
            <Col
              lg={12}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <div className="image-preview-container d-flex justify-content-center align-items-center">
                <label
                  htmlFor={
                    formik.values.Image_OwnerChalet.preview ? "" : "image"
                  }
                  className="form-label d-flex justify-content-center align-items-center"
                >
                  <img
                    src={
                      formik.values.image &&
                      formik.values.Image_OwnerChalet.preview
                        ? formik.values.Image_OwnerChalet.preview
                        : anonymous
                    }
                    alt="avatar"
                    className="image-preview"
                    onClick={() =>
                      formik.values.image &&
                      formik.values.Image_OwnerChalet.preview
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
                          formik.values.image &&
                          formik.values.Image_OwnerChalet.preview
                            ? formik.values.Image_OwnerChalet.preview
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
                <span className="error text-center">{formik.errors.image}</span>
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
      </div>
    </div>
  );
};

export default AddChalet;
