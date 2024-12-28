import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import "./index.scss";
import { GetValueStore } from "src/components/function";
import { APIGetClasroomOpen } from "src/services/connectAPI/student";
import { UiLoading } from "../UiLoading";
import ModalRegister from "src/components/common/Modal/register/ModalRegister";
import { IconEdit } from "src/assets/icons";

export const UiListCourseList = () => {
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [indexpage, setIndexPage] = useState(1);
  const [check, setCheck] = useState(true);
  const { textSearch, StoreLoadData, StoreSelectHocKy } = GetValueStore();
  const [openRegister, setOpenRegister] = useState("");
  const [clickData, setClickData] = useState("");
console.log("clickData",clickData);

  useEffect(() => {
    handleGetData();
  }, [textSearch, size, indexpage, StoreLoadData, StoreSelectHocKy]);

  const handleGetData = async () => {
    setCheck(false);
    const param = {
      keySearch: textSearch,
      semesterId: StoreSelectHocKy,
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
    } catch {}
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
              <th scope="col">Số học sinh đã đăng ký học phần</th>
              <th scope="col">Tên giáo viên</th>
              <th scope="col">Thời gian bắt đầu học và kết thúc</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody className="style-table-row">
            {Array.isArray(data) ? (
              data.map((value, index) => (
                <tr key={index}>
                  <th className="style-table-row">
                    {(indexpage - 1) * size + index + 1}
                  </th>
                  <td className="style-table-row">{value.courseName}</td>
                  <td className="style-table-row">
                    {value.currentStudent}/{value.maximumStudent}
                  </td>
                  <td className="style-table-row">{value.teacherName}</td>
                  <td className="style-table-row">
                    {value.startTime} / {value.endTime}
                  </td>
                  <td className="style-table-row">
                    {" "}
                    <div className="d-flex justify-content-around">
                      <center
                        onClick={async () => {
                          await setClickData(value);
                          await setOpenRegister(true);
                        }}
                      >
                        <IconEdit
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
      {openRegister && (
        <ModalRegister
          title={"Đăng ký học phần"}
          data={clickData}
          visible={openRegister}
          onClose={() => setOpenRegister(false)}
        />
      )}
    </div>
  );
};
