import { useEffect, useState } from "react";
import { useContext } from "react";
import PropsContext from "src/routes/context";
import "./index.scss";
import { AvatarSVG } from "src/assets/icons";
import { useDispatch } from "react-redux";
import { setTextSearch } from "src/services/store";

export const UiHeaderSinhVien = () => {
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
      <div className="text-title"> Quản lý sinh viên</div>
      <div className="d-flex justify-content-between align-items-center p-8 header-container">
        <div>
          {/* <button className="btn btn-open-class">Mở lớp học phần</button> */}
        </div>
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
