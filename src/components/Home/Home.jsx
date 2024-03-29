import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { IoMdAddCircleOutline, IoMdHome } from "react-icons/io";
import { SiIobroker } from "react-icons/si";
import {
  MdAdminPanelSettings,
  MdBookOnline,
  MdOutlineChalet,
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Header, Sidebar } from "../";
import logo from "../../assets/images/logo.png";

const Home = () => {
  const { t } = useTranslation();
  const linkItems = [
    {
      icon: <IoMdHome />,
      title: t("linkItems.home"),
      path: "/chalets/dashboard",
    },
    {
      title: t("linkItems.subAdmins"),
      path: "/chalets/sub-admins",
      icon: <MdAdminPanelSettings />,
    },
    {
      title: t("linkItems.addChalet"),
      path: "/chalets/add-chalet",
      icon: <IoMdAddCircleOutline />,
    },
    {
      title: t("linkItems.chalets"),
      path: "/chalets/chalets",
      icon: <MdOutlineChalet />,
    },
    {
      title: t("linkItems.brokers"),
      path: "/chalets/brokers",
      icon: <SiIobroker />,
    },
    {
      title: t("linkItems.bookChalets"),
      path: "/chalets/book-chalets",
      icon: <MdBookOnline />,
    },
    // {
    //   title: t("linkItems.messages"),
    //   path: "/chalets/messages",
    //   icon: <MdOutlineMarkunread />,
    // },
    // {
    //   title: t("linkItems.settingsApp"),
    //   path: "/chalets/settings",
    // },
    // {
    //   title: t("linkItems.slider"),
    //   path: "/chalets/slider",
    // },
    // {
    //   title: t("linkItems.termsAndConditions"),
    //   path: "/chalets/terms&conditions",
    // },
  ];
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const closeMenu = (e) => {
    if (e.key === "Escape" || e.target.classList.contains("overlay")) {
      setMenu(false);
    }
  };
  useEffect(() => {
    setMenu(false);
  }, [location.pathname]);
  useEffect(() => {
    document.addEventListener("click", closeMenu);
    document.addEventListener("keydown", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <Header menu={menu} toggleMenu={toggleMenu} linkItems={linkItems} />
        <Outlet />
      </div>
      <Sidebar menu={menu} linkItems={linkItems} logo={logo} />
    </div>
  );
};

export default Home;
