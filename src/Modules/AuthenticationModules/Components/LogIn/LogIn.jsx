import React, { useState } from "react";
import logo from "../../../../assets/images/logo.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function LogIn({saveLoginData}) {
  const [showPassword, setShowPassword] = useState(false);
  let [btnLoading, setBtnLoading] = useState(true);
  let [errMsg, setErrMsg] = useState("");
  let navigate = useNavigate();
  async function sendDataToApi(values) {
    setBtnLoading(false);
    await axios
      .post("https://upskilling-egypt.com:3006/api/v1/Users/Login", values)
      .then(({ data }) => {
        if (data.token) {
         
          toast.success("Login successful!");
          localStorage.setItem("token", data.token);
          saveLoginData()
          navigate("/MasterLayOut");
        }
      })
      .catch((err) => {
   

        setErrMsg(err.response.data.message);
      });
      setBtnLoading (true);
  }
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    // console.log(values);
    sendDataToApi(values);
  };

  return (
    <>
      <div className="auth py-3">
        <div className="container-fluid vh-100">
          <div className="row vh-100  d-flex justify-content-center align-items-center">
            <div className="col-md-7 ">
              <div className="bg-white p-5 rounded-4  ">
                <div className=" logo text-center">
                  <img src={logo} alt="" className="w-50" />
                </div>
                <div className="loginfo py-2">
                  <h3>Log In</h3>
                  <p className="text-text-white-50">
                    Welcome Back! Please enter your details
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group  mb-3 inputbg">
                    <span className="input-group-text " id="basic-addonl">
                      <i className="fa-solid fa-envelope icon"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your E-mail"
                      {...register("email", {
                        required: "Email is Required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}

                  <div className="input-group  mb-3 inputbg">
                    <span className="input-group-text " id="basic-addonl">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Password"
                      {...register("password", {
                        required: "password  is Required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
                          message:
                            "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
                        },
                      })}
                    />
                
                    <span className="input-group-text " id="basic-addonl">
                      <i
                        className={`fa-regular ${showPassword?"fa-eye main-color":"fa-eye-slash "}`}
                        onClick={() => setShowPassword(!showPassword)}></i>
                    </span>
                  </div>
                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="d-flex justify-content-between">
                    <Link className="text-black ">Register Now ?</Link>
                    <Link to="/ForgetPassword" className="main-color">Forgot password</Link>
                  </div>
                  <div className="error-message alert alert-danger">
                    <span>{errMsg}</span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success text-center w-100 main-colorbg text-white mt-4 py-2">
                    {btnLoading ? (
                      "Login"
                    ) : (
                      <i className="fa fa-spin fa-spinner"></i>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

