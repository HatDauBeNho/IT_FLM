import React, { useEffect, useState } from "react";
import { Modal, Pagination } from "antd";
import { useTranslation } from "react-i18next";
import "../../../../assets/modalStyle/postNews.scss";
import { useDispatch } from "react-redux";
import { GetValueStore } from "src/components/function";
import { setStoreOpenModalDetail } from "src/services/store";
import { IconUpLoad } from "src/assets/icons";
import {
  APIGetStudentByTaught,
  APIInputPoint,
} from "src/services/connectAPI/teacher";
import { UiLoading } from "src/components/features/UiLoading";
import BaseButton from "../../Button/BaseButton";
import { openNotificationWithIcon } from "src/components/function/notify";

const ModalDetailClassOpen = ({ title, dataId, onClose }) => {
  const { StoreLoadData, textSearch, StoreOpenModalDetail } = GetValueStore();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [indexpage, setIndexPage] = useState(1);
  const [check, setCheck] = useState(true);
  const [updatedPoints, setUpdatedPoints] = useState({});
  useEffect(() => {
    handleGetData();
  }, [textSearch, size, indexpage, StoreLoadData, dataId]);

  const handleGetData = async () => {
    setCheck(false);
    const param = {
      keySearch: "",
      classId: dataId.classId,
      option: {
        limit: size,
        offset: indexpage > 1 ? indexpage : 1,
        order: "asc",
      },
    };
    try {
      const ret = await APIGetStudentByTaught(param);
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
  const handleCancel = () => {
    setStoreOpenModalDetail(false, dispatch);
  };
  const handleInputChange = (studentId, value) => {
    setUpdatedPoints((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleEnterPoint = async () => {
    try {
      for (const studentId in updatedPoints) {
        const point = updatedPoints[studentId];
        if (point) {
          const param = {
            classId: dataId.classId,
            studentId: parseInt(studentId),
            point: parseFloat(point),
          };
          const ret = await APIInputPoint(param);
          if (ret?.status === 1) {
            openNotificationWithIcon(
              "success",
              "Bạn đã cập nhật điểm  thành công!"
            );
            onClose();
          } else {
            openNotificationWithIcon(
              "error",
              "Cập nhật điểm thất bại, vui lòng thử lại!"
            );
          }
        }
      }
      handleGetData();
    } catch (error) {}
  };
  return (
    <>
      <Modal
        maskClosable={false}
        className="wrapperModalPostNews"
        title={t(title)}
        centered
        width={800}
        open={StoreOpenModalDetail}
        onCancel={handleCancel}
        footer={[
          <BaseButton
            content={"Lưu"}
            typeBtn="btnOrange"
            icon={<IconUpLoad />}
            handleClick={handleEnterPoint}
          />,
        ]}
      >
        <div className="table-container-class">
          <table className="table border-table">
            <thead className="style-table-title">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sinh viên</th>
                <th scope="col" className="w-[100px]">Điểm của sinh viên</th>
                <th scope="col">Số điện thoại của sinh viên</th>
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
                    <td className="style-table-row">
                      <input
                        type="number"
                        className="input-point"
                        value={
                          updatedPoints[value.studentId] !== undefined
                            ? updatedPoints[value.studentId]
                            : value.point >= 0
                            ? value.point
                            : ""
                        }
                        onChange={(e) =>
                          handleInputChange(value.studentId, e.target.value)
                        }
                      />
                    </td>
                    <td className="style-table-row">{value.phoneNumber}</td>
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
      </Modal>
    </>
  );
};

export default ModalDetailClassOpen;
