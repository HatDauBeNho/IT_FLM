import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "antd";
import { useTranslation } from "react-i18next";
import "../../../../assets/modalStyle/postNews.scss";
import { useDispatch } from "react-redux";
import BaseButton from "../../Button/BaseButton";
import LabelInput from "../../LabelInput";
import { GetValueStore } from "src/components/function";
import {
  setLoadData,
  setOpenModalAddLop,
  setStoreIDCourse,
  setStoreIDGiaoVien,
  setStoreIDHocKy,
} from "src/services/store";
import { IconUpLoad } from "src/assets/icons";
import InputText from "../../Input/InputText";
import { APIOpenClasroom } from "src/services/connectAPI/admin";
import { openNotificationWithIcon } from "src/components/function/notify";
import { UiSelectTypeCourse } from "../../UiSelectSoftware/UiSelectTypeCourse";
import { UiSelectGiaoVien } from "../../UiSelectGiaoVien/UiSelectGiaoVien";
import { UiSelectHocky } from "../../UiSelectHocky/UiSelectHocKy";

const ModalAddLop = ({ title }) => {
  const {
    StoreOpenModalLop,
    StoreLoadData,
    StoreSelectCourseId,
    StoreSelectGiaoVienId,
    StoreSelectHocKyId,
  } = GetValueStore();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });
  const [datapost, setDataPost] = useState({
    maximumStudent: 30,
    nameTeacher: StoreSelectGiaoVienId,
    hocKy: StoreSelectHocKyId,
    courseId: StoreSelectCourseId,
  });

  useEffect(() => {
    setDataPost((prev) => ({
      ...prev,
      nameTeacher: StoreSelectGiaoVienId,
      hocKy: StoreSelectHocKyId,
      courseId: StoreSelectCourseId,
    }));
  }, [StoreSelectGiaoVienId, StoreSelectHocKyId, StoreSelectCourseId]);

  const handleSave = async () => {
    if (!datapost.maximumStudent || !datapost.hocKy || !datapost.nameTeacher || !datapost.courseId) {
      setError({
        isError: true,
        msg: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }
    const formPost = {
      maximumStudent: datapost.maximumStudent,
      semesterId: datapost.hocKy,
      lectureId: datapost.nameTeacher,
      courseId: datapost.courseId,
    };
    try {
      const response = await APIOpenClasroom(formPost);
      if (response?.status === 1) {
        setOpenModalAddLop(false, dispatch);
        openNotificationWithIcon("success", "Bạn đã thêm thành công!");
        setLoadData(!StoreLoadData, dispatch);
      } else {
        openNotificationWithIcon("error", "Đặt tên trùng, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error while saving course:", error);
      openNotificationWithIcon("error", "Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  const handleCancel = () => {
    setOpenModalAddLop(false, dispatch);
  };

  return (
    <Modal
      maskClosable={false}
      className="wrapperModalPostNews"
      title={t(title)}
      centered
      width={800}
      open={StoreOpenModalLop}
      onCancel={handleCancel}
      footer={[
        <BaseButton
          key="submit"
          content={"Thêm mới"}
          typeBtn="btnOrange"
          icon={<IconUpLoad />}
          handleClick={handleSave}
        />,
      ]}
    >
      <Row>
        <Col span={10}>
          <LabelInput text={"Giới hạn sinh viên của lớp"} />
        </Col>
        <Col span={13}>
          <InputText
            focus
            text={datapost.maximumStudent}
            setText={(value) => setDataPost({ ...datapost, maximumStudent: value })}
            placeholder={"Giới hạn sinh viên của lớp"}
            maxLength={155}
            typeInput={`${
              !datapost.maximumStudent && error.isError ? "checkEmptyText baseInput" : "baseInput"
            }`}
          />
        </Col>
      </Row>

      <Row style={{ margin: "1.5rem 0" }}>
        <Col span={10}>
          <LabelInput text={"Học kỳ"} />
        </Col>
        <Col span={13}>
          <UiSelectHocky
            onClick={(value) => {
              setStoreIDHocKy(value, dispatch);
              setDataPost({ ...datapost, hocKy: value });
              setError((prev) => ({ ...prev, isError: false }));
            }}
            className={`selectInput ${!datapost.hocKy && error.isError ? "error-border" : ""}`}
          />
        </Col>
      </Row>

      <Row style={{ margin: "1.5rem 0" }}>
        <Col span={10}>
          <LabelInput text={"Tên giáo viên"} />
        </Col>
        <Col span={13}>
          <UiSelectGiaoVien
            onClick={(value) => {
              setStoreIDGiaoVien(value, dispatch);
              setDataPost({ ...datapost, nameTeacher: value });
              setError((prev) => ({ ...prev, isError: false }));
            }}
            className={`selectInput ${!datapost.nameTeacher && error.isError ? "error-border" : ""}`}
          />
        </Col>
      </Row>

      <Row style={{ margin: "1.5rem 0" }}>
        <Col span={10}>
          <LabelInput text={"Tên học phần"} />
        </Col>
        <Col span={13}>
          <UiSelectTypeCourse
            onClick={(value) => {
              setStoreIDCourse(value, dispatch);
              setDataPost({ ...datapost, courseId: value });
              setError((prev) => ({ ...prev, isError: false }));
            }}
            className={`selectInput ${!datapost.courseId && error.isError ? "error-border" : ""}`}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalAddLop;
