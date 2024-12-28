import { MethodGet, MethodPost } from "./meThod";
//đăng ký học phần
export const APIRegisterCourse = async (param) => {
  return await MethodPost(`/api/course/register?classId=${param}`);
};

//lấy danh sách lớp học phần có thể đăng ký trong thời gian hiện tại
export const APIGetAvailableClass = async (param) => {
  return await MethodPost("/api/class/getAvailable", param);
};

//xem danh sách học phần đã đăng ký
export const APISearchRegisteredCourse = async (param) => {
  return await MethodGet(`/api/course/registeredCourse?semesterId=${param}`);
};

//hủy đăng ký học phần
export const APICacelCourseStudent = async (param) => {
  return await MethodPost(`/api/course/cancel?classId=${param}`);
};

//xem kết quả học tập theo từng kỳ
export const APIGetResultCourse = async (param) => {
  return await MethodGet(`/api/result/get?classId=${param}`);
};

//đánh giá giảng viên
export const APIEvaluateGiaoVien = async (param) => {
  return await MethodPost("/api/evaluate", param);
};

//load danh sách câu hỏi
export const APIEvaluateQuestion = async (param) => {
  return await MethodGet("/api/evaluate/question", param);
};

//lấy danh sách lớp học phần được mở
export const APIGetClasroomOpen = async (param) => {
  return await MethodPost("/api/classroom/search", param);
};

//lấy dashboard cho sinh viên
export const APIGetDashboardStudent = async (param) => {
  return await MethodGet("/api/dashboard/student", param);
};

//thông kê điểm theo mức
export const APIStatisticPointStudent = async (param) => {
  return await MethodGet("/api/dashboard/statisticPoint", param);
};

// //lấy danh sách học phần
// export const APIGetCourseStudent = async (param) => {
//     return await MethodGet("/api/course/search", param)
// }
