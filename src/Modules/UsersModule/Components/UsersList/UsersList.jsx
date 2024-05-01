import React from "react";
import Header from "./../../../SharedModule/Components/Header/Header";
import headerimg from "../../../../assets/images/header.png";
export default function UsersList() {
  return (
    <>
      <Header
        title={"Users "}
        titlee={"List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerimg}
      />
    </>
  );
}
