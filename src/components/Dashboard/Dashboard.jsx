import React from "react";
import { Col, Row } from "reactstrap";
// import { useTranslation } from "react-i18next";
// import { HiUsers } from "react-icons/hi2";
// import { SiIobroker } from "react-icons/si";
// import { MdBookOnline, MdOutlineChalet } from "react-icons/md";
import { Brokers, Chalets, SubAdmins } from "../";
// import { UserData } from "../../data";

const Dashboard = () => {
  // const { t } = useTranslation();
  // const cardItems = [
  //   {
  //     id: 1,
  //     title: t("dashboard.users"),
  //     icon: <HiUsers />,
  //     path: "users",
  //     disabled: false,
  //     count: 10,
  //     color: "linear-gradient(45deg, rgb(249, 177, 21), rgb(246, 150, 11))",
  //   },
  //   {
  //     id: 2,
  //     title: t("dashboard.chalets"),
  //     icon: <MdOutlineChalet />,
  //     path: "chalets",
  //     disabled: false,
  //     count: 40,
  //     color: "linear-gradient(45deg, rgb(51, 153, 255), rgb(41, 130, 204))",
  //   },
  //   {
  //     id: 3,
  //     title: t("dashboard.brokers"),
  //     icon: <SiIobroker />,
  //     path: "brokers",
  //     disabled: false,
  //     count: 20,
  //     color: "linear-gradient(45deg, rgb(50, 31, 219), rgb(31, 20, 152))",
  //   },
  //   {
  //     id: 4,
  //     title: t("dashboard.bookChalets"),
  //     icon: <MdBookOnline />,
  //     path: "book-chalets",
  //     disabled: false,
  //     count: 30,
  //     color: "linear-gradient(45deg, rgb(203, 93, 255), rgb(128, 12, 184))",
  //   },
  // ];
  // // eslint-disable-next-line no-unused-vars
  // const [userData, setUserData] = useState({
  //   labels: UserData.map((item) => item.year),
  //   datasets: [
  //     {
  //       label: t("dashboard.users"),
  //       data: UserData.map((item) => item.userGain),
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.articles"),
  //       data: UserData.map((item) => item.articleGain),
  //       backgroundColor: "rgba(255, 206, 86, 0.2)",
  //       borderColor: "rgba(255, 206, 86, 1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.audios"),
  //       data: UserData.map((item) => item.audioGain),
  //       backgroundColor: "rgba(54, 162, 235, 0.2)",
  //       borderColor: "rgba(54, 162, 235, 1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.images"),
  //       data: UserData.map((item) => item.pictureGain),
  //       backgroundColor: "rgba(153, 102, 255, 0.2)",
  //       borderColor: "rgba(153, 102, 255, 1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.books"),
  //       data: UserData.map((item) => item.bookGain),
  //       backgroundColor: "rgba(255, 99, 132, 0.2)",
  //       borderColor: "rgba(255, 99, 132, 1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.downloads"),
  //       data: UserData.map((item) => item.downloadGain),
  //       backgroundColor: "rgba(255, 159, 64, 0.2)",
  //       borderColor: "rgba(255, 159, 64, 1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.favorites"),
  //       data: UserData.map((item) => item.favoriteGain),
  //       backgroundColor: "rgba(75,45,62,0.2)",
  //       borderColor: "rgba(45,122,220,1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.shares"),
  //       data: UserData.map((item) => item.shareGain),
  //       backgroundColor: "rgba(75,123,97,0.2)",
  //       borderColor: "rgba(75,86,45,1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.chalets"),
  //       data: UserData.map((item) => item.scholarGain),
  //       backgroundColor: "rgba(75,67,130,0.2)",
  //       borderColor: "rgba(75,140,67,1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.newUsers"),
  //       data: UserData.map((item) => item.newUserGain),
  //       backgroundColor: "rgba(75,158,192,0.2)",
  //       borderColor: "rgba(75,242,12,1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.activeUsers"),
  //       data: UserData.map((item) => item.activeUserGain),
  //       backgroundColor: "rgba(75,45,37,0.2)",
  //       borderColor: "rgba(75,97,59,1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.inactiveUsers"),
  //       data: UserData.map((item) => item.inactiveUserGain),
  //       backgroundColor: "rgba(75,44,178,0.2)",
  //       borderColor: "rgba(75,224,71,1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //     {
  //       label: t("dashboard.deletedUsers"),
  //       data: UserData.map((item) => item.deletedUserGain),
  //       backgroundColor: "rgba(75,77,241,0.2)",
  //       borderColor: "rgba(75,146,178,1)",
  //       borderWidth: 1,
  //       weight: 1,
  //     },
  //   ],
  // });

  return (
    <>
      {/* <div className="dashboard-cards mb-3 mt-5 bg-white p-4">
        <Container style={{ minWidth: "100%" }}>
          <Row
            style={{ maxWidth: "100vw" }}
            className="flex-wrap flex-row-reverse justify-content-between align-items-center g-3"
          >
            {cardItems.map((item) => (
              <Col xl="3" lg="4" md="6" sm="12" key={item.id}>
                <Card item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </div> */}
      {/*<div className="dashboard-charts mb-3 p-4">
        <Row>
          <Col xl="12" className="chart-containerY">
            <div className="chart">
              <BarChart
                chartData={userData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
              ;
            </div>
          </Col>
        </Row>
      </div>*/}
      <div className="dashboard-users mb-5 p-4">
        <Row>
          <Col xl="12">
            <SubAdmins dashboard={true} />
          </Col>
          <Col xl="12">
            <Chalets dashboard={true} />
          </Col>
          <Col xl="12">
            <Brokers dashboard={true} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
