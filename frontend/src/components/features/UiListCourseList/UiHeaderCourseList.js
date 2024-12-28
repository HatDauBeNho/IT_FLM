import { useEffect, useState } from "react";
import "./index.scss";
import { IconPlus } from "src/assets/icons";
import BaseButton from "src/components/common/Button/BaseButton";
import {
  setOpenModalAddProduct,
  setStoreHocKy,
  setTextSearch,
} from "src/services/store";
import { useDispatch } from "react-redux";
import { GetValueStore } from "src/components/function";
import SelectHocKy from "../UiListLop/UiSelect/SelectHocKy";

export const UiHeaderCourseList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { StoreOpenModalCourse } = GetValueStore();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTextSearch(search, dispatch);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, dispatch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="text-title">Đăng ký học phần </div>
      <div className="d-flex justify-content-between align-items-center p-8 header-container">
        <div style={{ width: "180px" }}></div>
        {/* <BaseButton
          handleClick={() => setOpenModalAddProduct(true, dispatch)}
          width={180}
          typeBtn={"btnOrange"}
          icon={
            <IconPlus
              width={16}
              height={14}
              style={{ marginRight: "0.5rem" }}
            />
          }
          content={`Đăng ký học phần`}
        /> */}
        <SelectHocKy onClick={(value) => setStoreHocKy(value, dispatch)} />
        <div>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
};
