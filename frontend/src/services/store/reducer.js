import key from "./key";
const initialState = {
  StoreSelectTypeIP: "",
  StoreOpenModalCourse: false,
  StoreOpenModalLop: false,
  toogleMenu: false,
  textSearch: "",
  StoreSelectCourseId: "",
  StoreSelectGiaoVienId: "",
  StoreSelectHocKyId: "",
  StoreSelectHocKy: 1,
  StoreLoadData: false,
  StoreOpenModalDetail: false,
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case key.SELECT_TYPE_IP:
      return { ...state, StoreSelectTypeIP: action.StoreSelectTypeIP };
    case key.OPEN_MODAL_COURSE:
      return { ...state, StoreOpenModalCourse: action.StoreOpenModalCourse };
    case key.TOGGLE_MENU:
      return { ...state, toogleMenu: action.toogleMenu };
    case key.TEXT_SEARCH:
      return { ...state, textSearch: action.textSearch };
    case key.OPEN_MODAL_LOP:
      return { ...state, StoreOpenModalLop: action.StoreOpenModalLop };
    case key.COURSE_ID:
      return { ...state, StoreSelectCourseId: action.StoreSelectCourseId };
    case key.TEACHER_ID:
      return { ...state, StoreSelectGiaoVienId: action.StoreSelectGiaoVienId };
    case key.HOCKY_ID:
      return { ...state, StoreSelectHocKyId: action.StoreSelectHocKyId };
    case key.LOAD_DATA:
      return { ...state, StoreLoadData: action.StoreLoadData };
    case key.SELECT_HOCKY:
      return { ...state, StoreSelectHocKy: action.StoreSelectHocKy };
    case key.OPEN_MODAL_DETAIL:
      return { ...state, StoreOpenModalDetail: action.StoreOpenModalDetail };
    default:
      return state;
  }
};

export default notesReducer;
