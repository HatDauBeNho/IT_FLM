import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import "./index.scss";
import { APIGetClasroomOpen } from "src/services/connectAPI/student";
import { UiLoading } from "../UiLoading";
import ModalEditLop from "src/components/common/Modal/edit/ModalEditLop";
import ModalDeleteLop from "src/components/common/Modal/delete/ModalDeleteLop";
import { IconDelete, IconEdit } from "src/assets/icons";
import { GetValueStore } from "src/components/function";

export const UiListLop = () => {
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [indexpage, setIndexPage] = useState(1);
  const [check, setCheck] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [clickData, setClickData] = useState("");
  const [openDelete, setOpenDelete] = useState("");
  const { textSearch, StoreLoadData, StoreSelectHocKy } = GetValueStore();

  useEffect(() => {
    handleGetData();
  }, [textSearch, size, indexpage, StoreLoadData, StoreSelectHocKy]);

  const handleGetData = async () => {
    setCheck(false);
    const param = {
      keySearch: textSearch,
      semesterId: StoreSelectHocKy || 1,
      option: {
        limit: size,
        offset: indexpage > 1 ? indexpage : 1,
        order: "asc",
      },
    };
    try {
      const ret = await APIGetClasroomOpen(param);
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
              <th scope="col">Tên học phần</th>
              <th scope="col">Số sinh viên đăng ký</th>
              <th scope="col">Giáo viên dạy</th>
              <th scope="col">Ngày bắt đầu</th>
              <th scope="col">Ngày kết thúc</th>
              <th scope="col ">
                <center>Chức năng</center>
              </th>
            </tr>
          </thead>
          <tbody className="style-table-row">
            {Array.isArray(data) ? (
              data?.map((value, index) => (
                <tr key={index}>
                  <th className="style-table-row">
                    {(indexpage - 1) * size + index + 1}
                  </th>
                  <td className="style-table-row">{value.courseName}</td>
                  <td className="style-table-row">
                  {value.currentStudent}/{value.maximumStudent}
                  </td>
                  <td className="style-table-row">{value.teacherName}</td>
                  <td className="style-table-row">{value.startTime}</td>
                  <td className="style-table-row">{value.endTime}</td>
                  <td className="style-table-row">
                    {" "}
                    <div className="d-flex justify-content-around">
                      {/* <center
                        onClick={async () => {
                          await setOpenEdit(true);
                          await setClickData(value);
                        }}
                      >
                        <IconEdit style={{ cursor: "pointer" }} />{" "}
                      </center> */}
                      <center
                        onClick={async () => {
                          await setClickData(value);
                          await setOpenDelete(true);
                        }}
                      >
                        <IconDelete
                          fill="#F85C22"
                          style={{ cursor: "pointer" }}
                        />
                      </center>
                    </div>
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
        <div className="col d-flex" style={{ fontSize: 14, color: "#F85C22" }}>
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
      {openEdit && (
        <ModalEditLop
          title={"Cập nhật học phần"}
          data={clickData}
          visible={openEdit}
          onClose={() => setOpenEdit(false)}
        />
      )}
      {openDelete && (
        <ModalDeleteLop
          title={"Xóa lớp"}
          data={clickData}
          visible={openDelete}
          onClose={() => setOpenDelete(false)}
        />
      )}
    </div>
  );
};
