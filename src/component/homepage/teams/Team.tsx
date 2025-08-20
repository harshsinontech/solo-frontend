import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { TeamOne, TeamThree, TeamTwo } from "../../../assets/images";
import { Link } from "react-router-dom";
import useScrollAnimation from "../../../../useScrollAnimation";
import { useTranslation } from "react-i18next";

const Team: React.FC = () => {
  const [teamRef, isVisible] = useScrollAnimation<HTMLDivElement>();
  const { t } = useTranslation();

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    margin: 50,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  // Load member data from translations
  const teamData = t("team_sec.members", { returnObjects: true }) as {
    name: string;
    title: string;
  }[];

  return (
    <section
      ref={teamRef}
      className={`team-sec fade-up ${isVisible ? "visible" : ""}`}
    >
      <Container>
        <Row>
          <Col className="col-md-12 col-lg-3">
            <div className="solo-member-text">
              <h3>{t("team_sec.title")}</h3>
              <p>{t("team_sec.description")}</p>
              <Link to="#" className="banner-btn">
                <Button className="btn btn-teal">{t("team_sec.allTeam")}</Button>
                <span className="arrow-btn">
                  <i className="bi bi-arrow-right"></i>
                </span>
              </Link>
            </div>
          </Col>

          <Col className="col-md-8 col-lg-6">
            <Slider {...settings} className="team-slider">
              {teamData.map((member, index) => (
                <div key={index}>
                  <div className="team-content">
                    <div className="team-image">
                      <img
                        src={[TeamOne, TeamTwo, TeamThree][index]}
                        alt="team"
                      />
                    </div>
                    <div className="team-title">
                      <h4>
                        <span>{member.name} -</span> {member.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </Col>

          <Col className="col-md-4 col-lg-3">
            <div className="team-content team-join">
              <div className="team-image">
                <img src={TeamThree} alt="team" />
              </div>
              <div className="team-title">
                <h4>
                  <span>{t("team_sec.maybeYou")}</span> {t("team_sec.bePart")}
                </h4>
              </div>
              <div className="apply-btn">
                <Button className="btn btn-teal">{t("team_sec.applyNow")}</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Team;
