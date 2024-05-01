import React, { useState } from "react";
import logo from "../../../../assets/images/logo.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import ResetPassword from "./../ResetPassword/ResetPassword";
export default function ForgetPassword() {
  let [btnLoading, setBtnLoading] = useState(true);
  let [errMsg, setErrMsg] = useState("");
  let navigate = useNavigate();
  async function sendDataForgetPass(values) {
    setBtnLoading(false);
    await axios
      .post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        values
      )
      .then(({ data }) => {
        navigate("/ResetPassword");
      })
      .catch((err) => {
        console.log("err");

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
    // console.log(values);
    sendDataForgetPass(values);
  };

  return (
    <>
      <div className="auth py-3">
        <div className="container-fluid vh-100">
          <div className="row vh-100  d-flex justify-content-center align-items-center">
            <div className="col-md-7 ">
              <div className="bg-white  p-5 rounded-4  ">
                <div className=" logo text-center">
                  <img src={logo} alt="" className="w-50" />
                </div>
                <div className="loginfo py-3">
                  <h3>Forgot Your Password?</h3>
                  <p className="text-text-white-50">
                    No worries! Please enter your email and we will send a
                    password reset link
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
                  
                  <button
                    type="submit"
                    className="btn btn-success mt-5 text-center w-100  text-white mt-4 py-2">
                    {btnLoading ? (
                      "submit"
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
