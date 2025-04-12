import React, { useState, useEffect, useContext } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import Newsletter from "./../shared/Newsletter";
import { Col, Container, Row } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import BookingCard from "../shared/BookingCard";
import axios from "axios";
import RecommendationCard from "../shared/RecomandationCard";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState("alltours"); // New state for tabs
  const [MyToursData, setMyToursData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationInput, setRecommendationInput] = useState("");
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const { user } = useContext(AuthContext);
  const id = user?._id;

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    if (activeTab === "mytours" && id) {
      const token = localStorage.getItem("token");

      if (!token) return;

      fetch(`${BASE_URL}/booking/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMyToursData(data.data);
          }
        })
        .catch((err) => console.error("Fetch error:", err.message));
    }
  }, [activeTab, id]);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== "recommendations") {
      setRecommendations([]); // Clear recommendations if switching tabs
    }
  };

  async function getRecommendations() {
    if (!recommendationInput.trim()) {
      alert("Please enter your preference!");
      return;
    }

    setLoadingRecommendations(true);

    try {
      const response = await axios.post(`${BASE_URL}/tours/recommend`, {
        query: recommendationInput,
      });

      setRecommendations(response.data.recommendations || []);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoadingRecommendations(false);
    }
  }

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row className="pagination span">
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <div className="container-btn">
            <div
              onClick={() => handleTabClick("alltours")}
              className={`button ${
                activeTab === "alltours" ? "isActive" : ""
              }`}>
              AllTours
            </div>
            <div
              onClick={() => handleTabClick("mytours")}
              className={`button ${activeTab === "mytours" ? "isActive" : ""}`}>
              MyTours
            </div>
            <div
              onClick={() => handleTabClick("recommendations")}
              className={`button ${
                activeTab === "recommendations" ? "isActive" : ""
              }`}>
              Recommendations
            </div>
          </div>

          {activeTab === "recommendations" && (
            <>
              <div className="recommendation-section">
                <input
                  type="text"
                  placeholder="Enter your preference..."
                  value={recommendationInput}
                  onChange={(e) => setRecommendationInput(e.target.value)}
                  className="recommendation-input"
                />
                <button onClick={getRecommendations} className="button">
                  Get Recommendations
                </button>
              </div>

              {loadingRecommendations && (
                <h4 className="text-center pt-4">Loading Recommendations...</h4>
              )}

              {!loadingRecommendations && recommendations.length > 0 && (
                <Row>
                  {recommendations.map((rec, index) => (
                    <Col lg="3" md="6" sm="6" className="mb-4" key={index}>
                      <RecommendationCard recommendation={rec} />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}

          {!loading && !error && activeTab === "mytours" && (
            <Row>
              {MyToursData?.length > 0 ? (
                MyToursData.map((booking) => (
                  <Col lg="3" md="6" sm="6" className="mb-4" key={booking._id}>
                    <BookingCard booking={booking} />
                  </Col>
                ))
              ) : (
                <h4 className="text-center pt-5">No bookings found!</h4>
              )}
            </Row>
          )}

          {!loading && !error && activeTab === "alltours" && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}>
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
