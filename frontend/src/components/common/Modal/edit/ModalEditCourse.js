import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "antd";
import { useTranslation } from "react-i18next";
import "../../../../assets/modalStyle/postNews.scss";
import { useDispatch } from "react-redux";
import BaseButton from "../../Button/BaseButton";
import LabelInput from "../../LabelInput";
import { setLoadData, setStoreIDCourse } from "src/services/store";
import { IconUpLoad } from "src/assets/icons";
import InputText from "../../Input/InputText";
import { APIUpdateCourse } from "src/services/connectAPI/admin";
import { openNotificationWithIcon } from "src/components/function/notify";
import { UiSelectTypeCourse } from "../../UiSelectSoftware/UiSelectTypeCourse";
import { GetValueStore } from "src/components/function";

const ModalEditCourse = ({ title, data, visible, onClose }) => {
  const { StoreSelectCourseId, StoreLoadData } = GetValueStore();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    isError: false,
    msg: "",  
  });
  const [datapost, setDataPost] = useState(data);
  useEffect(() => {
    if (visible) {
      setDataPost(data);
    }
  }, [data, visible]);

  const handleSave = async () => {
    if (!datapost.courseName || !datapost.credit) {
      setError({
        isError: true,
        msg: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }
    const formPost = {
      courseId: datapost.courseId,
      courseName: datapost.courseName,
      condition: StoreSelectCourseId,
      credit: datapost.credit,
    };
    try {
      const response = await APIUpdateCourse(formPost);
      if (response?.status === 1) {
        openNotificationWithIcon("success", "Bạn đã cập nhật thành công!");
        setLoadData(!StoreLoadData, dispatch);

        onClose();
      } else {
        openNotificationWithIcon(
          "error",
          "Cập nhật thất bại, vui lòng thử lại!"
        );
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
              text={datapost.courseName}
              setText={(value) =>
                setDataPost({ ...datapost, courseName: value })
              }
              placeholder={"Tên học phần"}
              maxLength={155}
              typeInput={`${
                !datapost.courseName && error.isError
                  ? "checkEmptyText baseInput"
                  : "baseInput"
              }`}
            />
          </Col>
        </Row>

        <Row style={{ margin: "1.5rem 0" }}>
          <Col span={10}>
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
          <Col span={10}>
            <LabelInput text={"Tên học phần tiên quyết"} />
          </Col>
          <Col span={13}>
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

export default ModalEditCourse;
