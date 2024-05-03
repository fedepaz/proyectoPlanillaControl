// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted succesfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className=" p-4">
      <BackButton />
      <h1 className=" text-3xl my-4">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className=" flex flex-col items-center  border-2 border-s-sky-400 rounded-xl w-fit p-8 mx-auto">
          <h3 className=" text-2xl">
            Are You Sure You Want to delete this book?
          </h3>
          <div className=" my-4">
            <span className=" text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>

          <div className=" my-4">
            <span className=" text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>

          <div className=" my-4">
            <span className=" text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>

          <div className=" my-4">
            <span className=" text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <button
            className=" p-4 bg-red-600 text-white m-8 rounded w-full"
            onClick={handleDeleteBook}
          >
            Delete It!!!
          </button>
        </div>
      )}
    </div>
  );
};
export default DeleteBooks;
