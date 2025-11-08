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
} from "react-icons/fa";
import "./../styles/sidebar.css";
import { useTranslation } from "react-i18next";

const Sidebar= ({ isOpen }) => {
  const {t} = useTranslation();
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><FaFileInvoice /> {t("Invoices")}</li>
        <li><FaUsers /> {t("Customers")}</li>
        <li><FaBuilding /> {t("My Business")}</li>
        <li><FaBook /> {t("Invoice Journal")}</li>
        <li><FaListAlt /> {t("Price List")}</li>
        <li><FaClone /> {t("Multiple Invoicing")}</li>
        <li><FaTimesCircle /> {t("Unpaid Invoices")}</li>
        <li><FaTag /> {t("Offer")}</li>
        <li><FaBoxes /> {t("Inventory Control")}</li>
        <li><FaUserFriends /> {t("Member Invoicing")}</li>
        <li><FaExchangeAlt /> {t("Import/Export")}</li>
        <li><FaSignOutAlt /> {t("Log out")}</li>
      </ul>
    </div>
  );
};

export default Sidebar;
