import { useState, useEffect } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const logo = "https://storage.123fakturera.se/public/icons/diamond.png";
const FLAG_EN = "https://storage.123fakturere.no/public/flags/GB.png";
const FLAG_SE = "https://storage.123fakturere.no/public/flags/SE.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [flag, setFlag] = useState(FLAG_EN);
  const { i18n } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = (lang, flagUrl,code) => {
    setLanguage(lang);
    setFlag(flagUrl);
    setDropdownOpen(false);
    i18n.changeLanguage(code); 
    localStorage.setItem("lang", code);
  };

  useEffect(() => {
    const closeDropdown = () => setDropdownOpen(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);
  
  const { t } = useTranslation();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </Link>

        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>{t("Home")}</Link>
          <Link to="/order" onClick={() => setIsOpen(false)}>{t("Order")}</Link>
          <Link to="/customers" onClick={() => setIsOpen(false)}>{t("Our Customers")}</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>{t("About Us")}</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>{t("Contact Us")}</Link>

          {/* dropdown inside nav in desktop */}
          <div className="dropdown desktop-only" onClick={toggleDropdown}>
            <button className="dropbtn">
              <span>{language}</span>
              <img src={flag} alt="flag" className="flag-img" />
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <button onClick={() => handleLanguageChange("English",FLAG_EN, "en")}>
                  English<img src={FLAG_EN} alt="English" className="flag-img" /> 
                </button>
                <button onClick={() => handleLanguageChange("Svenska",FLAG_SE,"sv")}>
                  Svenska<img src={FLAG_SE} alt="Swedish" className="flag-img" /> 
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* dropdown separate for mobile */}
        <div className="dropdown mobile-only" onClick={toggleDropdown}>
          <button className="dropbtn">
            <span>{language}</span>
            <img src={flag} alt="flag" className="flag-img" />
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <button onClick={() => handleLanguageChange("English", FLAG_EN,"en")}>
                 English<img src={FLAG_EN} alt="English" className="flag-img" />
              </button>
              <button onClick={() => handleLanguageChange("Svenska", FLAG_SE,"sv")}>
                Svenska<img src={FLAG_SE} alt="Swedish" className="flag-img" /> 
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
