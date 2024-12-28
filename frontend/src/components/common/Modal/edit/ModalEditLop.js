import React, { useState } from "react";
import { Col, Modal, Row } from "antd";
import { useTranslation } from "react-i18next";
import "../../../../assets/modalStyle/postNews.scss";
import { useDispatch } from "react-redux";
import BaseButton from "../../Button/BaseButton";
import LabelInput from "../../LabelInput";
import { setOpenModalAddProduct } from "src/services/store";
import { IconUpLoad } from "src/assets/icons";
import InputText from "../../Input/InputText";
import { APIAddCourse, APIUpdateCourse } from "src/services/connectAPI/admin";
import { openNotificationWithIcon } from "src/components/function/notify";

const ModalEditLop = ({ title, data, visible, onClose }) => {
  
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  const [datapost, setDataPost] = useState({
    courseId: "",
    condition: "",
    credit: "",
  });

  const handleSave = async () => {
    if (
      !datapost.courseId ||
      !datapost.condition ||
      !datapost.credit
    ) {
      setError({
        isError: true,
        msg: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }
    const formPost = {
      courseId: datapost.courseId,
      condition: datapost.condition,
      credit: datapost.credit,
    };
    try {
      const response = await APIUpdateCourse(formPost);
      if (response?.status === 1) {
        openNotificationWithIcon("success", "Bạn đã thêm thành công!");
        onClose();
      } else {
        openNotificationWithIcon("error", "Thêm thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error while saving course:", error);
      openNotificationWithIcon("error", "Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <>
      <Modal
        maskClosable={false}
        className="wrapperModalPostNews"
        title={t(title)}
        centered
        width={800}
        open={visible}
        onCancel={handleCancel}
        footer={[
          <BaseButton
            content={"Cập nhật"}
            typeBtn="btnOrange"
            icon={<IconUpLoad />}
            handleClick={handleSave}
          />,
        ]}
      >
        <Row>
          <Col span={10}>
            <LabelInput text={"Tên học phần"} />
          </Col>
          <Col span={13}>
            <InputText
              focus
              text={datapost.courseId}
              setText={(value) =>
                setDataPost({ ...datapost, courseId: value })
              }
              placeholder={"Tên học phần"}
              maxLength={155}
              typeInput={`${!datapost.courseId && error.isError
                ? "checkEmptyText baseInput"
                : "baseInput"
                }`}
            />
          </Col>
        </Row>
        <Row style={{ margin: "1.5rem 0" }}>
          <Col span={10}>
            <LabelInput text={"Mã định danh của học phần tiên quyết"} />
          </Col>
          <Col span={13}>
            <InputText
              typeInput={`${!datapost.condition && error.isError
                ? "checkEmptyText baseInput"
                : "baseInput"
                }`}
              text={datapost.condition}
              setText={(value) =>
                setDataPost({ ...datapost, condition: value })
              }
              placeholder={"Mã định danh của học phần tiên quyết"}
            />
          </Col>
        </Row>
        <Row style={{ margin: "1.5rem 0" }}>
          <Col span={10}>
            <LabelInput text={"Số tín chỉ"} />
          </Col>
          <Col span={13}>
            <InputText
              typeInput={`${!datapost.credit && error.isError
                ? "checkEmptyText baseInput"
                : "baseInput"
                }`}
              text={datapost.credit}
              setText={(value) => setDataPost({ ...datapost, credit: value })}
              placeholder={"Số tín chỉ"}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalEditLop;
