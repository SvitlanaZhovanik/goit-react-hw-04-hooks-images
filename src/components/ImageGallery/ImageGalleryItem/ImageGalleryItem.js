import s from "./ImageGalleryItem.module.css";
import React from "react";
import PropTypes from "prop-types";

const ImageGalleryItem = ({
  id,
  mini,
  max,
  tags,
  onClick,
  imgData,
  refForScroll,
}) => {
  const handleClick = () => {
    imgData(max, tags);
    onClick();
  };
  return (
    <li className={s.item} ref={refForScroll} id={id}>
      <img
        className={s.image}
        src={mini}
        alt={tags}
        loading="lazy"
        onClick={handleClick}
      />
    </li>
  );
};
ImageGalleryItem.propType = {
  id: PropTypes.string.isRequired,
  mini: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  imgData: PropTypes.func.isRequired,
  refForScroll: PropTypes.object,
};
export default ImageGalleryItem;
