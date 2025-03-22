<<<<<<< HEAD
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

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [MyTours, setMyTours] = useState(false);
  const [MyToursData, setMyToursData] = useState([]);

  const { user } = useContext(AuthContext);
  console.log('====================================');
  console.log("user",user);
  console.log('====================================');
  const id = user?._id; // User ki ID ensure karein

  // Fetch tours data
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  // Manually fetch MyTours data
 useEffect(() => {
    console.log("✅ useEffect triggered! MyTours:", MyTours, "User ID:", id);
    console.log(localStorage.getItem("token"));


   if (MyTours && id) {
     const token = localStorage.getItem("token");

     if (!token) {
       console.error("🚨 No token found! User might be logged out.");
       return;
     }
     
     fetch(`${BASE_URL}/booking/${id}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`, // ✅ Add the token here
       },
     })
       .then((res) => {
         if (res.status === 401) {
           console.error("❌ Unauthorized! Invalid token or session expired.");
           throw new Error("You are not authorized!");
         }
         return res.json();
       })
       .then((data) => {
         if (data.success) {
           console.log("✅ Bookings Fetched:", data.data);
           setMyToursData(data.data);
         } else {
           console.error("⚠️ Error fetching MyTours:", data.message);
         }
       })
       .catch((err) => console.error("⚡ Fetch error:", err.message));
   }
 }, [MyTours, id]);




  console.log("MyToursData:", MyToursData[0]); // Debugging

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  const handleMytourClick = () => {
    setMyTours(!MyTours);
  };

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
              onClick={handleMytourClick}
              className={`button ${!MyTours ? "isActive" : ""}`}>
              AllTours
            </div>
            <div
              onClick={handleMytourClick}
              className={`button ${MyTours ? "isActive" : ""}`}>
              MyTours
            </div>
          </div>

          {loading && <h4 className="text-center pt-5 ">LOADING..........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && MyTours && (
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

          {!loading && !error && !MyTours && (
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
=======
import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
// import tourData from '../assets/data/tours'
import '../styles/tour.css'
import TourCard from './../shared/TourCard'
import SearchBar from './../shared/SearchBar'
import Newsletter from './../shared/Newsletter'
import { Col, Container, Row } from 'reactstrap'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'


const Tours = () => {
   const [pageCount, setPageCount] = useState(0)
   const [page, setPage] = useState(0)

   const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`)
   const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`)

   useEffect(() => {
      const pages = Math.ceil(tourCount / 8)
      setPageCount(pages)
      window.scrollTo(0,0)
   }, [page, tourCount, tours])

   return (
      <>
         <CommonSection title={"All Tours"} />
         
         <section>
            <Container>
               <Row>
                  <SearchBar />
               </Row>
            </Container>
         </section>

         <section className='pt-0'>
            <Container>
               {loading && <h4 className='text-center pt-5 '>LOADING..........</h4>}
               {error && <h4 className='text-center pt-5'>{error}</h4>}
               {
                  !loading && !error &&
                  <Row>
                     {
                        tours?.map(tour => (<Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}> <TourCard tour={tour} /> </Col>))
                     }

                     <Col lg='12'>
                        <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                           {[...Array(pageCount).keys()].map(number => (
                              <span key={number} onClick={() => setPage(number)}
                                 className={page === number ? 'active__page' : ''}
                              >
                                 {number + 1}
                              </span>
                           ))}
                        </div>
                     </Col>
                  </Row>
               }
            </Container>
         </section>
         <Newsletter />
      </>
   )
}

export default Tours
>>>>>>> 485b414cb290e351f8e3bc5a223336378823ae6d
