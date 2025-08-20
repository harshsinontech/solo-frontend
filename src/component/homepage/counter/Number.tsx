import React from "react";
import { Container } from "react-bootstrap";
import CountUp from "react-countup";
import useScrollAnimation from "../../../../useScrollAnimation";
import { useTranslation } from "react-i18next";

const Number: React.FC = () => {
  const [numberRef, isVisible] = useScrollAnimation<HTMLDivElement>();
  const { t } = useTranslation();

  const stats = t("number.stats", { returnObjects: true }) as {
    value: number;
    text: string;
  }[];

  return (
    <section
      ref={numberRef}
      className={`number fade-up ${isVisible ? "visible" : ""}`}
    >
      <Container>
        <div className="number-title">
          <h2>{t("number.title")}</h2>
          <p>{t("number.desc")}</p>
        </div>
        <div
          ref={numberRef}
          className={`counter-main fade-up ${isVisible ? "visible" : ""}`}
        >
          <div className="row g-4 justify-content-center">
            {stats.map((item, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div
                  className="p-4 text-center bg-white shadow-sm box-number"
                  style={{ minHeight: "150px" }}
                >
                  <h3 className="fw-bold">
                    <CountUp end={item.value} duration={2} />+
                  </h3>
                  <p className="mb-0 small">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Number;
