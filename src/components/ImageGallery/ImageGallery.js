import s from "./ImageGallery.module.css";
import React from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";

const ImageGallery = ({ cards, onClick, imgData, refForScroll }) => {
  return (
    <ul className={s.gallery}>
      {cards.map(({ id, webformatURL, largeImageURL, tags }, idx) => {
        return (
          <ImageGalleryItem
            refForScroll={idx === cards.length - 12 ? refForScroll : null}
            key={id}
            id={id}
            mini={webformatURL}
            max={largeImageURL}
            tags={tags}
            onClick={onClick}
            imgData={imgData}
          />
        );
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  cards: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  imgData: PropTypes.func.isRequired,
  refForScroll: PropTypes.object,
};
export default ImageGallery;
