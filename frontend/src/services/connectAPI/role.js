import { MethodGet, MethodPost } from "./meThod";
//đăng ký học phần
export const APIGetRoleUsername = async (param) => {
  return await MethodGet("/api/info/get", param);
};
