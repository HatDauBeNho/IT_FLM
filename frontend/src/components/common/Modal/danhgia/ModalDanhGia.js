import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Radio, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import BaseButton from "../../Button/BaseButton";
import { setLoadData } from "src/services/store";
import { IconUpLoad } from "src/assets/icons";
import { openNotificationWithIcon } from "src/components/function/notify";
import { GetValueStore } from "src/components/function";
import {
  APIEvaluateGiaoVien,
  APIEvaluateQuestion,
} from "src/services/connectAPI/student";

const ModalDanhGia = ({ title, visible, onClose, dataIdDetail }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { StoreLoadData } = GetValueStore();

  const [questions, setQuestions] = useState([]); // Danh sách câu hỏi
  const [answers, setAnswers] = useState({}); // Lưu câu trả lời của từng câu hỏi
  const [feedback, setFeedback] = useState(""); // Lưu góp ý của sinh viên
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Lấy danh sách câu hỏi từ API
  const handleGetQuestions = async () => {
    try {
      const response = await APIEvaluateQuestion();
      if (response?.status === 1) {
        setQuestions(response.data || []);
      } else {
        openNotificationWithIcon("error", "Không thể tải danh sách câu hỏi!");
      }
    } catch (error) {
      console.error("Error while fetching questions:", error);
      openNotificationWithIcon("error", "Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  // Xử lý gửi đánh giá
  const handleSubmitEvaluation = async () => {
    const unansweredQuestions = questions.filter(
      (question, index) => !answers[index + 1]
    );

    if (unansweredQuestions.length > 0) {
      openNotificationWithIcon(
        "warning",
        "Vui lòng trả lời tất cả các câu hỏi!"
      );
      return;
    }
    if (!feedback.trim()) {
      openNotificationWithIcon("warning", "Vui lòng nhập nội dung góp ý!");
      return;
    }

    setIsSubmitting(true); // Bắt đầu trạng thái gửi
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, score]) => ({
        questionId: Number(questionId),
        score,
      })
    );

    const params = {
      answer: formattedAnswers,
      classId: dataIdDetail.classId,
      content: feedback,
    };

    try {
      const response = await APIEvaluateGiaoVien(params);
      if (response?.status === 1) {
        openNotificationWithIcon("success", "Đánh giá thành công!");
        setLoadData(!StoreLoadData, dispatch);
        onClose();
      } else {
        openNotificationWithIcon(
          "error",
          "Đánh giá thất bại, vui lòng thử lại!"
        );
      }
    } catch (error) {
      console.error("Error while submitting evaluation:", error);
      openNotificationWithIcon("error", "Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  // Xử lý thay đổi câu trả lời
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  useEffect(() => {
    if (visible) {
      handleGetQuestions();
    }
  }, [visible]);

  return (
    <Modal
      maskClosable={false}
      className="wrapperModalPostNews"
      title={t(title)}
      centered
      width={800}
      open={visible}
      onCancel={onClose}
      footer={[
        <BaseButton
          key="submit"
          content={"Gửi đánh giá"}
          typeBtn="btnOrange"
          icon={<IconUpLoad />}
          handleClick={handleSubmitEvaluation}
        />,
      ]}
    >
      <Row style={{ margin: "1.5rem 0" }}>
        <Col className="w-full">
          {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <div style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                {index + 1}. {question.content}
              </div>
              <Radio.Group
                onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
                value={answers[index + 1] || null}
              >
                {[1, 2, 3, 4, 5].map((score) => (
                  <Radio key={score} value={score}>
                    {score}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          ))}
          <div style={{ marginTop: "1.5rem" }}>
            <Input.TextArea
              rows={4}
              placeholder="Nhập góp ý của bạn (nếu có)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalDanhGia;
