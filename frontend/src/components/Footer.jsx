import "../styles/footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          123Fakturera
        </div>
        <div className="footer-right">
          <a href="/">{t("Home")}</a>
          <a href="/order">{t("Order")}</a>
          <a href="/contact">{t("Contact Us")}</a>
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
