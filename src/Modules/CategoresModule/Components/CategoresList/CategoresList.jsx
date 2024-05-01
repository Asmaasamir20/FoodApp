import React, { useState, useEffect } from "react";
import Header from "./../../../SharedModule/Components/Header/Header";
import headerimg from "../../../../assets/images/header.png";
import axios from "axios";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "../../../SharedModule/Components/Pagination/pagination.css";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import DeleteData from "../../../SharedModule/Components/DeleteData/DeleteData";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import { Button, ModalFooter } from "react-bootstrap";
import { toast } from "react-toastify";

export default function CategoresList() {
  let token = localStorage.getItem("token");
  let [btnLoading, setBtnLoading] = useState(true);
  let [loadingState, setLoadingState] = useState(true);
  const [catId, setCatId] = useState("");
  const [name, setName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setValue("name", "");
    setIsUpdate(false);
  };
  const handleShow = () => setShow(true);
  // -----
  const [showDeleteData, setShowDeleteData] = useState(false);
  const handleCloseDeleteData = () => setShowDeleteData(false);
  const handleShowDeleteData = (id) => {
    setCatId(id);
    setShowDeleteData(true);
  };
  // -----
  // add categores
  const addCategoresList = async (values) => {
    setBtnLoading(false);
    try {
      let data = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/Category/`,
        values,
        {
          headers: { Authorization: token },
        }
      );
      setLoadingState(false);

      handleClose();
      toast.success("Add successful!");
      getCategoresList();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setBtnLoading(true);
  };
  // -------------

  // get categores
  const [pageNumber, setPageNumber] = useState(0);
  const [categoresList, setstateCategoresList] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Add state for totalPages
  const getCategoresList = async () => {
    try {
      let { data } = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=6&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: token },
        }
      );
      // console.log(data.data);
      setstateCategoresList(data.data);
      setTotalPages(data.totalNumberOfPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingState(false);
    }
  };
  //  delete categores
  const onDeleteSubmit = async () => {
    setBtnLoading(false);
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
        {
          headers: { Authorization: token },
        }
      );
      setLoadingState(false); // Change variable name
      handleCloseDeleteData();
      toast.error("DELETED");
      getCategoresList();
    } catch (err) {
      console.log(err);
    }
    setBtnLoading(true);
  };
  //  update categores
  const handleUpdate = (id, name) => {
    setName(name);
    setValue("name", name);
    setCatId(id);

    setIsUpdate(true);

    setShow(true);
    // console.log(name, id);
  };
  const onUpdateSubmit = async (values) => {
    setBtnLoading(false);
    try {
      await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
        values,
        {
          headers: { Authorization: token },
        }
      );
      setLoadingState(false);
      handleClose();
      toast.success("Updated successfully!");
      setIsUpdate(false);
      getCategoresList();
    } catch (err) {
      console.log(err);
    }
    setBtnLoading(true);
  };

  // form
  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // const onSubmit = (values) => {
  //   addCategoresList(values);
  //   // onUpdateSubmit(values);
  // };
  //

  useEffect(() => {
    getCategoresList();
  }, [pageNumber]); // Run useEffect when pageNumber changes
  // ---------------
  if (loadingState) {
    // Change variable name
    return <Loading />;
  }
  return (
    <div className="">
      <Header
        title={"Categories "}
        titlee={"item"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerimg}
      />

      <div className="my-3">
        <div className="container-fluid">
          <div className="row p-4">
            <div className="col-md-6">
              <h4>Categories Table Details</h4>
              <span>You can check all details</span>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <button
                onClick={handleShow}
                className="btn btn-success w-50 font-w">
                Add New Category
              </button>
            </div>
          </div>
          <div className="row px-5 mt-3 ">
            <table className="table">
              <thead>
                <tr className="bg-secondary text-center">
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">creationDate</th>
                  <th scope="col">modificationDate</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {categoresList.length > 0 ? (
                  categoresList.map((item, index) => (
                    <tr key={index} className="text-center">
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.creationDate}</td>
                      <td>{item.modificationDate}</td>
                      <td>
                        <i className="fa-regular fa-eye text-info cursor-pointer "></i>
                        <i
                          onClick={() => handleUpdate(item.id, item.name)}
                          className="fa-regular fa-pen-to-square px-2  text-warning cursor-pointer"></i>
                        <i
                          onClick={() => handleShowDeleteData(item.id)}
                          className="fa-solid fa-trash-can text-danger cursor-pointer"></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <NoData />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-3">
            <ResponsivePagination
              current={pageNumber}
              total={totalPages}
              onPageChange={setPageNumber}
            />
          </div>
        </div>
        {/* adddd & update*/}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>{isUpdate ? "update" : "Add Category"}</h3>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={handleSubmit(
                isUpdate ? onUpdateSubmit : addCategoresList
              )}>
              <div className="input-group  mb-3 inputbg">
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Category Name"
                  {...register("name", {
                    required: "name is Required",
                  })}
                />
              </div>
              {errors.name && (
                <p className="alert alert-danger">{errors.name.message}</p>
              )}

              <button
                type="submit"
                className="btn btn-success text-center w-100 main-colorbg text-white mt-4 py-2">
                {btnLoading ? (
                  isUpdate ? (
                    "update"
                  ) : (
                    "Save"
                  )
                ) : (
                  <i className="fa fa-spin fa-spinner"></i>
                )}
              </button>
            </form>
          </Modal.Body>
        </Modal>
        {/* deletee */}
        <Modal show={showDeleteData} onHide={handleCloseDeleteData}>
          {/* <Modal.Header closeButton></Modal.Header> */}
          <Modal.Body>
            <div
              onClick={handleCloseDeleteData}
              className="text-end fa-xl text-danger cursor-pointer">
              <i className="fa-solid fa-xmark"></i>
            </div>
            <DeleteData deleteItem={"Category"} />
          </Modal.Body>
          <ModalFooter>
            <Button className="btnDelet" onClick={onDeleteSubmit}>
              {btnLoading ? (
                "Delete this item"
              ) : (
                <i className="fa fa-spin fa-spinner"></i>
              )}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
