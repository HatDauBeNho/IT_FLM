import { AvatarSVG } from "src/assets/icons";
import "./index.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { setToggleMenu } from "src/services/store";
import { useDispatch } from "react-redux";
import { APIGetRoleUsername } from "src/services/connectAPI/role";

const AppHeader = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [dataUsername, setDataUsername] = useState("");
  const toggleCollapse = () => {
    setToggleMenu(collapsed, dispatch);
    setCollapsed((prev) => !prev);
  };
  const getRoleUsername = async () => {
    try {
      const ret = await APIGetRoleUsername();
      setDataUsername(ret?.data);
    } catch {}
  };
  useEffect(() => {
    getRoleUsername();
  }, []);
  return (
    <div className="main-header">
      <div className="title-app">
        <div className="menu-header">
          <div className="menu-toggle-icon" onClick={toggleCollapse}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <span className="brand">HAUI</span>
        <span className="separator">|</span>
        <span className="feature">Management</span>
      </div>
      <div className="account-info">
        <AvatarSVG />
        <div className="flex flex-col w-[200px] items-center font-bold text-[18px] text-black">
          <span className="account-name">{dataUsername.fullName}</span>
          <span className="account-name">{dataUsername.roleName}</span>
        </div>
      </div>
    </div>
  );
};
export default AppHeader;
