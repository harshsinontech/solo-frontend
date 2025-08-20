import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/images";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const [lang, setLang] = useState("English");

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to update the CSS link
  const applyDirectionCss = (dir: "ltr" | "rtl") => {
    const link = document.getElementById("direction-css") as HTMLLinkElement;
    if (link) link.href = dir === "rtl" ? "/css/rtl.css" : "/css/ltr.css";
  };

  // Change language handler
  const changeLanguage = (lng: "en" | "ar", label: string) => {
    i18n.changeLanguage(lng);

    const dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;

    localStorage.setItem("lang", lng);
    localStorage.setItem("langLabel", label);
    setLang(label);

    applyDirectionCss(dir); // switch CSS
  };

  // Load saved language on first render
  useEffect(() => {
    const savedLang = (localStorage.getItem("lang") as "en" | "ar") || "en";
    const savedLangLabel = localStorage.getItem("langLabel") || "English";

    i18n.changeLanguage(savedLang);

    const dir = savedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    setLang(savedLangLabel);

    applyDirectionCss(dir);
  }, []);

  return (
    <>
      {(["lg"] as const).map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className={`header ${isSticky ? "sticky" : ""}`}
        >
          <Container>
            <Navbar.Brand href="/">
              <img src={Logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {t("menu")}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to="/">{t("home")}</Link>
                  <Link to="#">{t("services")}</Link>
                  <NavDropdown title={t("more")} id="nav-dropdown">
                    <NavDropdown.Item href="#">{t("team")}</NavDropdown.Item>
                    <NavDropdown.Item href="#">{t("careers")}</NavDropdown.Item>
                  </NavDropdown>
                  <Link to="#">{t("about")}</Link>
                  <Link to="#">{t("contact")}</Link>
                </Nav>

                {/* Language Switcher */}
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown title={lang} className="language-dropdown">
                    <NavDropdown.Item
                      onClick={() => changeLanguage("en", "English")}
                    >
                      English
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => changeLanguage("ar", "Arabic")}
                    >
                      العربية
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Link to="#" className="btn btn-teal">
                    {t("inquiry")}
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;
