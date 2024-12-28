import {
  Dashboard,
  MenuClass,
  MenuCourse,
  MenuStudent,
  MenuTeacher,
} from "src/assets/icons";
import { LogoutOutlined } from "@mui/icons-material";

const adminMenu = [
  {
    type: 1,
    icon: <Dashboard className="select-menu" />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    type: 1,
    icon: <MenuCourse className="select-menu" />,
    name: "Quản lý học phần",
    path: "/course-manangement",
  },
  {
    type: 1,
    icon: <MenuTeacher className="select-menu" />,
    name: "Quản lý giáo viên",
    path: "/teacher-manangement",
  },
  {
    type: 1,
    icon: <MenuStudent className="select-menu" />,
    name: "Quản lý sinh viên",
    path: "/student-manangement",
  },
  {
    type: 1,
    icon: <MenuClass className="select-menu" />,
    name: "Quản lý lớp",
    path: "/class-manangement",
  },
  {
    type: 1,
    path: "/logout",
    icon: (
      <LogoutOutlined
        style={{ fontSize: 40, color: "black" }}
        className="select-menu"
      />
    ),
    name: "Đăng xuất",
  },
];

const studentMenu = [
  {
    type: 1,
    icon: <Dashboard className="select-menu" />,
    name: "Dashboard",
    path: "/dashboard-student",
  },
  {
    type: 1,
    icon: <MenuClass className="select-menu" />,
    name: "Học phần đã đăng ký",
    path: "/course-register",
  },
  {
    type: 1,
    icon: <MenuCourse className="select-menu" />,
    name: "Đăng ký học phần",
    path: "/course-list",
  },
  {
    type: 1,
    path: "/logout",
    icon: (
      <LogoutOutlined
        style={{ fontSize: 40, color: "black" }}
        className="select-menu"
      />
    ),
    name: "Đăng xuất",
  },
];

const teacherMenu = [
  {
    type: 1,
    icon: <Dashboard className="select-menu" />,
    name: "Dashboard",
    path: "/dashboard-teacher",
  },
  {
    type: 1,
    icon: <MenuClass className="select-menu" />,
    name: "Lớp học đang dạy",
    path: "/class-taught",
  },
  {
    type: 1,
    path: "/logout",
    icon: (
      <LogoutOutlined
        style={{ fontSize: 40, color: "black" }}
        className="select-menu"
      />
    ),
    name: "Đăng xuất",
  },
];

export const getMenuByRole = (role) => {
  switch (role) {
    case "1":
      return adminMenu;
    case "2":
      return teacherMenu;
    case "3":
      return studentMenu;
    default:
      return [];
  }
};
