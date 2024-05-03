// eslint-disable-next-line no-unused-vars
import React from "react";
import BookSingleCard from "./BookSingleCard";
import PropTypes from "prop-types";

const BooksCard = ({ books }) => {
  return (
    <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};
BooksCard.propTypes = {
  books: PropTypes.array,
};

export default BooksCard;
