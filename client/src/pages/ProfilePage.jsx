import React, { useEffect, useState } from "react";
import { FaUser, FaHome, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaLocationPin, FaClock, FaStar } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

const UserPage = () => {
  const { userDetails, userRoles, token } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [localDetails, setLocalDetails] = useState({ ...userDetails });
  const [movieHistory, setMovieHistory] = useState([
    {
      title: "Karate Kid: Legends",
      year: 2025,
      location: "Lubbock, Texas",
      date: "March 30, 2025 at 7:50 PM",
      tickets: 3,
      poster: "/public/Karate_Kid_Legends_Poster.jpg",
    },
  ]);

  // useEffect(() => {
  //   const getMovieHistory = async () => {
  //     try{
  //       const response = await fetch(`https://www.moviebookingsystem.xyz/api/}`);
  //       if (!response.ok) throw new Error('Failed to fetch movie data');
  //       const data = await response.json();
  //       setMovieData(data);
  //     } catch(err) {
  //       console.log(err);
  //     }
  //   };
  //   getMovieHistory();
  // }, []);

  const toggleEditWindow = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleNameChange = (e) => {
    const [firstName, lastName] = e.target.value.split(" ");
    setLocalDetails((prevDetails) => ({
      ...prevDetails,
      firstName: firstName,
      lastName: lastName,
    }));
  };

  const saveDetails = () => {
    const updateUserDetails = async () => {
      try {
        const response = await fetch(
          "https://www.moviebookingsystem.xyz/api/user/update-profile",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(localDetails),
          }
        );
        if (!response.ok) {
          console.log("Failed to update user data");
          return;
        }
        const data = await response.json();
        console.log("Returned: ", data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setLoading(true);
    updateUserDetails();
    setIsEditing(false);
  };

  return (
    <>
      <title>Profile | MBS</title>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
          Profile
        </h1>
        <div className="relative rounded-xl bg-[#ececec] shadow-xl px-4 py-4 grid grid-cols-[17%_1fr] gap-4 justify-between">
          <div className="flex flex-col justify-between min-w-[450px]">
            <div>
              <div>
                <div className="font-bold text-black text-xl">
                  {userDetails.firstName} {userDetails.lastName}
                </div>
                <div className="text-gray-500">{userRoles.join(", ")}</div>
              </div>
              <div className="text-black mt-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-10">
                    <FaHome className="text-gray-500" />
                  </div>
                  <span>{userDetails.address}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center justify-center w-10">
                    <FaEnvelope className="text-gray-500" />
                  </div>
                  <span>{userDetails.email}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center justify-center w-10">
                    <FaPhone className="text-gray-500" />
                  </div>
                  <span>{userDetails.phoneNumber}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={toggleEditWindow}
              variant="primary"
              className="absolute top-4 right-4 px-4"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* EDIT WINDOW */}
        {isEditing && (
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-6 rounded shadow-lg w-96 z-10">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              {/* Name Field */}
              <div className="mb-4 flex items-center">
                <div className="flex items-center justify-center w-10">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="userName"
                  value={localDetails.firstName + " " + localDetails.lastName}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              {/* Address Field */}
              <div className="mb-4 flex items-center">
                <div className="flex items-center justify-center w-10">
                  <FaHome className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={localDetails.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              {/* Email Field */}
              <div className="mb-4 flex items-center">
                <div className="flex items-center justify-center w-10">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={localDetails.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              {/* Phone Field */}
              <div className="mb-4 flex items-center">
                <div className="flex items-center justify-center w-10">
                  <FaPhone className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={localDetails.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  onClick={toggleEditWindow}
                  className="px-4 py-2"
                  variant="default"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveDetails}
                  className="px-4 py-2"
                  variant="primary"
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MOVIE HISTORY */}
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
          Movie Purchase History
        </h1>
        {movieHistory.map((movie, index) => (
          <div
            key={index}
            className="rounded-xl bg-[#ececec] shadow-xl px-4 py-4 grid grid-cols-[17%_1fr] gap-4 mb-4"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-auto h-auto rounded-lg shadow-lg"
            />
            <div className="flex flex-col justify-between">
              <div>
                <div className="font-bold text-black text-xl">
                  {movie.title}
                </div>
                <span className="text-gray-500">{movie.year}</span>
              </div>
              <div className="text-black mt-4">
                <div className="flex items-center gap-2">
                  <FaLocationPin />
                  <span>{movie.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>{movie.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar />
                  <span>{movie.tickets} tickets</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPage;
