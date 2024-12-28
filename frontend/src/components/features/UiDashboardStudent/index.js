import React, { useEffect, useState } from "react";
import "./index.scss"; // Import file SCSS
import {
  APIGetDashboardStudent,
  APIStatisticPointStudent,
} from "src/services/connectAPI/student";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UiDashboardStudent = () => {
  const [dashboardData, setDashboardData] = useState({
    countLecture: "",
    countStudent: "",
  });

  const [dashboardDataStatistic, setDashboardDataStatistic] = useState({});

  const GetData = async () => {
    const ret = await APIGetDashboardStudent();
    setDashboardData(ret?.data);
  };

  const GetDataStatistic = async () => {
    const ret = await APIStatisticPointStudent();
    setDashboardDataStatistic(ret?.data || {});
  };

  useEffect(() => {
    GetData();
    GetDataStatistic();
  }, []);

  const chartData = {
    labels: ["< 4", ">= 4", ">= 5", ">= 6", ">= 7", ">= 8", ">= 9", "= 10"],
    datasets: [
      {
        label: "Thống kê kết quả của sinh viên",
        data: [
          dashboardDataStatistic?.nhoHon4 || 0,
          dashboardDataStatistic?.lonHon4 || 0,
          dashboardDataStatistic?.lonHon5 || 0,
          dashboardDataStatistic?.lonHon6 || 0,
          dashboardDataStatistic?.lonHon7 || 0,
          dashboardDataStatistic?.lonHon8 || 0,
          dashboardDataStatistic?.lonHon9 || 0,
          dashboardDataStatistic?.bang10 || 0,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Thống kê kết quả của sinh viên" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="dashboard-container-student">
      {/* Dashboard Phần */}
      <div className="dashboard-section">
        <h3 className="section-title">{dashboardData.semesterName}</h3>
        <div className="data-dashboard">
          <div className="dashboard-card blue-card">
            <span>Học phần đã đăng ký</span>
            <h2>{dashboardData.countRegisteredCourse || 0}</h2>
          </div>
          <div className="dashboard-card green-card">
            <span>GPA</span>
            <h2>{dashboardData.gpa || 0}</h2>
          </div>
        </div>
      </div>
      <div className="chart-section">
        <h3 className="section-title">Biểu Đồ Thống Kê</h3>
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default UiDashboardStudent;
