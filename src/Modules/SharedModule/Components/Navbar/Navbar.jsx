import React from "react";
import { Link } from "react-router-dom";
import logoNav from "../../../../assets/images/avatar.png";
export default function Navbar({ loginData }) {
  const userEmail = loginData ? loginData.userEmail : null;
  const userName = loginData ? loginData.userName : null;

  return (
    <>
      {/* Navbar <span>{userEmail}</span> */}
      <nav className="navbar navbar-expand-lg bgNav mx-4 mt-3 rounded-4">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="allnav collapse navbar-collapse mt-2"
            id="navbarSupportedContent">
            <form className="d-flex  w-75 " role="search">
              <div className=" position-relative w-100  bginputNav ">
                <span className="position-absolute" id="basic-addonl">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  className="form-control me-2 rounded-5"
                  type="search"
                  placeholder="Search Here"
                  aria-label="Search"
                />
              </div>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  px-4">
              <li className="nav-item ">
                <Link
                  className="nav-link active pt-0"
                  aria-current="page"
                  to="#">
                  <img src={logoNav} alt="w-100 pt-0" />
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link className="nav-link active" aria-current="page" to="#">
                  {userName}
                </Link>
              </li>

              <li className="nav-item px-3">
                <Link className="nav-link active" aria-current="page" to="#">
                  <i className="fa-solid fa-angle-down"></i>
                </Link>
              </li>
              <li className="nav-item px-3">
                <Link className="nav-link active" aria-current="page" to="#">
                  <i className="fa-solid fa-bell"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
