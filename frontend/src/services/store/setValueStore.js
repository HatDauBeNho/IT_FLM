import {
    FuncStoreOpenModalCourse,
    FuncStoreSelectTypeIP,
    FuncStoreToggleMenu,
    FuncStoreTextSearch,
    FuncStoreOpenModalLop,
    FuncStoreIDCourse,
    FuncStoreLoadData,
    FuncStoreIDGiaoVien,
    FuncStoreIDHocKy,
    FuncStoreHocKy,
    FuncStoreOpenModalDetail
} from './storeFunc';
export const setStoreSelectTypeIP = async (value, dispatch) => await dispatch(FuncStoreSelectTypeIP(value));
export const setOpenModalAddProduct = async (value, dispatch) => await dispatch(FuncStoreOpenModalCourse(value));
export const setToggleMenu = async (value, dispatch) => await dispatch(FuncStoreToggleMenu(value));
export const setTextSearch = async (value, dispatch) => await dispatch(FuncStoreTextSearch(value));
export const setOpenModalAddLop = async (value, dispatch) => await dispatch(FuncStoreOpenModalLop(value));
export const setStoreIDCourse = async (value, dispatch) => await dispatch(FuncStoreIDCourse(value));
export const setStoreIDHocKy = async (value, dispatch) => await dispatch(FuncStoreIDHocKy(value));
export const setStoreIDGiaoVien = async (value, dispatch) => await dispatch(FuncStoreIDGiaoVien(value));
export const setStoreHocKy = async (value, dispatch) => await dispatch(FuncStoreHocKy(value));
export const setStoreOpenModalDetail = async (value, dispatch) => await dispatch(FuncStoreOpenModalDetail(value));

export const setLoadData = async (value, dispatch) => await dispatch(FuncStoreLoadData(value));