import{ useState, useEffect } from "react";
import { FaChevronRight, FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from "../components/SideBar";
import DashboardNavbar from "../components/DashboardNavbar";
import ProductForm from "../components/ProductForm";
import "../styles/dashboard.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Dashboard = () =>{
  const [isSidebarOpen, setIsSidebarOpen]= useState(false);
  const [products, setProducts] = useState([]);
  const[showForm, setShowForm] = useState(false);
  const[editingProduct, setEditingProduct] = useState(null);

  const API_URL = import.meta.env.VITE_API;

  const toggleSidebar = ()=> setIsSidebarOpen(!isSidebarOpen);
  const toggleForm =() =>setShowForm(!showForm);

  const fetchProducts = ()=> {
    fetch(`${API_URL}/api/products/`)
      .then((res)=> res.json())
      .then((data) => setProducts(data))
      .catch((err)=> console.error("Error fetching products:", err));
  };

  useEffect(() =>{
    fetchProducts();
  }, [] );

  const handleProductAdded =(newProduct) =>{
  setProducts((prev) =>{
    // check the product is exist in array or not 
    const index= prev.findIndex((p) => p.id === newProduct.id);
    if (index !== -1){
      // replace old product with new one
      const updated =[...prev];
      updated[index]= newProduct;
      return updated;
    } else{
      return [...prev, newProduct];
    }
  });
  setShowForm(false);
};


  const handleDelete= async (id) =>{
    const token = localStorage.getItem("sow_access");
    if (!token){
      toast.error("You must be logged in to delete products.");
      return;
    }
    if(!window.confirm("Are you sure you want to delete this product?")) return;

    try{
      const res =await fetch(`${API_URL}/api/products/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok){
        toast.success("Product deleted successfully!");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else{
        throw new Error(`Failed to delete product (${res.status})`);
      }
    } catch(err) {
      console.error(err);
      toast.error("Failed to delete product.");
    }
  };

  const handleEdit =(product) =>{
    setEditingProduct(product);
    setShowForm(true);
  };
  
  const {t} = useTranslation();
  return (
    <div className="dashboard-container">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-body">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="dashboard-main">
          <div className="search-actions">
            <div className="search-bar">
              <input type="text" placeholder={t("Search Article No...")} />
              <input type="text" placeholder={t("Search Product...")} />
            </div>
            <div className="buttons">
              <button className="green" onClick={() => { setEditingProduct(null); toggleForm(); }}>
                {t("New Product")}
              </button>
              <button className="blue">{t("Print List")}</button>
              <button className="gray">{t("Advanced Mode")}</button>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>{t("Article No.")}</th>
                  <th>{t("Product/Service")}</th>
                  <th>{t("In Price")}</th>
                  <th>{t("Price")}</th>
                  <th>{t("Unit")}</th>
                  <th>{t("In Stock")}</th>
                  <th>{t("Description")}</th>
                  <th>{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((p) => (
                    <tr key={p.id} className="table-row">
                      <td>{p.article_no} <FaChevronRight className="arrow-icon" /></td>
                      <td>{p.name}</td>
                      <td>{p.in_price}</td>
                      <td>{p.price}</td>
                      <td>{p.unit}</td>
                      <td>{p.in_stock}</td>
                      <td>{p.description}</td>
                      <td>
                        <FaEdit className="action-icon edit" onClick={() => handleEdit(p)} />
                        <FaTrash className="action-icon delete" onClick={() => handleDelete(p.id)} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "1rem" }}>
                      {t("No products found.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {showForm && (
            <ProductForm
              onClose={toggleForm}
              onProductAdded={handleProductAdded}
              editingProduct={editingProduct} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
