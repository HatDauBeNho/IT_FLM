import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useDispatch } from "react-redux";
import { PropsProvider } from "./context";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../pages/Login/index";
import Register from "src/pages/Register";
import TeacherManagement from "src/pages/QLGiaoVien";
import StudentManagement from "src/pages/QLSinhVien";
import CourseManagement from "src/pages/QLHocPhan";
import ClassManagement from "src/pages/QLLop";
import Dashboard from "src/pages/Dashboard";
import DashboardTeacher from "src/pages/DashboardTeacher";
import ClassTaught from "src/pages/ClassTaught";
import DashboardStudent from "src/pages/DashboardStudent";
import CourseRegister from "src/pages/CourseRegister";
import LogOut from "src/pages/Logout";
import "./../assets/style/index.scss";
import CourseList from "src/pages/CourseList";
export function RootApp(props) {
  const dispatch = useDispatch();
  const { translation } = props;
  return (
    <PropsProvider value={{ translate: translation, dispatch: dispatch }}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN" || 1, "TEACHER" || 2, "STUDENT" || 3]}
            />
          }
        >
          {/* <Route index element={<CourseManagement />} /> */}
          {/*quyền admin*/}
          {/*quản lý lớp */}
          <Route path="/class-manangement" element={<ClassManagement />} />
          {/* quản lý học phần */}
          <Route path="/course-manangement" element={<CourseManagement />} />
          {/* dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/*quản lý sinh viên */}
          <Route path="/student-manangement" element={<StudentManagement />} />
          {/*quản lý giáo viên */}
          <Route path="/teacher-manangement" element={<TeacherManagement />} />

          {/* quyền teacher */}
          {/* dashboard */}
          <Route>
            <Route path="/dashboard-teacher" element={<DashboardTeacher />} />
            {/*lớp học đang giảng dạy  */}
            <Route path="/class-taught" element={<ClassTaught />} />
          </Route>

          {/*quyền student*/}
          {/* dashboard */}
          <Route path="/dashboard-student" element={<DashboardStudent />} />
          {/* Học phần đã đăng ký */}
          <Route path="/course-register" element={<CourseRegister />} />
          {/* Đăng ký học phần  */}
          <Route path="/course-list" element={<CourseList />} />

          <Route path="/logout" key={"/logout"} element={<LogOut />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </PropsProvider>
  );
}
