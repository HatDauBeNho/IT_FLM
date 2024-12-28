import React from "react";
import { Outlet } from "react-router-dom";
import "./index.scss";
import AppMenu from "src/components/features/UiMenu";
import AppHeader from "src/components/features/UiHeader";

const MainLayout = () => {
  return (
    <div translate="no">
      <div className="wapperLayout">
        {/* Header */}
        <AppHeader />
        <div className="content">
          {/* Menu bên trái */}
          <div className="menu">
            <AppMenu />
          </div>
          {/* Nội dung bên phải */}
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
