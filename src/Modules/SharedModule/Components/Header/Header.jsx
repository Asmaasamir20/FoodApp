import React from "react";

export default function Header({title,titlee,description,imgUrl}) {
  return (
    <>
      <div className="Header my-3">
        <div className="container-fluid">
          <div className="row p-4">
            <div className="col-md-8 d-flex justify-content-center align-items-center">
              <div className="header-content px-5 text-white">
                <h2> {title} <span>{titlee}</span> </h2>
                <p className="pe-4">
                  {description}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="image-header text-center w-75">
                <img src={imgUrl} alt="" className="w-75" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
