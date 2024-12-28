import React, { useEffect, useState } from "react";
import "./index.scss";
import { APIRegister } from "src/services/connectAPI/auth";
import { useNavigate } from "react-router-dom";

const Register = (e) => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    setMsg("");
    if (e.key === "Enter" || e === "Enter") {
      const ret = await APIRegister({ username: username, password: password });
      if (ret === 1) {
        setMsg("Đăng ký thành công");
        window.open("/login", "_parent");
      } else if (ret === 0) {
        setMsg("Đăng ký thất bại");
      }
    }
  };
  useEffect(() => {
    setMsg("");
  }, []);
  return (
    <div className="wrapperAuthFrom w-screen flex justify-center items-center h-screen ">
      <div className="login-form">
        <div className="login-content rounded-lg text-[16px]" onKeyDown={Login}>
          <p className="text-[36px] text-[#0B847A] front-bold leading-9 mb-20  flex justify-center items-center">
            ĐĂNG KÝ
          </p>
          <div className="mt-2">
            <span>Tên đăng nhập</span>
          </div>
          <div className="login-span h-[40px]">
            <input
              name="txt_name"
              type="text"
              className="login-textbox h-[40px]"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <span>Mật khẩu</span>
          </div>
          <div className="login-span h-[40px]">
            <input
              name="txt_name"
              type="password"
              className="login-textbox h-[40px]"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon-view-pass">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="eye"
                className="svg-inline--fa fa-eye fa-w-18"
                role="img"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                />
              </svg>
            </span>
          </div>

          <div
            className="bg-[#0B847A] m-auto  py-3 px-4 text-white w-fit cursor-pointer rounded-md mt-5 flex justify-center items-center"
            onClick={() => Login("Enter")}
          >
            Đăng ký
          </div>
          <div>
            <p className="mt-5 text-center">
              Bạn đã có tài khoản?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 italic cursor-pointer"
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
