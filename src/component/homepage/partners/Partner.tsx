import React from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { PartnerLogo } from "../../../assets/images";
import useScrollAnimation from "../../../../useScrollAnimation";
import { useTranslation } from "react-i18next";

const Partner: React.FC = () => {
  const [partnerRef, isVisible] = useScrollAnimation<HTMLDivElement>();
  const { t } = useTranslation();

  const partnerLogos = [
    PartnerLogo,
    PartnerLogo,
    PartnerLogo,
    PartnerLogo,
    PartnerLogo,
    PartnerLogo,
    PartnerLogo,
    PartnerLogo,
  ];

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 4 } },
      { breakpoint: 991, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 2 } },
      { breakpoint: 575, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      ref={partnerRef}
      className={`partner fade-up ${isVisible ? "visible" : ""}`}
    >
      <Container>
        <h2>{t("partner.title")}</h2>
        <p>{t("partner.description")}</p>
      </Container>
      <div className="slider-partner">
        <Slider {...settings}>
          {partnerLogos.map((logo, index) => (
            <div key={index}>
              <div className="partner-image-box">
                <img src={logo} alt={`partner-${index}`} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Partner;
