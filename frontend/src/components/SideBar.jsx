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

const Sidebar= ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><FaFileInvoice /> Invoices</li>
        <li><FaUsers /> Customers</li>
        <li><FaBuilding /> My Business</li>
        <li><FaBook /> Invoice Journal</li>
        <li><FaListAlt /> Price List</li>
        <li><FaClone /> Multiple Invoicing</li>
        <li><FaTimesCircle /> Unpaid Invoices</li>
        <li><FaTag /> Offer</li>
        <li><FaBoxes /> Inventory Control</li>
        <li><FaUserFriends /> Member Invoicing</li>
        <li><FaExchangeAlt /> Import/Export</li>
        <li><FaSignOutAlt /> Log out</li>
      </ul>
    </div>
  );
};

export default Sidebar;
