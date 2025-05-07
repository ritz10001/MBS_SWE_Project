import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaHome, FaEnvelope, FaPhone } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import LoadingCircle from "../components/LoadingCircle";
import ShowingCard from "../components/ShowingCard";
import { useForm } from "react-hook-form";
import useClickOutside from "../util/useClickOutside";
import FormInput from "../components/FormInput";

const UserPage = () => {
  const { userDetails, userRoles, token, fetchUserDetails } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bookingsData, setBookingsData] = useState(null);

  const editProfileRef = useRef();
  useClickOutside(editProfileRef, () => {
    if (isLoading) return;
    setIsEditing(false);
  });

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

  const upcomingBookings = bookingsData?.filter(booking => Date.now() < (new Date(booking.showTime).getTime() + 1_000 * 60 * 3)) ?? [];
  const pastBookings = bookingsData?.filter(booking => Date.now() > (new Date(booking.showTime).getTime() + 1_000 * 60 * 3)) ?? [];

  const saveDetails = async (data) => {
    setError(null);

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
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const responseMessage = await response.text();
        setError(responseMessage || "Failed to update profile");
        return;
      }

      console.log("Profile updated successfully:", data);
      fetchUserDetails();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const openEditForm = () => {
    reset({
      FirstName: userDetails.firstName,
      LastName: userDetails.lastName,
      PhoneNumber: userDetails.phoneNumber,
      Address: userDetails.address
    })
    setError(null);
    setIsEditing(true);
  }

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
              onClick={openEditForm}
              variant="primary"
              className="absolute top-4 right-4 px-4"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* EDIT WINDOW */}
        {isEditing && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center p-10">
            <div ref={editProfileRef} className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-10">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              {/* Name Field */}
              <form onSubmit={handleSubmit(saveDetails)} className="space-y-4">
                <div className="flex gap-4">
                  <FormInput
                    id="FirstName"
                    label="First Name"
                    disabled={isLoading}
                    error={errors.FirstName?.message}
                    {...register("FirstName", {
                      required: "First name is required",
                    })}
                  />
                  <FormInput
                    id="LastName"
                    label="Last Name"
                    disabled={isLoading}
                    error={errors.LastName?.message}
                    {...register("LastName", { required: "Last name is required" })}
                  />
                </div>

                <FormInput
                  id="PhoneNumber"
                  type="tel"
                  label="Phone Number"
                  disabled={isLoading}
                  error={errors.PhoneNumber?.message}
                  {...register("PhoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                />
                <FormInput
                  id="Address"
                  type="text"
                  label="Home Address"
                  disabled={isLoading}
                  error={errors.Address?.message}
                  {...register("Address", { required: "Address is required" })}
                />
                <FormInput
                  id="CurrentPassword"
                  type="password"
                  label="Current Password"
                  disabled={isLoading}
                  error={errors.CurrentPassword?.message}
                  {...register("CurrentPassword", {
                    required: "Current password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2"
                    variant="default"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isLoading}
                    className="px-4 py-2"
                    variant="primary"
                  >
                    Update Profile
                  </Button>
                </div>
                {error && (
                  <p className="mt-1 text-sm text-red-600 text-right">{error}</p>
                )}
              </form>

            </div>
          </div>
        )}
      </div>

      {/* MOVIE HISTORY */}
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-black pb-2 border-b border-gray-500 mb-2">My Upcoming Shows</h2>
        {bookingsData ? (
          upcomingBookings.length ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking, index) => {
                return (
                  <ShowingCard
                    key={index}
                    title={booking.movieTitle}
                    imageUrl={booking.movieImageUrl}
                    theatreLocation={booking.theaterLocation}
                    showTime={booking.showTime}
                    ticketCount={booking.numberOfTickets}
                    bookingId={booking.id}
                  />
                );
              })}
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-500 mt-6">No upcoming shows found</div>
          )
        ) : (
          <div className="flex justify-center py-20">
            <LoadingCircle className="w-8 h-8" />
          </div>
        )}
      </div>
      
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-black pb-2 border-b border-gray-500 mb-2">My Past Shows</h2>
        {bookingsData ? (
          pastBookings.length ? (
            <div className="space-y-4">
              {pastBookings.map((booking, index) => {
                return (
                  <ShowingCard
                    key={index}
                    title={booking.movieTitle}
                    imageUrl={booking.movieImageUrl}
                    theatreLocation={booking.theaterLocation}
                    showTime={booking.showTime}
                    ticketCount={booking.numberOfTickets}
                  />
                );
              })}
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-500 mt-6">No past shows found</div>
          )
        ) : (
          <div className="flex justify-center py-20">
            <LoadingCircle className="w-8 h-8" />
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
