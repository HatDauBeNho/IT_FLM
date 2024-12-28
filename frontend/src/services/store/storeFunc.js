import key from "./key";

export const FuncStoreSelectTypeIP = (ret) => {
  return {
    type: key.SELECT_TYPE_IP,
    StoreSelectTypeIP: ret,
  };
};
export const FuncStoreOpenModalCourse = (ret) => {
  return {
    type: key.OPEN_MODAL_COURSE,
    StoreOpenModalCourse: ret,
  };
};
export const FuncStoreOpenModalLop = (ret) => {
  return {
    type: key.OPEN_MODAL_LOP,
    StoreOpenModalLop: ret,
  };
};
export const FuncStoreToggleMenu = (ret) => {
  return {
    type: key.TOGGLE_MENU,
    toogleMenu: ret,
  };
};
export const FuncStoreTextSearch = (ret) => {
  return {
    type: key.TEXT_SEARCH,
    textSearch: ret,
  };
};
export const FuncStoreIDCourse = (ret) => {
  return {
    type: key.COURSE_ID,
    StoreSelectCourseId: ret,
  };
};
export const FuncStoreIDGiaoVien = (ret) => {
  return {
    type: key.TEACHER_ID,
    StoreSelectGiaoVienId: ret,
  };
};
export const FuncStoreHocKy = (ret) => {
  return {
    type: key.SELECT_HOCKY,
    StoreSelectHocKy: ret,
  };
};
export const FuncStoreOpenModalDetail = (ret) => {
  return {
    type: key.OPEN_MODAL_DETAIL,
    StoreOpenModalDetail: ret,
  };
};
export const FuncStoreIDHocKy = (ret) => {
  return {
    type: key.HOCKY_ID,
    StoreSelectHocKyId: ret,
  };
};
export const FuncStoreLoadData = (ret) => {
  return {
    type: key.LOAD_DATA,
    StoreLoadData: ret,
  };
};
