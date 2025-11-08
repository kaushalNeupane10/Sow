import{ useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import "./../styles/dashboardNavbar.css";

const FLAG_EN = "https://storage.123fakturere.no/public/flags/GB.png";
const FLAG_SE = "https://storage.123fakturere.no/public/flags/SE.png";

const DashboardNavbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[language, setLanguage] = useState("English");
  const [flag, setFlag] = useState(FLAG_EN);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange =(lang, flagUrl) => {
    setLanguage(lang);
    setFlag(flagUrl);
    setDropdownOpen(false);
  };

  // close when clicking outside dropmenu
  useEffect(() => {
    const closeDropdown =() => setDropdownOpen(false);
    window.addEventListener("click", closeDropdown);
    return ()=> window.removeEventListener("click", closeDropdown);
  }, [] );

  return (
    <div className="dashboard-navbar">
      {/* hamburger for small screens*/}
      <button className="menu-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className="profile">
        <div className="avatar"></div>
        <div>
          <h4>John Andre</h4>
        </div>
      </div>

      <div className="right">
        <div className="dropdown" onClick={toggleDropdown}>
          <button className="dropbtn">
            <span>{language}</span>
            <img src={flag} alt="flag" className="flag-img" />
          </button>

          {dropdownOpen && (
            <div className="dropdown-content">
              <button onClick={()=> handleLanguageChange("English", FLAG_EN)}>
                English <img src={FLAG_EN} alt="English" className="flag-img" />
              </button>
              <button onClick={() => handleLanguageChange("Svenska", FLAG_SE)}>
                Svenska <img src={FLAG_SE} alt="Swedish" className="flag-img" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
