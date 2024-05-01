import React from "react";
import logo from "../../../../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  let navegate= useNavigate()
  let token = localStorage.getItem("token");
  const goToHome=()=>{
  if (token) return navegate("MasterLayOut")
  return navegate("/LogIn")

  
  }
  return (
    <>
      <div className="NotFound">
        <div className="container">
          <div className="row">
            <div className="col-md-4 p-0 m-0">
              <div className="image mt-3">
                <img src={logo} alt="" className=" w-100" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 ps-4 mt-5">
              <div className="">
                <h3>Oops.</h3>
                <h4 className="main-color">Page not found</h4>
                <p>
                  This Page doesn’t exist or was removed! <br /> We suggest you back to
                  home.
                </p>
                <button onClick={goToHome} className="btn btn-success btnwidth d-flex align-items-center justify-content-center"> <span><i className="fa-solid fa-arrow-left-long pe-3"></i></span> <span>Back To <br /> Home</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
