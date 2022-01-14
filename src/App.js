import s from "./App.module.css";
import React, { useState, useEffect, useCallback } from "react";
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
  const [itemToScroll, setItemToScroll] = useState(null);

  const getImage = useCallback(async () => {
    try {
      setIsLoading(true);
      await getImg(query, page).then((cardsNew) => {
        if (cardsNew.length === 0) {
          toast("😿 Sorry, there aren't pictures here", {
            position: "bottom-center",
            autoClose: 3000,
          });
          setButton(false);
          setIsLoading(false);
          return;
        }
        setCards((state) => {
          console.log(state);
          return page === 1 ? cardsNew : [...state, ...cardsNew];
        });
        setItemToScroll(page === 1 ? null : cardsNew[0].id);
        setButton(true);
        setIsLoading(false);
      });
    } catch (error) {
      setError(error);
      setButton(false);
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    setItemToScroll(null);
    setButton(false);
    setIsLoading(false);
    if (query !== "") {
      getImage();
    }
  }, [getImage, query]);

  useEffect(() => {
    document.getElementById(itemToScroll)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [cards, itemToScroll, page]);
  const handleImgClick = (cardImg, imgAlt) => {
    setCardImg(cardImg);
    setImgAlt(imgAlt);
  };
  const toggleModal = () => {
    setShowModal((state) => !state);
  };

  return (
    <div className={s.app}>
      <Searchbar
        onSubmit={(key) => {
          setQuery(key);
          setPage(1);
          setCards([]);
        }}
      />
      {cards.length === 0 && !isLoading && !error && <HomePage />}

      {error && <Error />}
      {cards.length > 0 && (
        <ImageGallery
          cards={cards}
          onClick={toggleModal}
          imgData={handleImgClick}
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
      {button && !isLoading && (
        <Button onClick={() => setPage((state) => state + 1)} />
      )}
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
