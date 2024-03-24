import { useTranslation } from "react-i18next";
import { boolean, mixed, number, object, string } from "yup";

const useSchema = () => {
  const { t } = useTranslation();
  // Validation Schema for all app {login,forgetPassword,title,description,category,subCategory,article,audio,book,image,chalet,mostListening,slider,contact,termsAndConditions,profile,subAdmins,messages,settings}
  const validationSchema = {
    forgetPassword: object().shape({
      email: string()
        .email(t("validation.email"))
        .required(t("validation.email")),
    }),
    login: object().shape({
      email: string()
        .email(t("validation.email"))
        .required(t("validation.email")),
      password: string()
        .min(8, t("validation.password"))
        .required(t("validation.password")),
      //   userType: string().required("يجب اختيار نوع المستخدم"),
    }),
    subAdmins: object().shape({
      name: string().required(t("validation.name")),
      email: string()
        .email(t("validation.email"))
        .required(t("validation.email")),
      phone: number()
        .typeError(t("validation.phone"))
        .positive(t("validation.phone"))
        .integer(t("validation.phone"))
        .min(1000000000, t("validation.phone"))
        .max(9999999999, t("validation.phone"))
        .required(t("validation.phone")),
      status: string(),
      // Validation for image file must be uploaded with the form or just string
      image: mixed().test("fileSize", t("validation.image"), (value) => {
        if (value.file) {
          return value.file.size <= 2097152;
        }
        if (typeof value === "string") {
          return true;
        }
      }),
    }),
    settings: object().shape({
      image: mixed().notRequired(),
      prayerTime: boolean().notRequired(),
      adhan: boolean().notRequired(),
      facebook: string().url(t("validation.url")).notRequired(),
      whatsapp: string().url(t("validation.url")).notRequired(),
      messenger: string().url(t("validation.url")).notRequired(),
      instagram: string().url(t("validation.url")).notRequired(),
      playStore: string().url(t("validation.url")).notRequired(),
      appStore: string().url(t("validation.url")).notRequired(),
    }),
    slider: object().shape({
      image: mixed().test("fileSize", t("validation.image"), (value) => {
        if (value.file) {
          return value.file.size <= 2097152;
        }
        if (typeof value === "string") {
          return true;
        }
      }),
      title: string().required(t("validation.title")),
      order: number()
        .typeError(t("validation.order"))
        .positive(t("validation.order"))
        .integer(t("validation.order"))
        .min(0, t("validation.order"))
        .max(99999999999, t("validation.order"))
        .required(t("validation.order")),
      status: string(),
      description: string().required(t("validation.description")),
    }),
    termsAndConditions: object().shape({
      titleArabic: string().required(t("validation.title")),
      titleEnglish: string().required(t("validation.title")),
      descriptionArabic: string().required(t("validation.description")),
      descriptionEnglish: string().required(t("validation.description")),
    }),
    chalets: object().shape({
      title: string().required(t("validation.title")),
      description: string().required(t("validation.description")),
      image_array: mixed().test("fileSize", t("validation.image"), (value) => {
        if (value.file) {
          return value.file.size <= 2097152;
        }
        if (typeof value === "string") {
          return true;
        }
      }),
      Image_OwnerChalet: mixed().test(
        "fileSize",
        t("validation.image"),
        (value) => {
          if (value.file) {
            return value.file.size <= 2097152;
          }
          if (typeof value === "string") {
            return true;
          }
        }
      ),
      name_OwnerChalet: string().required(t("validation.chalet")),
      phone_OwnerChalet: number()
        .typeError(t("validation.phone"))
        .positive(t("validation.phone"))
        .integer(t("validation.phone"))
        .min(10000000000, t("validation.phone"))
        .max(99999999999, t("validation.phone"))
        .required(t("validation.phone")),
      email_OwnerChalet: string()
        .email(t("validation.email"))
        .required(t("validation.email")),
      whatsapp_OwnerChalet: number()
        .typeError(t("validation.phone"))
        .positive(t("validation.phone"))
        .integer(t("validation.phone"))
        .min(10000000000, t("validation.phone"))
        .max(99999999999, t("validation.phone"))
        .required(t("validation.phone")),
      name_area: string().required(t("validation.chalet")),
      image_area: mixed().test("fileSize", t("validation.image"), (value) => {
        if (value.file) {
          return value.file.size <= 2097152;
        }
        if (typeof value === "string") {
          return true;
        }
      }),
      sub_description_area: string().required(t("validation.description")),
      Property_type: string().required(t("validation.chalet")),
      Display_type: string().required(t("validation.chalet")),
      space: number()
        .typeError(t("validation.space"))
        .positive(t("validation.space"))
        .integer(t("validation.space"))
        .min(1, t("validation.space"))
        .max(99999999999, t("validation.space"))
        .required(t("validation.space")),
      number_rooms: number()
        .typeError(t("validation.number_rooms"))
        .positive(t("validation.number_rooms"))
        .integer(t("validation.number_rooms"))
        .min(1, t("validation.number_rooms"))
        .max(99999999999, t("validation.number_rooms"))
        .required(t("validation.number_rooms")),
      Furnishing: string().required(t("validation.chalet")),
      Bathroom: number()
        .typeError(t("validation.Bathroom"))
        .positive(t("validation.Bathroom"))
        .integer(t("validation.Bathroom"))
        .min(1, t("validation.Bathroom"))
        .max(99999999999, t("validation.Bathroom"))
        .required(t("validation.Bathroom")),
      price: number()
        .typeError(t("validation.price"))
        .positive(t("validation.price"))
        .integer(t("validation.price"))
        .min(1, t("validation.price"))
        .max(99999999999, t("validation.price"))
        .required(t("validation.price")),
    }),
    brokers: object().shape({
      name: string().required(t("validation.chalet")),
      email: string()
        .email(t("validation.email"))
        .required(t("validation.email")),
      phone: number()
        .typeError(t("validation.phone"))
        .positive(t("validation.phone"))
        .integer(t("validation.phone"))
        .min(10000000000, t("validation.phone"))
        .max(99999999999, t("validation.phone"))
        .required(t("validation.phone")),
      status: string(),
      // Validation for image file must be uploaded with the form or just string
      image: mixed().test("fileSize", t("validation.image"), (value) => {
        if (value.file) {
          return value.file.size <= 2097152;
        }
        if (typeof value === "string") {
          return true;
        }
      }),
    }),
  };

  return { validationSchema };
};

export default useSchema;
