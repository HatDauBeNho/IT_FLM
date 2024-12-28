import React, { useState } from "react";
import { Col, Modal, Row } from "antd";
import { useTranslation } from "react-i18next";
import "../../../../assets/modalStyle/postNews.scss";
import { useDispatch } from "react-redux";
import BaseButton from "../../Button/BaseButton";
import LabelInput from "../../LabelInput";
import { setLoadData, setOpenModalAddProduct } from "src/services/store";
import { IconUpLoad } from "src/assets/icons";
import InputText from "../../Input/InputText";
import {
  APIAddCourse,
  APIDeleteClasroom,
  APIDeleteCourse,
} from "src/services/connectAPI/admin";
import { openNotificationWithIcon } from "src/components/function/notify";
import { GetValueStore } from "src/components/function";

const ModalDeleteLop = ({ title, data, visible, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { StoreLoadData } = GetValueStore();
  const handleSave = async () => {
    try {
      const response = await APIDeleteClasroom(data.classId);
      if (response?.status === 1) {
        onClose();
        openNotificationWithIcon("success", "Bạn xoá thành công!");
        setLoadData(!StoreLoadData, dispatch);
      } else {
        openNotificationWithIcon("error", "Xoá thất bại, vui lòng thử lại!");
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
            content={"Xóa"}
            typeBtn="btnOrange"
            icon={<IconUpLoad />}
            handleClick={handleSave}
          />,
        ]}
      >
        <Row style={{ margin: "1.5rem 0" }}>
          <Col className="text-[26px] flex items-center justify-center w-full text-red-500">
            Bạn có đồng ý xóa lớp này không ?
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalDeleteLop;
