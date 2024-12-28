import React, { useEffect, useState } from "react";
import { Modal, Pagination } from "antd";
import { useTranslation } from "react-i18next";
import "../../../../assets/modalStyle/postNews.scss";
import { useDispatch } from "react-redux";
import { GetValueStore } from "src/components/function";
import { setStoreOpenModalDetail } from "src/services/store";
import { UiLoading } from "src/components/features/UiLoading";
import { APIGetResultCourse } from "src/services/connectAPI/student";

const ModalDetailRegisterCourse = ({
  title,
  visible,
  dataIdDetail,
  onClose,
}) => {
  const { StoreLoadData, textSearch } = GetValueStore();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [indexpage, setIndexPage] = useState(1);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    handleGetData();
  }, [textSearch, size, indexpage, StoreLoadData, dataIdDetail]);

  const handleGetData = async () => {
    setCheck(false);
    try {
      const ret = await APIGetResultCourse(dataIdDetail.classId);
      setData(ret?.data);
      setTotal(ret?.data.length);
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
  const handleCancel = () => {
    setStoreOpenModalDetail(false, dispatch);
  };
  return (
    <>
      <Modal
        maskClosable={false}
        className="wrapperModalPostNews"
        title={dataIdDetail.courseName || "Cập nhật lại tên học phần"}
        centered
        width={800}
        open={visible}
        onCancel={onClose}
        footer={
          [
            // <BaseButton
            //   content={"Thêm mới"}
            //   typeBtn="btnOrange"
            //   icon={<IconUpLoad />}
            //   handleClick={handleSave}
            // />,
          ]
        }
      >
        <div className="table-container-class">
          <table className="table border-table">
            <thead className="style-table-title">
              <tr>
                {/* <th scope="col">#</th> */}
                {/* <th scope="col">Tên học phần</th> */}
                <th scope="col">Điểm số</th>
                <th scope="col">Tên giảng viên</th>
              </tr>
            </thead>
            <tbody className="style-table-row">
              {Array.isArray(data) ? (
                data?.map((value, index) => (
                  <tr key={index}>
                    {/* <th className="style-table-row">
                      {(indexpage - 1) * size + index + 1}
                    </th> */}
                    {/* <td className="style-table-row">{value.courseName}</td> */}
                    <td className="style-table-row">
                      {value.point >= 0 ? value.point : ""}
                    </td>
                    <td className="style-table-row">{value.lectureName}</td>
                    {/* <td className="style-table-row">
                      {" "}
                      <div className="d-flex justify-content-around">
                        <center onClick={async () => {}}>
                          <IconEdit
                            fill="#F85C22"
                            style={{ cursor: "pointer" }}
                          />
                        </center>
                      </div>
                    </td> */}
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
          {!check && <UiLoading />}
          {/* <div className="d-flex pt-4">
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
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailRegisterCourse;
