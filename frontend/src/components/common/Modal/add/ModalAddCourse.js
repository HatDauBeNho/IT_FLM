import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import "../../../../assets/modalStyle/postNews.scss";
import { useDispatch } from "react-redux";
import BaseButton from "../../Button/BaseButton";
import LabelInput from "../../LabelInput";
import { GetValueStore } from "src/components/function";
import {
  setLoadData,
  setOpenModalAddProduct,
  setStoreIDCourse,
} from "src/services/store";
import { IconUpLoad } from "src/assets/icons";
import InputText from "../../Input/InputText";
import { APIAddCourse } from "src/services/connectAPI/admin";
import { openNotificationWithIcon } from "src/components/function/notify";
import { UiSelectTypeCourse } from "../../UiSelectSoftware/UiSelectTypeCourse";
import { isValidCourseName } from "src/components/function/functionCommon";

const ModalAddCourse = ({ title }) => {
  const { StoreOpenModalCourse, StoreSelectCourseId, StoreLoadData } =
    GetValueStore();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });
  const [datapost, setDataPost] = useState({
    courseName: "",
    credit: 1,
    condition: StoreSelectCourseId,
  });
  useEffect(() => {
    setDataPost((prev) => ({
      ...prev,
      condition: StoreSelectCourseId,
    }));
  }, [StoreSelectCourseId]);

  const handleSave = async () => {
    if (
      !datapost.courseName ||
      !datapost.condition ||
      !isValidCourseName(datapost.courseName)
    ) {
      setError({
        isError: true,
        msg: "Vui lòng điền chữ hoặc chữ với số!",
      });
      return;
    }
    const formPost = {
      courseName: datapost.courseName,
      condition: datapost.condition,
      credit: datapost.credit,
    };
    try {
      const response = await APIAddCourse(formPost);
      if (response?.status === 1) {
        setOpenModalAddProduct(false, dispatch);
        setLoadData(!StoreLoadData, dispatch);
        openNotificationWithIcon("success", "Bạn đã thêm thành công!");
      } else {
        openNotificationWithIcon("error", "Thêm thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error while saving course:", error);
      openNotificationWithIcon("error", "Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  const handleCancel = () => {
    setOpenModalAddProduct(false, dispatch);
  };
  return (
    <>
      <Modal
        maskClosable={false}
        className="wrapperModalPostNews"
        title={t(title)}
        centered
        width={800}
        open={StoreOpenModalCourse}
        onCancel={handleCancel}
        footer={[
          <BaseButton
            content={"Thêm mới"}
            typeBtn="btnOrange"
            icon={<IconUpLoad />}
            handleClick={handleSave}
          />,
        ]}
      >
        <Row>
          <Col span={8}>
            <LabelInput text={"Tên học phần"} />
          </Col>
          <Col span={13}>
            <InputText
              focus
              text={datapost.courseName}
              setText={(value) => {
                setDataPost({ ...datapost, courseName: value });
                setError((prev) => ({ ...prev, isError: false, msg: "" }));
              }}
              placeholder={"Tên học phần"}
              maxLength={155}
              typeInput={`${
                !datapost.courseName && error.isError
                  ? "checkEmptyText baseInput"
                  : "baseInput"
              }`}
            />
            <div
              style={{
                fontSize: "14px",
                color: "red",
                position: "relative",
                justifyContent: "center",
              }}
            >
              {error.msg}
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "1.5rem 0" }}>
          <Col span={8}>
            <LabelInput text={"Số tín chỉ"} />
          </Col>
          <Col span={13}>
            <InputText
              typeInput={`${
                !datapost.credit && error.isError
                  ? "checkEmptyText baseInput"
                  : "baseInput"
              }`}
              text={datapost.credit}
              setText={(value) => setDataPost({ ...datapost, credit: value })}
              placeholder={"Số tín chỉ"}
            />
          </Col>
        </Row>

        <Row className="" style={{ margin: "1.5rem 0" }}>
          <Col span={8}>
            <LabelInput text={"Tên học phần tiên quyết"} />
          </Col>
          <Col span={5}>
            <UiSelectTypeCourse
              onClick={(value) => {
                setStoreIDCourse(value, dispatch);
                setDataPost({ ...datapost, condition: value });
                setError((prev) => ({ ...prev, isError: false }));
              }}
              className={`${
                !datapost.condition && error.isError ? "checkEmptySelect" : ""
              }`}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalAddCourse;
