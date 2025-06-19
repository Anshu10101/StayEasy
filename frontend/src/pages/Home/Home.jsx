import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../Search/FIlter";
import Searchcontext from "../../Context/Searchcontext";

const Home = () => {
  const { searchResult, reload } = useContext(Searchcontext);
  const [filter, setFilter] = useState("");
  const [listing, setListing] = useState([]);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("/api/listings").then((response) => {
      const { data } = response;
      setListing(data);
    });
  }, [reload]);

  useEffect(() => {
    if (filter) {
      axios.get(`/api/filter/${filter}`).then((response) => {
        const { data } = response;
        setListing(data);
      });
    }
    setFilter("");
  }, [filter]);

  useEffect(() => {
    if (searchResult.length > 0) {
      setListing(searchResult);
    }
  }, [searchResult]);

  return (
    <div>
      <Filter setFilter={setFilter} setToggle={setToggle} toggle={toggle} />

      {listing?.length > 0 && (
        <div className=" m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 mt-8">
          {listing?.map((list) => (
            <Link to={`/listings/${list._id}`} key={list._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                <img
                  src={list.photos[0]}
                  alt="listing-image"
                  className="object-cover rounded-xl aspect-square "
                />
              </div>
              <h3 className="font-bold">{list.address}</h3>
              <p className="text-sm text-gray-500 truncate">
                {list.title.slice(0, 25)}
                <b>...more</b>
              </p>

              {toggle ? (
                <h4 className="mt-1 ">
                  <b>₹{list.price * 1.18}</b> <span>night</span>
                </h4>
              ) : (
                <h4 className="mt-1 ">
                  <b>₹{list.price}</b> <span>night</span>
                </h4>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
