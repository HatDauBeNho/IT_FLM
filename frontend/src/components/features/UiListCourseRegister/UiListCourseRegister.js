import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import "./index.scss";
import { GetValueStore } from "src/components/function";
import { APISearchRegisteredCourse } from "src/services/connectAPI/student";
import { UiLoading } from "../UiLoading";
import { IconDelete, IconEdit, IconHistory } from "src/assets/icons";
import ModalCacel from "src/components/common/Modal/cacel/ModalCancelCourse";
import ModalDetailRegisterCourse from "src/components/common/Modal/detail/ModalDetailRegisterCourse";
import ModalDanhGia from "src/components/common/Modal/danhgia/ModalDanhGia";

export const UiListCourseRegister = () => {
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [indexpage, setIndexPage] = useState(1);
  const [check, setCheck] = useState(true);
  const { textSearch, StoreLoadData, StoreSelectHocKy } = GetValueStore();
  const [openAccept, setOpenAccept] = useState("");
  const [openCacel, setOpenCacel] = useState("");
  const [clickData, setClickData] = useState("");
  const [openDanhGia, SetOpenDanhGia] = useState("");

  useEffect(() => {
    handleGetData();
  }, [textSearch, size, indexpage, StoreLoadData, StoreSelectHocKy]);

  const handleGetData = async () => {
    setCheck(false);
    try {
      const ret = await APISearchRegisteredCourse(StoreSelectHocKy);
      setData(ret?.data);
      setTotal(ret?.data?.length);
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
              {/* <th scope="col">Số học sinh đã đăng ký học phần</th> */}
              <th scope="col">Tên giáo viên</th>
              <th scope="col">Thời gian bắt đầu học và kết thúc</th>
              <th scope="col">Thời gian đăng ký</th>
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
                  {/* <td className="style-table-row">
                    {value.currentStudent}/{value.maximumStudent}
                  </td> */}
                  <td className="style-table-row">{value.fullName}</td>
                  <td className="style-table-row">
                    {value.startTime} / {value.endTime}
                  </td>
                  <td className="style-table-row">{value.createTime}</td>
                  <td className="style-table-row">
                    {" "}
                    <div className="d-flex justify-content-around">
                      <center
                        onClick={async () => {
                          await setClickData(value);
                          await setOpenAccept(true);
                        }}
                      >
                        <IconEdit
                          fill="#F85C22"
                          style={{ cursor: "pointer" }}
                        />
                      </center>
                      <center
                        onClick={async () => {
                          await setClickData(value);
                          await setOpenCacel(true);
                        }}
                      >
                        <IconDelete
                          fill="#F85C22"
                          style={{ cursor: "pointer" }}
                        />
                      </center>

                      {!value.isEvaluate && (
                        <center
                          onClick={async () => {
                            await setClickData(value);
                            await SetOpenDanhGia(true);
                          }}
                        >
                          <IconHistory style={{ cursor: "pointer" }} />{" "}
                        </center>
                      )}
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
      {openDanhGia && (
        <ModalDanhGia
          title={"Đánh giá giáo viên"}
          dataIdDetail={clickData}
          visible={openDanhGia}
          onClose={() => SetOpenDanhGia(false)}
        />
      )}
      {openAccept && (
        <ModalDetailRegisterCourse
          title={"Điểm từng học phần"}
          dataIdDetail={clickData}
          visible={openAccept}
          onClose={() => setOpenAccept(false)}
        />
      )}
      {openCacel && (
        <ModalCacel
          title={"Hủy học phần"}
          data={clickData}
          visible={openCacel}
          onClose={() => setOpenCacel(false)}
        />
      )}
    </div>
  );
};
