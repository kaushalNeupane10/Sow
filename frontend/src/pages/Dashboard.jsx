import{ useState } from "react";
import Sidebar from "../components/SideBar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/dashboard.css";

const Dashboard = () =>{
  const [isSidebarOpen, setIsSidebarOpen]= useState(false);

  const toggleSidebar = ()=> setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-container">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-body">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="dashboard-main">
          <div className="search-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search Article No..." />
              <input type="text" placeholder="Search Product..." />
            </div>
            <div className="buttons">
              <button className="green">New Product</button>
              <button className="blue">Print List</button>
              <button className="gray">Advanced Mode</button>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Article No.</th>
                  <th>Product/Service</th>
                  <th>In Price</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>In Stock</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1234567890</td>
                  <td>This is a test product with fifty characters this!</td>
                  <td>900500</td>
                  <td>1500800</td>
                  <td>kilometers/hour</td>
                  <td>2500600</td>
                  <td>This is the description with fifty characters this</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
