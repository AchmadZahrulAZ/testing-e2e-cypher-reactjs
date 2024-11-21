import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "../redux/slices/languageSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { language, translations } = useSelector((state) => state.language);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">{translations[language].navbarTitle}</span>
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(toggleLanguage())}
        >
          {translations[language].switchLanguage}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
