import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import "./index.scss";
import { APIGetTeacher } from "src/services/connectAPI/admin";
import { UiLoading } from "../UiLoading";
import { GetValueStore } from "src/components/function";

export const UiListGiaoVien = () => {
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [indexpage, setIndexPage] = useState(1);
  const [check, setCheck] = useState(true);
  const [keySearch, setKeySearch] = useState("");
  const { textSearch } = GetValueStore();

  useEffect(() => {
    handleGetData();
  }, [textSearch, size, indexpage]);

  const handleGetData = async () => {
    setCheck(false);
    const param = {
      keySearch: keySearch,
      option: {
        limit: size,
        offset: indexpage > 1 ? indexpage : 1,
        order: "asc",
      },
    };
    try {
      const ret = await APIGetTeacher(param);
      setData(ret?.data?.data);
      setTotal(ret?.data?.total);
      setCheck(true);
    } catch {
      setCheck(true);
    }
  };

  const onPageChange = (page) => {
    setIndexPage(page);
  };
  const onShowSizeChange = (current, pageSize) => {
    setSize(pageSize);
    setIndexPage(current);
  };
  return (
    <div className="UiMachineList-CSS">
      <div className="table-container">
        <table className="table border-table">
          <thead className="style-table-title">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên giáo viên</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Email</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Đánh giá</th>
            </tr>
          </thead>
          <tbody className="style-table-row">
            {Array.isArray(data) ? (
              data?.map((value, index) => (
                <tr key={index}>
                  <th className="style-table-row">
                    {(indexpage - 1) * size + index + 1}
                  </th>
                  <td className="style-table-row">{value.fullName}</td>
                  <td className="style-table-row">{value.address}</td>
                  <td className="style-table-row">{value.email}</td>
                  <td className="style-table-row">{value.gender}</td>
                  <td className="style-table-row">{value.phoneNumber}</td>
                  <td className="style-table-row">{value.dateOfBirth}</td>
                  <td className="style-table-row">{value.averageRating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!check && <UiLoading />}
      <div className="d-flex pt-4">
        <div className="col d-flex" style={{ fontSize: 14, color: "#F85C22" }}>
          <div>
            Tống số:
            {total}
          </div>
        </div>
        <Pagination
          className="page-icon"
          pageSizeOptions={["10", "20", "30", "40"]}
          defaultPageSize={size}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={onPageChange}
          pageSize={size}
          current={indexpage}
          total={total}
        />
      </div>
    </div>
  );
};
