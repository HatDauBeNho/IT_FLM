import { MethodDelete, MethodGet, MethodPost, MethodPut, MethodRegister } from "./meThod"
//api của admin

//tạo danh sách học phần 
export const APIAddCourse = async (param) => {
    const { courseName, maximumStudent,
        teacherId, condition, credit } = param
    try {
        const data = { courseName: courseName, maximumStudent: maximumStudent, teacherId: teacherId, condition: condition, credit: credit }
        return await MethodPost("/api/course/create", data)
    } catch (e) {
        return e
    }
}
//lấy danh sách học phần
export const APIGetCourse = async (param) => {
    return await MethodPost("/api/course/search", param)
}

//lấy danh sách sinh viên
export const APIGetStudent = async (param) => {
    return await MethodPost("/api/student/search", param)
}
//mở lớp học phần
export const APIOpenClasroom = async (param) => {
    return await MethodPost("/api/classroom/create", param)
}
//xoá lớp học phần
export const APIDeleteClasroom = async (param) => {
    return await MethodPut(`/api/classroom/delete?classId=${param}`)
}
//lấy danh sách giáo viên
export const APIGetTeacher = async (param) => {
    return await MethodPost("/api/lecture/search", param)
}
//cập nhật danh sách học phần
export const APIUpdateCourse = async (param) => {
    return await MethodPut("/api/course/update", param)
}

//xoá học phần 
export const APIDeleteCourse = async (param) => {
    return await MethodDelete(`/api/course/delete?courseId=${param}`)
}

//lấy danh sách học kỳ 
export const APIGetSemester = async (param) => {
    return await MethodGet("/api/semester/get")
}
//lấy danh sách học kỳ từng năm
export const APIGetSemesterInYear = async (param) => {
    return await MethodGet("/api/semester/beginNow")
}
//lấy dashboard cho admin
export const APIGetDashBoardAdmin = async (param) => {
    return await MethodGet("/api/dashboard/admin")
}