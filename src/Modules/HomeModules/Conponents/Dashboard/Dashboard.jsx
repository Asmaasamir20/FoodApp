import React from 'react'
import header from "../../../../assets/images/headerrr.png";
import Header from './../../../SharedModule/Components/Header/Header';
export default function Dashboard() {
  return (
    <>
    <Header title={"Welcome"} titlee={"Upskilling !"} description={"This is a welcoming screen for the entry of the application ,you can now see the options"} imgUrl={header}/>
    </>
  )
}
