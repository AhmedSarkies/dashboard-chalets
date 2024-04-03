import i18next from "i18next";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { MdMenu, MdOutlineLogout } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Http from "../../Http";
import { useTranslation } from "react-i18next";

const Header = ({ menu, toggleMenu, linkItems }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const lng = Cookies.get("i18next") || "ar";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lng;
  }, [lng]);

  // Logout Function
  const logout = async () => {
    setLoading(true);
    try {
      const response = await Http({
        method: "POST",
        url: "/Chalet/logout",
      });
      if (response.status === 200) {
        setLoading(false);
        Cookies.remove("_auth");
        window.location.href = "/chalets/login";
      }
    } catch (error) {
      setLoading(false);
      Cookies.remove("_auth");
      window.location.href = "/chalets/login";
    }
  };

  return (
    <>
      <div className={`overlay${menu ? " active" : ""}`}></div>
      <div className="dashboard-header">
        <div className="dashboard-header-btns">
          <button className="btn logout-btn" onClick={logout}>
            {loading ? (
              "Loading..."
            ) : (
              <>
                <MdOutlineLogout />
                {lng === "en" ? "Logout" : "تسجيل الخروج"}
              </>
            )}
          </button>
          <button
            className="btn lang-btn"
            onClick={() =>
              i18next.language === "en"
                ? i18next.changeLanguage("ar")
                : i18next.changeLanguage("en")
            }
          >
            {lng === "ar" ? "EN" : "ع"}
          </button>
        </div>
        <div className="dashboard-header-title">
          <h6 className="login-title">
            {linkItems.find(
              (item) =>
                item.path.toLowerCase() === location.pathname.toLowerCase()
            )?.title
              ? linkItems.find(
                  (item) =>
                    item.path.toLowerCase() === location.pathname.toLowerCase()
                )?.title
              : location.pathname.includes("/chalets/chalets-brokers/")
              ? t("brokersChalets")
              : location.pathname.includes("/chalets/broker/add-broker-chalet/")
              ? t("addBrokerChalet")
              : location.pathname.includes(
                  "/chalets/broker/edit-broker-chalet/"
                )
              ? t("editBrokerChalet")
              : ""}
          </h6>
          <button className="btn menu-btn" onClick={toggleMenu}>
            <MdMenu />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
