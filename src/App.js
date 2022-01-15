import s from "./App.module.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import Searchbar from "./components/Searchbar/Searchbar";
import getImg from "./search/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Error from "./components/Error/Error";
import Modal from "./components/Modal/Modal";
import HomePage from "./components/HomePage/HomePage";

export default function App() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [cardImg, setCardImg] = useState(null);
  const [imgAlt, setImgAlt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [button, setButton] = useState(false);
  const refToScroll = useRef(null);

  const getImage = useCallback(async () => {
    try {
      setIsLoading(true);
      const cardsNew = await getImg(query, page);
      if (cardsNew.length === 0) {
        toast("😿 Sorry, there aren't pictures here", {
          position: "bottom-center",
          autoClose: 3000,
        });
        setButton(false);
        setIsLoading(false);
        return;
      }
      setCards((state) => [...state, ...cardsNew]);
      refToScroll.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setButton(true);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setButton(false);
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    setButton(false);
    setIsLoading(false);
    if (!query) {
      return;
    }
    getImage();
  }, [getImage, page, query]);

  const handleImgClick = (cardImg, imgAlt) => {
    setCardImg(cardImg);
    setImgAlt(imgAlt);
  };
  const toggleModal = () => {
    setShowModal((state) => !state);
  };
  const handlePageClick = () => setPage((state) => state + 1);
  const handleSubmitForm = (key) => {
    setQuery(key);
    setPage(1);
    setCards([]);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleSubmitForm} />
      {cards.length === 0 && !isLoading && !error && <HomePage />}

      {error && <Error />}
      {cards.length > 0 && (
        <ImageGallery
          cards={cards}
          onClick={toggleModal}
          imgData={handleImgClick}
          refForScroll={refToScroll}
        />
      )}
      {isLoading && (
        <div className={s.wrapper}>
          <Loader
            arialLabel="loading-indicator"
            type="Hearts"
            color="#e60e0e"
            height="60"
            width="60"
          />
        </div>
      )}
      {button && !isLoading && <Button onClick={handlePageClick} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={cardImg} alt={imgAlt} />
        </Modal>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
