import React, { useState, useEffect } from "react";
import Header from "./../../../SharedModule/Components/Header/Header";
import headerimg from "../../../../assets/images/header.png";
import axios from "axios";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import NoDataa from "../../../../assets/images/no-data.png";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "../../../SharedModule/Components/Pagination/pagination.css";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import DeleteData from "../../../SharedModule/Components/DeleteData/DeleteData";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import { Button, ModalFooter } from "react-bootstrap";
import { toast } from "react-toastify";

export default function RecipesList() {
  const token = localStorage.getItem("token");
  const [btnLoading, setBtnLoading] = useState(true);
  const [loadingState, setLoadingState] = useState(true);
  const [catId, setCatId] = useState("");
  const [name, setName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [showDeleteData, setShowDeleteData] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [recipesList, setRecipesList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // ---
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    getRecipesList();
  }, [pageNumber]);

  const getRecipesList = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=4&pageNumber=${pageNumber}`,
        { headers: { Authorization: token } }
      );
      console.log(data);
      setRecipesList(data.data);
      setTotalPages(data.totalNumberOfPages);
      setLoadingState(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch recipes.");
    }
  };

  const addRecipesList = async (values) => {
    setBtnLoading(false);
    try {
      const response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/`,
        values,
        { headers: { Authorization: token } }
      );
      toast.success("Recipe added successfully!");
      handleClose();
      getRecipesList();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add recipe.");
    }
    setBtnLoading(true);
  };

  //  delete categores
  const deleteRecipe = async () => {
    setBtnLoading(false);
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${catId}`,
        { headers: { Authorization: token } }
      );
      toast.error("Recipe deleted successfully!");
      handleCloseDeleteData();
      getRecipesList();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete recipe.");
    }
    setBtnLoading(true);
  };

  const handleUpdate = (id, name) => {
    setName(name);
    setValue("name", name);
    setCatId(id);
    setIsUpdate(true);
    setShow(true);
  };

  const updateRecipe = async (values) => {
    setBtnLoading(false);
    try {
      await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${catId}`,
        values,
        { headers: { Authorization: token } }
      );
      toast.success("Recipe updated successfully!");
      handleClose();
      setIsUpdate(false);
      getRecipesList();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update recipe.");
    }
    setBtnLoading(true);
  };

  const handleClose = () => {
    setShow(false);
    setValue("name", "");
    setIsUpdate(false);
  };

  const handleShow = () => setShow(true);
  const handleCloseDeleteData = () => setShowDeleteData(false);
  const handleShowDeleteData = (id) => {
    setCatId(id);
    setShowDeleteData(true);
  };

  if (loadingState) {
    return <Loading />;
  }

  return (
    <div className="">
      <Header
        title={"Recipes "}
        titlee={"Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerimg}
      />

      <div className="my-3">
        <div className="container-fluid">
          <div className="row p-4">
            <div className="col-md-6">
              <h4>Recipes Table Details</h4>
              <span>You can check all details</span>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <button
                onClick={handleShow}
                className="btn btn-success w-50 font-w">
                Add New Recipe
              </button>
            </div>
          </div>
          <div className="row px-5 mt-3">
            <table className="table">
              <thead>
                <tr className="bg-secondary text-center">
                  <th scope="col">Item Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">tag</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {recipesList.length > 0 ? (
                  recipesList.map((item, index) => (
                    <tr key={index} className="text-center">
                      <th scope="row">{item.name}</th>
                      <td>
                        <div className="imagerecipe">
                          {item.imagePath ? (
                            <img
                              src={
                                "https://upskilling-egypt.com:3006/" +
                                item.imagePath
                              }
                              alt=""
                              className="w-100"
                            />
                          ) : (
                            <img
                              src={
                               NoDataa
                              }
                              alt=""
                              className="w-100"
                            />
                          )}
                        </div>
                      </td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                      <td>{item.tag ? item.tag.name : ""}</td>
                      <td>
                        {item.category && item.category.length > 0
                          ? item.category[0].name
                          : ""}
                      </td>
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
          <div className="d-flex justify-content-center">
            <ResponsivePagination
              current={pageNumber}
              total={totalPages}
              onPageChange={setPageNumber}
            />
          </div>
        </div>
      </div>
      {/* adddd & update*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isUpdate ? "Update" : "Add"} Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(isUpdate ? updateRecipe : addRecipesList)}>
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
      {/* deleeeeeeeet */}
      <Modal show={showDeleteData} onHide={handleCloseDeleteData}>
        <Modal.Body>
          <div
            onClick={handleCloseDeleteData}
            className="text-end fa-xl text-danger cursor-pointer">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <DeleteData deleteItem={"Recipe"} />
        </Modal.Body>
        <ModalFooter>
          <Button className="btnDelet" onClick={deleteRecipe}>
            {btnLoading ? (
              "Delete this item"
            ) : (
              <i className="fa fa-spin fa-spinner"></i>
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
