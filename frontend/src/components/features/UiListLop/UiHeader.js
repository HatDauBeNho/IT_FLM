import { useEffect, useState } from "react";
import "./index.scss";
import { useDispatch } from "react-redux";
import {
  setOpenModalAddLop,
  setStoreHocKy,
  setTextSearch,
} from "src/services/store";
import ModalAddLop from "src/components/common/Modal/add/ModalAddLop";
import { GetValueStore } from "src/components/function";
import BaseButton from "src/components/common/Button/BaseButton";
import { IconPlus } from "src/assets/icons";
import SelectHocKy from "./UiSelect/SelectHocKy";

export const UiHeaderLop = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { StoreOpenModalLop } = GetValueStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTextSearch(search, dispatch);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, dispatch]);

  const handleTextSearch = (e) => {
    setSearch(e.target.value);
  };

  return ( 
    <div>
      {StoreOpenModalLop && <ModalAddLop title={"Thêm mới lớp"} />}
      <div className="text-title"> Quản lý lớp</div>
      <div className="d-flex justify-content-between align-items-center p-8 header-container">
        <BaseButton
          handleClick={() => setOpenModalAddLop(true, dispatch)}
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
        <SelectHocKy onClick={(value) => setStoreHocKy(value, dispatch)} />
        <div>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={handleTextSearch}
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
};
