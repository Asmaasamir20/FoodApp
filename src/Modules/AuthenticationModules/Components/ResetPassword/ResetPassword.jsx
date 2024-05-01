import React, { useState } from "react";
import logo from "../../../../assets/images/logo.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function ResetPassword() {
  const [showOTp, setShowOTp] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let [btnLoading, setBtnLoading] = useState(true);
  let [errMsg, setErrMsg] = useState("");
  let navigate = useNavigate();
  async function sendDataResetPass(values) {
    setBtnLoading(false);
    await axios
      .post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", values)
      .then(({ data }) => {
        navigate("/LogIn");
      })
      .catch((err) => {
        setErrMsg(err.response.data.message);
      });
    setBtnLoading(true);
  }
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    sendDataResetPass(values);
  };

  return (
    <>
      <div className="auth py-3">
        <div className="container-fluid">
          <div className="row  d-flex justify-content-center align-items-center">
            <div className="col-md-6 ">
              <div className="bg-white p-5 rounded-4  ">
                <div className=" logo text-center">
                  <img src={logo} alt="" className="w-50" />
                </div>
                <div className="loginfo py-3">
                  <h3>Reset Password</h3>
                  <p className="text-text-white-50">
                    Please Enter Your Otp or Check Your Inbox
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
                      name="OTP"
                      type={showOTp ? "text" : "password"}
                      className={`form-control ${
                        errors.seed ? "is-invalid" : ""
                      }`}
                      placeholder="OTP"
                      {...register("seed", {
                        required: "OTP  is Required",
                       
                      })}
                    />
                    <span className="input-group-text " id="basic-addonl">
                      <i
                       className={`fa-regular ${showOTp?"fa-eye main-color":"fa-eye-slash "}`}
                        onClick={() => setShowOTp(!showOTp)}></i>
                    </span>
                  </div>
                  {errors.seed && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}

                  <div className="input-group  mb-3 inputbg">
                    <span className="input-group-text " id="basic-addonl">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      name="new password"
                      type={showNewPassword ? "text" : "password"}
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="New Password"
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
                        className={`fa-regular ${showNewPassword?"fa-eye main-color":"fa-eye-slash "}`}
                        onClick={() => setShowNewPassword(!showNewPassword)}></i>
                    </span>
                  </div>
                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.confirmPassword.message}
                    </p>
                  )}

                  <div className="input-group  mb-3 inputbg">
                    <span className="input-group-text " id="basic-addonl">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="Confirm New Password"
                      {...register("confirmPassword", {
                        required: "password  is Required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
                          message:
                            "confirmPassword must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
                        },
                      })}
                    />
                    <span className="input-group-text " id="basic-addonl">
                      <i
                          className={`fa-regular ${showConfirmPassword?"fa-eye main-color":"fa-eye-slash "}`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                    </span>
                  </div>
                  {errors.confirmPassword && (
                    <p className="alert alert-danger">
                      {errors.confirmPassword.message}
                    </p>
                  )}

                  <div className="error-message alert alert-danger">
                    <span>{errMsg}</span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success text-center w-100  text-white mt-4 py-2">
                    {btnLoading ? (
                      "Reset Password"
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
