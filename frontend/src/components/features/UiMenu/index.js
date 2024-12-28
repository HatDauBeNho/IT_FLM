import React, { useContext, useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getMenuByRole } from "./ListMenu";
import "./index.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import i18n from "i18next";
import PropsContext from "src/routes/context";
import { GetValueStore } from "src/components/function";
import { IconLangEN, IconLangVN } from "src/assets/icons";

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const getmenu = (props) => {
  const role = localStorage.getItem("role");
  const menuData = getMenuByRole(role);
  const { translate } = props;
  let item = [];
  menuData.forEach((value) => {
    if (value.type === 1) {
      item.push(
        getItem(
          <Link to={value.path} className="select-router" key={value.path}>
            {translate(value.name)}
          </Link>,
          value.path,
          value.icon
        )
      );
    } else if (value.type === 2) {
      let item_child = [];
      value.paths.forEach((value_child) => {
        item_child.push(
          getItem(
            <Link
              to={value_child.path}
              className="select-router"
              key={value_child.path}
            >
              {translate(value_child.name)}
            </Link>,
            value_child.path
          )
        );
      });
      item.push(getItem(value.name, value.key, value.icon, item_child));
    }
  });
  return item;
};

const AppMenu = () => {
  const { toogleMenu } = GetValueStore();
  const langChange = (e) => {
    localStorage.setItem("lang", e);
    const lang = localStorage.getItem("lang");
    i18n.changeLanguage(lang);
  };
  return (
    <div className="menu-container">
      <Menu
        style={{
          minHeight: window.innerHeight,
          paddingTop: 16,
        }}
        defaultSelectedKeys={[window.location.pathname]}
        mode="inline"
        inlineCollapsed={toogleMenu}
        theme="light"
        items={getmenu(useContext(PropsContext))}
      />
      {/* <div className="vertical-center-lang">
        <IconLangVN
          onClick={() => langChange("vn")}
          style={{ cursor: "pointer" }}
        />
        <IconLangEN
          onClick={() => langChange("en")}
          style={{ cursor: "pointer", marginLeft: 20 }}
        />
      </div> */}
    </div>
  );
};

export default AppMenu;
