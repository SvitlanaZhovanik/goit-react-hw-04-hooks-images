import s from "../Searchbar/searchbar.module.css";
import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Logo } from "../../img/search.svg";

export default function Searchbar({ onSubmit }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    let { value } = evt.target[1];
    if (value === "") {
      return;
    }
    onSubmit(value);
    evt.currentTarget.reset();
  };
  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <Logo />
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
