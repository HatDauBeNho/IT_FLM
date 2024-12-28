import { useEffect, useState } from "react";
import "./index.scss";
import { setStoreHocKy, setTextSearch } from "src/services/store";
import { useDispatch } from "react-redux";
import SelectHocKy from "../UiListLop/UiSelect/SelectHocKy";

export const UiHeaderClassTaught = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
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
      <div className="text-title">Lớp học đang dạy</div>
      <div className="d-flex justify-content-between align-items-center p-8 header-container">
        <SelectHocKy className="w-[100px]" onClick={(value) => setStoreHocKy(value, dispatch)} />
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
