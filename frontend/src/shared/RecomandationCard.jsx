import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css"; // same css file jisme card styles hain

const RecommendationCard = ({ recommendation }) => {
  const {
    id,
    title,
    city,
    photo,
    price,
    featured,
    avgRating,
    totalRating,
    reviewsCount,
  } = recommendation;

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={photo} alt="recommendation-img" />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i> {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>{" "}
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? "Not rated" : <span>({reviewsCount})</span>}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/tours/${id}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span> /per person</span>
            </h5>

            <Link to={`/tours/${id}`}>
              <button className="booking__btn">Book Now</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RecommendationCard;
