import React, { useContext, useEffect, useState } from "react";
import Account from "../Account/Account";
import axios from "axios";
import Placeimg from "./Placeimg";
import icons from "../../assets/icons/icons";
import BookingDates from "./BookingDates";
import userContext from "../../Context/Usercontext";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const {user} =  useContext(userContext)
  
  useEffect(() => {
    axios
      .get(`/api/booking?token=${user.token}`)
      .then((response) => {
        const { data } = response;
        setBookings(data);
      });
  }, []);

  return (
    <>
      <Account />
      <div className="flex flex-col items-center mt-4">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div
              className="flex gap-4 bg-gray-200 rounded-2xl w-full lg:w-5/6 overflow-hidden mt-4"
              key={booking._id}
            >
              <div className="w-48 flex">
                <Placeimg
                  place={booking.place}
                  className={"object-cover grow !h-full w-full "}
                />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className=" text-sm sm:text-xl">{booking.place.title}</h2>
                <BookingDates booking={booking} />
                <div className="text-sm sm:text-xl flex gap-2 mt-1">
                  {icons.card}
                  Total price: ₹{booking.price}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default BookingsPage;
