import {
  FaFileInvoice,
  FaUsers,
  FaBuilding,
  FaBook,
  FaListAlt,
  FaClone,
  FaTimesCircle,
  FaTag,
  FaBoxes,
  FaUserFriends,
  FaExchangeAlt,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";
import "./../styles/sidebar.css";
import { useTranslation } from "react-i18next";
import { clearTokens } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ isOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="menu">
        <h4>{t("Menu")}</h4>
        <hr className="menu-line" />
      </div>
      <ul>
        <li>
          <FaFileInvoice /> {t("Invoices")}
        </li>
        <li>
          <FaUsers /> {t("Customers")}
        </li>
        <li>
          <FaBuilding /> {t("My Business")}
        </li>
        <li>
          <FaBook /> {t("Invoice Journal")}
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#15c326ff",
              color: "white",
              marginLeft: "-23px",
              cursor: "pointer",
            }}
          >
            <FaPlus style={{ fontSize: "10px" }} />
          </span>
          <FaListAlt style={{ marginRight: "10px" }} />
          {t("Price List")}
        </li>

        <li>
          <FaClone /> {t("Multiple Invoicing")}
        </li>
        <li>
          <FaTimesCircle /> {t("Unpaid Invoices")}
        </li>
        <li>
          <FaTag /> {t("Offer")}
        </li>
        <li>
          <FaBoxes /> {t("Inventory Control")}
        </li>
        <li>
          <FaUserFriends /> {t("Member Invoicing")}
        </li>
        <li>
          <FaExchangeAlt /> {t("Import/Export")}
        </li>
        <li onClick={handleLogout}>
          <FaSignOutAlt /> {t("Log out")}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
