import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { TiDelete } from "react-icons/ti";
import anonymous from "../../assets/images/anonymous.png";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useSchema } from "../../hooks";
import {
  addChaletApi,
  getChaletByIdApi,
  updateChaletApi,
} from "../../store/slices/chaletSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addBrokerChaletApi } from "../../store/slices/brokerSlice";

const initialValues = {
  title: "",
  price: "",
  description: "",
  image_array: [],
  Image_OwnerChalet: {
    file: "",
    preview: "",
  },
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
  tag_name: [],
  from_day: "",
  To_day: "",
};

const AddChalet = () => {
  const { t } = useTranslation();
  const imageOwnerChaletRef = useRef();
  const imageAreaRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const registrationCode = useParams().registrationCode;
  const { validationSchema } = useSchema();
  const { loading } = useSelector((state) => state.chalet);
  const [toggle, setToggle] = useState({
    add: false,
    edit: false,
    imagePreview: false,
    images: [],
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

  // // Date Difference Function
  // const dateDifference = (date1, date2) => {
  //   const date1Obj = new Date(date1);
  //   const date2Obj = new Date(date2);
  //   const diffTime = Math.abs(date2Obj - date1Obj);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   return diffDays;
  // };

  // Create Array of dates between two dates and the month is Arabic Format For Example 1/يناير  Function
  const getDates = (startDate, stopDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);
    const stop = new Date(stopDate);
    while (currentDate <= stop) {
      const month = currentDate.toLocaleString("ar-EG", {
        month: "long",
      });
      dateArray.push(`${currentDate.getDate()}/${month}`);
      // dateArray.push({
      //   day: currentDate.getDate(),
      //   month,
      // });
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return dateArray;
  };

  // On Submit Form Function
  const onSubmit = (values) => {
    const formData = {
      title: values.title,
      price: values.price,
      description: values.description,
      name_OwnerChalet: values.name_OwnerChalet,
      phone_OwnerChalet: values.phone_OwnerChalet,
      email_OwnerChalet: values.email_OwnerChalet,
      whatsapp_OwnerChalet: values.whatsapp_OwnerChalet,
      name_area: values.name_area,
      sub_description_area: values.sub_description_area,
      Property_type: values.Property_type,
      Display_type: values.Display_type,
      space: values.space,
      number_rooms: values.number_rooms,
      Furnishing: values.Furnishing,
      Bathroom: values.Bathroom,
      from_day: getDates(values.from_day, values.To_day),
      To_day: getDates(values.from_day, values.To_day),
      image_array: toggle?.images?.map((image) => image.file),
      Image_OwnerChalet: values.Image_OwnerChalet.file,
      image_area: values.image_area.file,
      tag_name: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    };
    if (id) {
      dispatch(
        updateChaletApi({
          ...formData,
          id,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          formik.handleReset();
          navigate("/chalets/chalets");
          toast.success(t("toast.chalets.updatedSuccess"));
        } else {
          toast.error(t("toast.chalets.updatedError"));
        }
      });
    } else if (registrationCode) {
      dispatch(
        addBrokerChaletApi({
          ...formData,
          Registration_code: registrationCode,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          formik.handleReset();
          navigate("/chalets/chalets");
          toast.success(t("toast.chalets.updatedSuccess"));
        } else {
          toast.error(t("toast.chalets.updatedError"));
        }
      });
    } else {
      dispatch(addChaletApi(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          formik.handleReset();
          navigate("/chalets/chalets");
          toast.success(t("toast.chalets.addedSuccess"));
        } else {
          toast.error(t("toast.chalets.addedError"));
        }
      });
    }
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: id
      ? validationSchema.updateChalet
      : validationSchema.chalets,
    onSubmit,
  });

  // Handle Image Change Image Owner Chalet
  const handleImageChangeImageOwnerChalet = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("Image_OwnerChalet", {
        file: file,
        preview: URL.createObjectURL(file),
      });
    }
  };
  // Handle Delete Image Owner Chalet
  const handleDeleteImageOwnerChalet = () => {
    imageOwnerChaletRef.current.value = "";
    imageOwnerChaletRef.current.files = null;
    formik.setFieldValue("Image_OwnerChalet", {
      file: "",
      preview: "",
    });
  };

  // Handle Change Image Area
  const handleImageChangeImageArea = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image_area", {
        file: file,
        preview: URL.createObjectURL(file),
      });
    }
  };
  // Handle Delete Image Area
  const handleDeleteImageArea = () => {
    imageAreaRef.current.value = "";
    imageAreaRef.current.files = null;
    formik.setFieldValue("image_area", {
      file: "",
      preview: "",
    });
  };

  // handle array image using foreach
  const handleArrayImage = (e) => {
    const files = e.currentTarget.files;
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setToggle({
            ...toggle,
            images: [
              ...toggle.images,
              {
                file: file,
                preview: reader.result,
              },
            ],
          });
          formik.setFieldValue("image_array", [
            ...toggle.images,
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

  // Delete Image Array
  const handleDeleteImageArray = (image) => {
    setToggle({
      ...toggle,
      images: toggle.images.filter((img) => img !== image),
    });
    formik.setValues({
      ...formik.values,
      image_array: toggle.images.filter((img) => img !== image),
    });
  };

  // handle Input Using Formik
  const handleInput = (e) => {
    formik.handleChange(e);
  };

  // const [tag_name, setTag_name] = useState([]);
  // const [days, setDays] = useState([]);

  // const addTag = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     if (e.target.value.length > 0) {
  //       setTag_name([...tag_name, e.target.value]);
  //     }
  //   }
  // };
  // const removeTag = (removedTag) => {
  //   const newTags = formik.values.tag_name.filter((tag) => tag !== removedTag);
  //   formik.setFieldValue("tag_name", newTags);
  // };
  // const addDays = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     if (e.target.value.length > 0) {
  //       setDays([...days, e.target.value]);
  //     }
  //     e.target.value = "";
  //   }
  // };
  // const removeDay = (removedDay) => {
  //   const newDays = formik.values.days.filter((day) => day !== removedDay);
  //   setDays(newDays);
  // };

  useEffect(() => {
    if (id) {
      try {
        dispatch(getChaletByIdApi(id)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            const chalet = res.payload;
            formik.setValues({
              title: chalet.title,
              price: chalet.price,
              description: chalet.description,
              name_OwnerChalet: chalet.name_OwnerChalet,
              phone_OwnerChalet: chalet.phone_OwnerChalet,
              email_OwnerChalet: chalet.email_OwnerChalet,
              whatsapp_OwnerChalet: chalet.whatsapp_OwnerChalet,
              name_area: chalet.name_area,
              sub_description_area: chalet.sub_description_area,
              Property_type: chalet.Property_type,
              Display_type: chalet.Display_type,
              space: chalet.space,
              number_rooms: chalet.number_rooms,
              Furnishing: chalet.Furnishing,
              Bathroom: chalet.Bathroom,
              tag_name: chalet.tag_name,
              days: chalet.days,
              image_array: chalet.image_array,
              Image_OwnerChalet: {
                file: chalet.Image_OwnerChalet,
                preview: chalet.Image_OwnerChalet,
              },
              image_area: {
                file: chalet.image_area,
                preview: chalet.image_area,
              },
              id: chalet?.id,
              Registration_code: chalet?.Registration_code,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  return (
    <div className="scholar-container mt-4 m-3">
      <div className="table-header d-flex justify-content-end">
        <h2>{id ? t("chalets.editTitle") : t("chalets.addTitle")}</h2>
      </div>
      {/* <div className="scholar"> */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ marginBottom: "2rem" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <form className="overlay-form" onSubmit={formik.handleSubmit}>
          {/* Images Array */}
          <Row
            className="d-flex flex-row-reverse justify-content-start align-items-center p-3 m-2 mb-3"
            style={{
              border: "1px solid var(--main-color)",
              borderRadius: "10px",
            }}
          >
            <Col
              lg={12}
              className="d-flex flex-column justify-content-center align-items-center gap-3"
            >
              <div className="form-group-container d-flex flex-column align-items-end">
                <label
                  htmlFor="image_array"
                  className="form-label images-array-label"
                >
                  {id
                    ? t("editChalet.columns.image_array")
                    : t("addChalet.columns.image_array")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input d-none"
                  id="image_array"
                  multiple
                  onChange={handleArrayImage}
                />
                {formik.errors.image_array && formik.touched.image_array ? (
                  <span className="error w-100 text-center">
                    {formik.errors.image_array}
                  </span>
                ) : null}
              </div>
              {toggle.images.length > 0 ? (
                <div className="form-group-container d-flex flex-column align-items-end mb-3 gap-3">
                  <div className="image-array-container d-flex flex-wrap justify-content-center align-items-center gap-3">
                    {toggle.images.map((image, index) => (
                      <div
                        key={index}
                        className="image-preview-container d-flex justify-content-center align-items-center"
                      >
                        <img
                          src={image.preview}
                          alt="avatar"
                          className="image-preview"
                          style={{
                            borderRadius: "10px",
                            cursor: "default",
                          }}
                        />
                        <TiDelete
                          className="delete-icon"
                          onClick={() => handleDeleteImageArray(image)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {id ? (
                <div className="form-group-container d-flex flex-column align-items-end mb-3 gap-3">
                  <div className="image-array-container d-flex flex-wrap justify-content-center align-items-center gap-3">
                    {formik.values?.image_array?.map((image, index) => (
                      <div
                        key={index}
                        className="image-preview-container d-flex justify-content-center align-items-center"
                      >
                        <img
                          src={image}
                          alt="avatar"
                          className="image-preview"
                          style={{
                            borderRadius: "10px",
                            cursor: "default",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-lg-start justify-content-center align-items-center p-3 pt-0 pb-0">
            {/* Image_OwnerChalet */}
            <Col sm={6} className="d-sm-block d-flex justify-content-center">
              <div className="form-group-container d-flex flex-column align-items-end mb-3 gap-3">
                <label htmlFor="Image_OwnerChalet" className="form-label">
                  {t("addChalet.columns.Image_OwnerChalet")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input d-none"
                  id="Image_OwnerChalet"
                  ref={imageOwnerChaletRef}
                  onChange={handleImageChangeImageOwnerChalet}
                />
                <div className="image-preview-container d-flex justify-content-center align-items-center">
                  <img
                    src={
                      formik.values.Image_OwnerChalet.preview
                        ? formik.values.Image_OwnerChalet.preview
                        : anonymous
                    }
                    alt="avatar"
                    className="image-preview"
                    style={{
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => imageOwnerChaletRef.current.click()}
                  />
                  {formik.values.Image_OwnerChalet.preview ? (
                    <TiDelete
                      className="delete-icon"
                      onClick={handleDeleteImageOwnerChalet}
                    />
                  ) : null}
                </div>
                {formik.errors.Image_OwnerChalet &&
                formik.touched.Image_OwnerChalet ? (
                  <span className="error">
                    {formik.errors.Image_OwnerChalet}
                  </span>
                ) : null}
              </div>
            </Col>
            {/* image_area */}
            <Col sm={6} className="d-sm-block d-flex justify-content-center">
              <div className="form-group-container d-flex flex-column align-items-end mb-3 gap-3">
                <label htmlFor="image_area" className="form-label">
                  {t("addChalet.columns.image_area")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input d-none"
                  id="image_area"
                  ref={imageAreaRef}
                  onChange={handleImageChangeImageArea}
                />
                <div className="image-preview-container d-flex justify-content-center align-items-center">
                  <img
                    src={
                      formik.values.image_area.preview
                        ? formik.values.image_area.preview
                        : anonymous
                    }
                    alt="avatar"
                    className="image-preview"
                    style={{
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => imageAreaRef.current.click()}
                  />
                  {formik.values.image_area.preview ? (
                    <TiDelete
                      className="delete-icon"
                      onClick={handleDeleteImageArea}
                    />
                  ) : null}
                </div>
                {formik.errors.image_area && formik.touched.image_area ? (
                  <span className="error">{formik.errors.image_area}</span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="title" className="form-label">
                  {t("addChalet.columns.title")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="title"
                  placeholder={t("addChalet.columns.title")}
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
                  {t("addChalet.columns.price")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="price"
                  placeholder={t("addChalet.columns.price")}
                  name="price"
                  value={formik.values.price}
                  onChange={handleInput}
                />
                {formik.errors.price && formik.touched.price ? (
                  <span className="error">{formik.errors.price}</span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
            <Col lg={12}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="description" className="form-label">
                  {t("addChalet.columns.description")}
                </label>
                <textarea
                  type="text"
                  className="form-input"
                  id="description"
                  placeholder={t("addChalet.columns.description")}
                  name="description"
                  value={formik.values.description}
                  onChange={handleInput}
                />
                {formik.errors.description && formik.touched.description ? (
                  <span className="error">{formik.errors.description}</span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="name_OwnerChalet" className="form-label">
                  {t("addChalet.columns.name_OwnerChalet")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="name_OwnerChalet"
                  placeholder={t("addChalet.columns.name_OwnerChalet")}
                  name="name_OwnerChalet"
                  value={formik.values.name_OwnerChalet}
                  onChange={handleInput}
                />
                {formik.errors.name_OwnerChalet &&
                formik.touched.name_OwnerChalet ? (
                  <span className="error">
                    {formik.errors.name_OwnerChalet}
                  </span>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="phone_OwnerChalet" className="form-label">
                  {t("addChalet.columns.phone_OwnerChalet")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="phone_OwnerChalet"
                  placeholder={t("addChalet.columns.phone_OwnerChalet")}
                  name="phone_OwnerChalet"
                  value={formik.values.phone_OwnerChalet}
                  onChange={handleInput}
                />
                {formik.errors.phone_OwnerChalet &&
                formik.touched.phone_OwnerChalet ? (
                  <span className="error">
                    {formik.errors.phone_OwnerChalet}
                  </span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="email_OwnerChalet" className="form-label">
                  {t("addChalet.columns.email_OwnerChalet")}
                </label>
                <input
                  type="email"
                  className="form-input"
                  id="email_OwnerChalet"
                  placeholder={t("addChalet.columns.email_OwnerChalet")}
                  name="email_OwnerChalet"
                  value={formik.values.email_OwnerChalet}
                  onChange={handleInput}
                />
                {formik.errors.email_OwnerChalet &&
                formik.touched.email_OwnerChalet ? (
                  <span className="error">
                    {formik.errors.email_OwnerChalet}
                  </span>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="whatsapp_OwnerChalet" className="form-label">
                  {t("addChalet.columns.whatsapp_OwnerChalet")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="whatsapp_OwnerChalet"
                  placeholder={t("addChalet.columns.whatsapp_OwnerChalet")}
                  name="whatsapp_OwnerChalet"
                  value={formik.values.whatsapp_OwnerChalet}
                  onChange={handleInput}
                />
                {formik.errors.whatsapp_OwnerChalet &&
                formik.touched.whatsapp_OwnerChalet ? (
                  <span className="error">
                    {formik.errors.whatsapp_OwnerChalet}
                  </span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="name_area" className="form-label">
                  {t("addChalet.columns.name_area")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="name_area"
                  placeholder={t("addChalet.columns.name_area")}
                  name="name_area"
                  value={formik.values.name_area}
                  onChange={handleInput}
                />
                {formik.errors.name_area && formik.touched.name_area ? (
                  <span className="error">{formik.errors.name_area}</span>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="sub_description_area" className="form-label">
                  {t("addChalet.columns.sub_description_area")}
                </label>
                <textarea
                  type="text"
                  className="form-input"
                  id="sub_description_area"
                  placeholder={t("addChalet.columns.sub_description_area")}
                  name="sub_description_area"
                  value={formik.values.sub_description_area}
                  onChange={handleInput}
                />
                {formik.errors.sub_description_area &&
                formik.touched.sub_description_area ? (
                  <span className="error">
                    {formik.errors.sub_description_area}
                  </span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="Property_type" className="form-label">
                  {t("addChalet.columns.Property_type")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="Property_type"
                  placeholder={t("addChalet.columns.Property_type")}
                  name="Property_type"
                  value={formik.values.Property_type}
                  onChange={handleInput}
                />
                {formik.errors.Property_type && formik.touched.Property_type ? (
                  <span className="error">{formik.errors.Property_type}</span>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="Display_type" className="form-label">
                  {t("addChalet.columns.Display_type")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="Display_type"
                  placeholder={t("addChalet.columns.Display_type")}
                  name="Display_type"
                  value={formik.values.Display_type}
                  onChange={handleInput}
                />
                {formik.errors.Display_type && formik.touched.Display_type ? (
                  <span className="error">{formik.errors.Display_type}</span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="space" className="form-label">
                  {t("addChalet.columns.space")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="space"
                  placeholder={t("addChalet.columns.space")}
                  name="space"
                  value={formik.values.space}
                  onChange={handleInput}
                />
                {formik.errors.space && formik.touched.space ? (
                  <span className="error">{formik.errors.space}</span>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="number_rooms" className="form-label">
                  {t("addChalet.columns.number_rooms")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="number_rooms"
                  placeholder={t("addChalet.columns.number_rooms")}
                  name="number_rooms"
                  value={formik.values.number_rooms}
                  onChange={handleInput}
                />
                {formik.errors.number_rooms && formik.touched.number_rooms ? (
                  <span className="error">{formik.errors.number_rooms}</span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="Furnishing" className="form-label">
                  {t("addChalet.columns.Furnishing")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="Furnishing"
                  placeholder={t("addChalet.columns.Furnishing")}
                  name="Furnishing"
                  value={formik.values.Furnishing}
                  onChange={handleInput}
                />
                {formik.errors.Furnishing && formik.touched.Furnishing ? (
                  <span className="error">{formik.errors.Furnishing}</span>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="Bathroom" className="form-label">
                  {t("addChalet.columns.Bathroom")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="Bathroom"
                  placeholder={t("addChalet.columns.Bathroom")}
                  name="Bathroom"
                  value={formik.values.Bathroom}
                  onChange={handleInput}
                />
                {formik.errors.Bathroom && formik.touched.Bathroom ? (
                  <span className="error">{formik.errors.Bathroom}</span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="from_day" className="form-label">
                  {t("addChalet.columns.from_day")}
                </label>
                <input
                  type="date"
                  className="form-input"
                  id="from_day"
                  placeholder={t("addChalet.columns.from_day")}
                  name="from_day"
                  value={formik.values.from_day}
                  onChange={handleInput}
                />
                {formik.errors.from_day && formik.touched.from_day ? (
                  <span className="error">{formik.errors.from_day}</span>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group-container d-flex flex-column align-items-end mb-3">
                <label htmlFor="To_day" className="form-label">
                  {t("addChalet.columns.To_day")}
                </label>
                <input
                  type="date"
                  className="form-input"
                  id="To_day"
                  placeholder={t("addChalet.columns.To_day")}
                  name="To_day"
                  value={formik.values.To_day}
                  onChange={handleInput}
                />
                {formik.errors.To_day && formik.touched.To_day ? (
                  <span className="error">{formik.errors.To_day}</span>
                ) : null}
              </div>
            </Col>
          </Row>
          {/* <Row className="d-flex flex-row-reverse justify-content-start align-items-center p-3 pt-0 pb-0">
          <Col lg={6}>
            <div className="d-flex flex-column align-items-end mb-3">
              <label htmlFor="tag_name" className="form-label tag-name">
                {t("addChalet.columns.tag_name")}
              </label>
              <div className="form-input tag-container d-flex flex-wrap flex-row-reverse justify-content-start">
                {tag_name?.map((tag, index) => {
                  return (
                    <div key={index} className="tag">
                      {tag} <span onClick={() => removeTag(tag)}>x</span>
                    </div>
                  );
                })}
                <input
                  onKeyDown={addTag}
                  type="text"
                  className="tag-input"
                  id="tag_name"
                  placeholder={t("addChalet.columns.tag_name")}
                />
              </div>
              {formik.errors.tag_name && formik.touched.tag_name ? (
                <span className="error">{formik.errors.tag_name}</span>
              ) : null}
            </div>
          </Col>
          <Col lg={6}>
            <div className="d-flex flex-column align-items-end mb-3">
              <label htmlFor="days" className="form-label tag-name">
                {t("addChalet.columns.days")}
              </label>
              <div className="form-input tag-container d-flex flex-wrap flex-row-reverse justify-content-start">
                {formik?.values?.days?.map((day, index) => {
                  return (
                    <div key={index} className="tag">
                      {day} <span onClick={() => removeDay(day)}>x</span>
                    </div>
                  );
                })}
                <input
                  onKeyDown={addDays}
                  type="text"
                  className="tag-input"
                  id="days"
                  placeholder={t("addChalet.columns.days")}
                />
              </div>
              {formik.errors.days && formik.touched.days ? (
                <span className="error">{formik.errors.days}</span>
              ) : null}
            </div>
          </Col>
        </Row> */}
          <Row className="d-flex justify-content-start align-items-center p-3 pt-0">
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
                  ) : id ? (
                    t("edit")
                  ) : (
                    t("add")
                  )}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    id
                      ? navigate("/chalets/chalets")
                      : registrationCode
                      ? navigate("/chalets/brokers")
                      : formik.handleReset()
                  }
                >
                  {t("cancel")}
                </button>
              </div>
            </Col>
          </Row>
        </form>
      )}
      {/* </div> */}
    </div>
  );
};

export default AddChalet;
