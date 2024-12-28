import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOpenModalAddProduct, setTextSearch } from "src/services/store";
import { GetValueStore } from "src/components/function";
import BaseButton from "src/components/common/Button/BaseButton";
import ModalAddCourse from "src/components/common/Modal/add/ModalAddCourse";
import { IconPlus } from "src/assets/icons";
import "./index.scss";

export const UiHeader = () => {
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
      {StoreOpenModalCourse && <ModalAddCourse title={"Thêm mới khoá học"} />}
      <div className="text-title"> Quản lý học phần</div>
      <div className="d-flex justify-content-between align-items-center p-8 header-container">
        <BaseButton
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
          content={`Thêm mới`}
        />
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
