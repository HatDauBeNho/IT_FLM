import { MethodGet, MethodPost } from "./meThod"
//lấy danh sách học phần đang giảng dạy
export const APIGetTaught = async (param) => {
    return await MethodGet(`/api/course/currentTaught?semesterId=${param}`)
}

//lấy danh sách sinh viên theo từng học phần giảng dạy
export const APIGetStudentByTaught = async (param) => {
    return await MethodPost("/api/course/getListStudent", param)
}

//nhập điểm cho sinh viên
export const APIInputPoint = async (param) => {
    return await MethodPost("/api/result/enter", param)
}

//dashboard cho giáo viên
export const APIDashboardLecture = async (param) => {
    return await MethodGet("/api/dashboard/lecture", param)
}

//thống kê số lớp học được giảng dạy theo từng học kỳ
export const APIStatisticTeacher = async (param) => {
    return await MethodGet("/api/dashboard/statisticCurrentTaught", param)
}