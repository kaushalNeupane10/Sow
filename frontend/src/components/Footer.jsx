import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          123Fakturera
        </div>
        <div className="footer-right">
          <a href="/">Home</a>
          <a href="/order">Order</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
      <hr className="footer-line" />
      <div className="footer-bottom">
        &copy; Lättfaktura, CRO no. 638537, 2025. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
