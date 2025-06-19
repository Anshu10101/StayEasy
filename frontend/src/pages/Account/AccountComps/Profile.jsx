import React, { useContext } from "react";
import userContext from "../../../Context/Usercontext";
import AccountNav from "./AccountNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate()

  async function handleLogout() {
    await axios.post("/api/logout");
    localStorage.removeItem("userInfo")
    setUser(null);
    navigate("/")
  }


  return (
    <>
    <AccountNav/>
    <div className="text-center max-m-lg mx-auto my-6">
      Logged in as {user.username} ({user.email}) <br />
      <button
        className="bg-primary mx-w-sm text-white px-4 py-2 rounded-full mt-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
    </>
  );
};

export default Profile;
