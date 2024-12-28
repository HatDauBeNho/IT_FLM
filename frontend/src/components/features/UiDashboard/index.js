import React, { useEffect, useState } from "react";
import "./index.scss"; // Import file SCSS nếu có
import { APIGetDashBoardAdmin } from "src/services/connectAPI/admin";

const UiDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    countLecture: "",
    countStudent: "",
  });

  const GetData = async () => {
    const ret = await APIGetDashBoardAdmin();
    setDashboardData(ret?.data);
  };
  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* <div className="dashboard-card">
        <span>Khoa</span>
        <h2>8</h2>
      </div>

      <div className="dashboard-card">
        <span>Ngành</span>
        <h2>12</h2>
      </div> */}
      <div className="titlte-hocky">{dashboardData.nameSemester}</div>
      <div className="data-dashboard">
        <div className="dashboard-card">
          <span>Giảng viên</span>
          <h2>{dashboardData.countLecture}</h2>
        </div>
        <div className="dashboard-card">
          <span>Sinh viên</span>
          <h2>{dashboardData.countStudent}</h2>
        </div>
      </div>

      <div className="titlte-thongke"></div>
      {/* 
      <div className="dashboard-card wide-card">
        <span>Môn học</span>
        <h2>165</h2>
      </div> */}
    </div>
  );
};

export default UiDashboard;
