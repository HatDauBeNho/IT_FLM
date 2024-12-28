import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import "./index.scss";
import { APIGetTaught } from "src/services/connectAPI/teacher";
import { UiLoading } from "../UiLoading";
import { GetValueStore } from "src/components/function";
import { setStoreOpenModalDetail } from "src/services/store";
import { useDispatch } from "react-redux";
import ModalDetailClassOpen from "src/components/common/Modal/detail/ModalDetailClassOpen";

export const UiListClassTaught = () => {
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [indexpage, setIndexPage] = useState(1);
  const [check, setCheck] = useState(true);
  const { textSearch, StoreOpenModalDetail, StoreSelectHocKy } =
    GetValueStore();
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataId, setDataId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    handleGetData();
  }, [textSearch, StoreSelectHocKy]);
  const handleGetData = async () => {
    setCheck(false);
    try {
      const ret = await APIGetTaught(StoreSelectHocKy);
      setData(ret?.data);
      setTotal(ret?.data?.length);
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
  const handleRowClick = (rowData) => {
    setSelectedRow(rowData.classId);
    setDataId(rowData);
    setStoreOpenModalDetail(true, dispatch);
  };
  return (
    <>
      {StoreOpenModalDetail && (
        <ModalDetailClassOpen
          title={"Xem chi tiết lớp học đang dạy"}
          dataId={dataId}
          onClose={() => setStoreOpenModalDetail(false,dispatch)}
        />
      )}
      <div className="UiMachineList-CSS">
        <div className="table-container">
          <table className="table border-table">
            <thead className="style-table-title">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên học phần</th>
                <th scope="col">Số sinh viên đăng ký học phần</th>
                <th scope="col">Thời gian bắt đầu và kết thúc</th>
              </tr>
            </thead>
            <tbody className="style-table-row">
              {Array.isArray(data) ? (
                data.map((value, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(value)}
                    style={{ cursor: "pointer" }}
                  >
                    <th className="style-table-row">
                      {(indexpage - 1) * size + index + 1}
                    </th>
                    <td className="style-table-row">{value.courseName}</td>
                    <td className="style-table-row">
                      {value.currentStudent}/{value.maximumStudent}
                    </td>
                    <td className="style-table-row">
                      {value.startTime}/{value.endTime}
                    </td>
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
          <div
            className="col d-flex"
            style={{ fontSize: 14, color: "#F85C22" }}
          >
            <div>Tổng số :{total}</div>
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
    </>
  );
};
