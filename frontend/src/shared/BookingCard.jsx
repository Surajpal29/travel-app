import React from "react";
import { Card, CardBody } from "reactstrap";
import "./BookingCard.css";
import { BASE_URL } from "../utils/config";
const BookingCard = ({ booking }) => {
  const {
    _id,
    userId,
    userEmail,
    tourName,
    fullName,
    guestSize,
    phone,
    bookAt,
    createdAt,
  } = booking;

  const handleCancel = async () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/booking/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        window.location.reload();  // Reload to refresh bookings
      } else {
        alert(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while cancelling the booking.");
    }
  };

  return (
    <div className="booking__card">
      <Card>
        <CardBody>
          <h5 className="tour__title mb-3">{tourName}</h5>
          <div className="booking__details">
            <p>
              <strong>Booking ID:</strong> {_id}
            </p>
            {/* <p>
              <strong>User ID:</strong> {userId}
            </p> */}
            <p>
              <strong>Email:</strong> {userEmail}
            </p>
            <p>
              <strong>Full Name:</strong> {fullName}
            </p>
            <p>
              <strong>Guests:</strong> {guestSize}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>
            <p>
              <strong>Booking Date:</strong>{" "}
              {new Date(bookAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Booked date:</strong>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
            <div className="btn_container">

            <button className=" booking__btn cencal_booking__btn" onClick={handleCancel}>
              Cencal Booking
            </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookingCard;
