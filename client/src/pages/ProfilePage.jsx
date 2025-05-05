import React, { useEffect, useState } from "react";
import { FaUser, FaHome, FaEnvelope, FaPhone } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import LoadingCircle from "../components/LoadingCircle";
import ShowingCard from "../components/ShowingCard";
import { useForm } from "react-hook-form";

const UserPage = () => {
  const { userDetails, userRoles, token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [localDetails, setLocalDetails] = useState({ ...userDetails });
  const [name, setName] = useState(
    userDetails.firstName + " " + userDetails.lastName
  );
  const [bookingsData, setBookingsData] = useState(null);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const response = await fetch(
          `https://www.moviebookingsystem.xyz/api/booking/getMyBookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch booking data");
        const data = await response.json();
        setBookingsData(data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchBookingsData();
  }, []);

  const toggleEditWindow = () => {
    setLocalDetails(userDetails);
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
      if (!token) {
        console.error("No authentication token available");
        // Handle missing token (redirect to login, show error, etc.)
        return;
      }

      setIsLoading(true);
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

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Failed to update user data:",
            data.message || "Unknown error"
          );
          // Show error to user
          setError(data.message || "Failed to update profile");
          return;
        }

        console.log("Profile updated successfully:", data);
        // Update your app state with the returned data
        setUserDetails(data.user || data); // Adjust based on your API response
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        setError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    updateUserDetails();
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleNameChange}
                  placeholder="First and last name"
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
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveDetails}
                  className="px-4 py-2"
                  variant="primary"
                  disabled={isLoading}
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
        {!bookingsData && (
          <div className="flex justify-center py-20">
            <LoadingCircle className="w-8 h-8" />
          </div>
        )}
        {bookingsData && !bookingsData.length && (
          <div className="flex justify-center py-20">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
              No bookings found
            </h1>
          </div>
        )}
        {bookingsData && bookingsData.length && (
          <div className="space-y-4">
            {bookingsData.map((booking, index) => {
              return (
                <ShowingCard
                  key={index}
                  title={booking.movieTitle}
                  imageUrl={booking.movieImageUrl}
                  theatreLocation={booking.theatreLocation} // this doesn't display location
                  showTime={booking.showTime}
                  ticketCount={booking.numberOfTickets}
                />
              );
            })}
          </div>
        )}
        {/*movieHistory.map((movie, index) => (
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
        ))*/}
      </div>
    </>
  );
};

export default UserPage;
