import React, { useEffect, useState } from "react";
import "./index.scss"; // Import file SCSS
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
import {
  APIDashboardLecture,
  APIStatisticTeacher,
} from "src/services/connectAPI/teacher";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UiDashboardTeacher = () => {
  const [dashboardData, setDashboardData] = useState({
    countLecture: "",
    countStudent: "",
  });
  const GetData = async () => {
    const ret = await APIDashboardLecture();
    setDashboardData(ret?.data);
  };
  useEffect(() => {
    GetData();
    GetDataStatistic();
  }, []);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const GetDataStatistic = async () => {
    try {
      const response = await APIStatisticTeacher();
      const data = response?.data || [];
      const semesters = data.map((item) => item.semesterName);
      const counts = data.map((item) => item.count);

      setChartData({
        labels: semesters,
        datasets: [
          {
            label: "Số lớp học giảng dạy",
            data: counts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu biểu đồ:", error);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text: "Thống kê số lớp học giảng dạy theo học kỳ",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container-teacher">
      {/* Dashboard Phần */}
      <div className="dashboard-section">
        <h3 className="section-title">{dashboardData.semesterName}</h3>
        <div className="data-dashboard">
          <div className="dashboard-card blue-card">
            <span>Điểm đánh giá </span>
            <h2>{dashboardData?.averageRating || 0}</h2>
          </div>
          <div className="dashboard-card green-card">
            <span>Học phần đang giảng dạy</span>
            <h2>{dashboardData?.countCurrentTaught || 0}</h2>
          </div>
        </div>
      </div>

      {/* Biểu đồ Phần */}
      <div className="chart-section">
        <h3 className="section-title">Biểu Đồ Thống Kê</h3>
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default UiDashboardTeacher;
