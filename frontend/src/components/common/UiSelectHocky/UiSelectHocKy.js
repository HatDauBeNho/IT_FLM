import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import "./index.scss";
import { GetValueStore } from "src/components/function";
import {
  APIGetSemester,
  APIGetSemesterInYear,
} from "src/services/connectAPI/admin";

const { Option } = Select;

export const UiSelectHocky = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [indexPage, setIndexPage] = useState(1);
  const { StoreSelectCourseId, StoreSelectGiaoVienId, StoreSelectHocKyId } =
    GetValueStore();

  const handleGetData = async (isLoadMore = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const ret = await APIGetSemesterInYear();
      const newData = ret?.data || [];
      setTotal(ret?.data?.total || 0);
      setList((prevList) => (isLoadMore ? [...prevList, ...newData] : newData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
    setIndexPage(1);
    handleGetData();
  };
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && list.length < total) {
      setIndexPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    handleGetData(indexPage > 1);
  }, [indexPage, searchTerm]);

  return (
    <Select
      className={`select-software ${props.className || ""}`}
      getPopupContainer={(trigger) => trigger.parentNode}
      showSearch
      style={{ width: "250px" }}
      onSearch={handleSearch}
      onChange={props.onClick}
      filterOption={false}
      notFoundContent={
        loading ? <Spin size="small" /> : "Không tìm thấy dữ liệu"
      }
      onPopupScroll={handleScroll}
    >
      {/* <Option value={3}>Tất cả</Option> */}
      {list.map((item) => (
        <Option key={item.semesterId} value={item.semesterId}>
          {item.name}
        </Option>
      ))}
      {loading && (
        <Option disabled key="loading">
          <Spin size="small" />
        </Option>
      )}
    </Select>
  );
};
