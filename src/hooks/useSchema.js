import { useTranslation } from "react-i18next";
import { boolean, date, mixed, number, object, string } from "yup";

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
      password: string()
        .min(8, t("validation.password"))
        .required(t("validation.password")),
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
      price: string().required(t("validation.price")),
      description: string().required(t("validation.description")),
      image_array: mixed().required(t("validation.image_array")).notRequired(),
      Image_OwnerChalet: mixed()
        .test("fileSize", t("validation.Image_OwnerChalet"), (value) => {
          if (value.file) {
            return value.file.size <= 2097152;
          }
          if (typeof value === "string") {
            return true;
          }
        })
        .notRequired(),
      name_OwnerChalet: string().required(t("validation.name_OwnerChalet")),
      phone_OwnerChalet: number()
        .typeError(t("validation.phone"))
        .positive(t("validation.phone"))
        .integer(t("validation.phone"))
        .min(1000000000, t("validation.phone"))
        .max(9999999999, t("validation.phone"))
        .required(t("validation.phone_OwnerChalet")),
      email_OwnerChalet: string()
        .email(t("validation.email_OwnerChalet"))
        .required(t("validation.email_OwnerChalet")),
      whatsapp_OwnerChalet: number()
        .typeError(t("validation.whatsapp_OwnerChalet"))
        .positive(t("validation.whatsapp_OwnerChalet"))
        .integer(t("validation.whatsapp_OwnerChalet"))
        .min(1000000000, t("validation.whatsapp_OwnerChalet"))
        .max(9999999999, t("validation.whatsapp_OwnerChalet"))
        .required(t("validation.whatsapp_OwnerChalet")),
      name_area: string().required(t("validation.name_area")),
      image_area: mixed()
        .test("fileSize", t("validation.image_area"), (value) => {
          if (value.file) {
            return value.file.size <= 2097152;
          }
          if (typeof value === "string") {
            return true;
          }
        })
        .notRequired(),
      sub_description_area: string().required(
        t("validation.sub_description_area")
      ),
      Property_type: string().required(t("validation.Property_type")),
      Display_type: string().required(t("validation.Display_type")),
      space: string().required(t("validation.space")),
      number_rooms: string().required(t("validation.number_rooms")),
      Furnishing: string().required(t("validation.Furnishing")),
      Bathroom: string().required(t("validation.Bathroom")),
      tag_name: mixed().test("array", t("validation.tag_name"), (value) => {
        if (Array.isArray(value) && value.length > 0) {
          return true;
        }
      }),
      To_day: date().required(t("validation.To_day")),
      from_day: date().required(t("validation.from_day")),
    }),
    updateChalet: object().shape({
      title: string().required(t("validation.title")),
      price: string().required(t("validation.price")),
      description: string().required(t("validation.description")),
      image_array: mixed().notRequired(),
      Image_OwnerChalet: mixed().notRequired(),
      name_OwnerChalet: string().required(t("validation.name_OwnerChalet")),
      phone_OwnerChalet: number()
        .typeError(t("validation.phone"))
        .positive(t("validation.phone"))
        .integer(t("validation.phone"))
        .min(1000000000, t("validation.phone"))
        .max(9999999999, t("validation.phone"))
        .required(t("validation.phone_OwnerChalet")),
      email_OwnerChalet: string()
        .email(t("validation.email_OwnerChalet"))
        .required(t("validation.email_OwnerChalet")),
      whatsapp_OwnerChalet: number()
        .typeError(t("validation.whatsapp_OwnerChalet"))
        .positive(t("validation.whatsapp_OwnerChalet"))
        .integer(t("validation.whatsapp_OwnerChalet"))
        .min(1000000000, t("validation.whatsapp_OwnerChalet"))
        .max(9999999999, t("validation.whatsapp_OwnerChalet"))
        .required(t("validation.whatsapp_OwnerChalet")),
      name_area: string().required(t("validation.name_area")),
      image_area: mixed().notRequired(),
      sub_description_area: string().required(
        t("validation.sub_description_area")
      ),
      Property_type: string().required(t("validation.Property_type")),
      Display_type: string().required(t("validation.Display_type")),
      space: string().required(t("validation.space")),
      number_rooms: string().required(t("validation.number_rooms")),
      Furnishing: string().required(t("validation.Furnishing")),
      Bathroom: string().required(t("validation.Bathroom")),
      tag_name: mixed().test("array", t("validation.tag_name"), (value) => {
        if (Array.isArray(value) && value.length > 0) {
          return true;
        }
      }),
      To_day: date().required(t("validation.To_day")),
      from_day: date().required(t("validation.from_day")),
    }),
    brokers: object().shape({
      Fullname: string().required(t("validation.Fullname")),
      phone_number: number()
        .typeError(t("validation.phone"))
        .positive(t("validation.phone"))
        .integer(t("validation.phone"))
        .min(1000000000, t("validation.phone"))
        .max(9999999999, t("validation.phone"))
        .required(t("validation.phone")),
    }),
  };

  return { validationSchema };
};

export default useSchema;
