import { useState, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import useScrollAnimation from "../../../../useScrollAnimation";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { fetchFeatures } from "../../../redux/slice/featureSlice";

const Feature: React.FC = () => {
  const [key, setKey] = useState<string>("create");
  const [featureRef, isVisible] = useScrollAnimation<HTMLDivElement>();
  const { i18n } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const { data: features, loading, error } = useSelector(
    (state: RootState) => state.features
  );

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading features...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!features.length) return <p className="text-center">No features available</p>;

  return (
    <div
      ref={featureRef}
      className={`feuture fade-up ${isVisible ? "visible" : ""}`}
    >
      <Container className="position-relative">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k as string)}
          className="mb-3"
        >
          {features.map((tab) => {
            const title = i18n.language === "ar" ? tab.title_ar : tab.title_en;
            const text = i18n.language === "ar" ? tab.text_ar : tab.text_en;

            return (
              <Tab eventKey={tab.tab_key} title={title} key={tab.id}>
                <div className="feauture-content">
                  <div className="future-image">
                    <img src={tab.image_url} alt={title} />
                  </div>
                  <div className="future-info">
                    <p>{text}</p>
                  </div>
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </Container>
    </div>
  );
};

export default Feature;
