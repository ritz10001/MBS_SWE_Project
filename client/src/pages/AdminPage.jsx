import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router";
import { format } from "date-fns";

const AdminPage = () => {
  // Main form for movie details
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetMovieForm,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const navigate = useNavigate();
  const { token } = useAuth();
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentShows, setCurrentShows] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);

  // Fetch shows data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.moviebookingsystem.xyz/api/shows",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          console.log("Failed to fetch Shows");
          return;
        }
        const shows = await response.json();
        console.log(shows);
        setTotalMovies(shows.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch bookings data
  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await fetch(
          "https://www.moviebookingsystem.xyz/api/booking/getAllBookings",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          console.log("Failed to fetch Bookings");
          return;
        }
        const data = await res.json();
        console.log("these are the current bookings" + JSON.stringify(data));
        let total = 0;
        let totalTickets = 0;
        const newShows = { ...currentShows };

        for (let i = 0; i < data.length; i++) {
          const booking = data[i];
          total += booking.totalAmount;
          totalTickets += booking.numberOfTickets;
          // Update the shows object directly
          if (newShows[booking.movieTitle]) {
            newShows[booking.movieTitle] = {
              ...newShows[booking.movieTitle],
              numberOfTickets:
                booking.numberOfTickets +
                newShows[booking.movieTitle].numberOfTickets,
              totalAmount:
                booking.totalAmount + newShows[booking.movieTitle].totalAmount,
            };
          } else {
            newShows[booking.movieTitle] = booking;
          }
        }
        setTotalTickets(totalTickets);
        setCurrentShows(newShows);
        setTotalRevenue(total);
        setfetchingBookings(false);
      } catch (err) {
        console.log("Error fetching Bookings " + err);
      }
    };
    getBookings();
  }, []);

  // Handle main form submission
  const onSubmit = async (data) => {
    if (isCreating) return;
    setIsCreating(true);

    try {
      const response = await fetch(
        "https://www.moviebookingsystem.xyz/api/movies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        navigate(`/movie/${result.id}`);
      } else {
        setCreateError(result.message);
      }
    } catch (error) {
      console.error("Login error", error);
      setCreateError("Something went wrong. Try again.");
    }

    setIsCreating(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col gap-8">
      {/* Admin Panel Overview section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Theater Administration Panel
        </h1>
        <div className="relative rounded-xl bg-[#ececec] shadow-xl p-6 flex flex-col gap-6">
          {/*Overview and Dropdown */}
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-black text-xl">Overview</h2>
          </div>
          {/* Statistics */}
          <div className="grid grid-cols-3 divide-x-2 divide-gray-300">
            <div className="flex flex-col text-left pr-6">
              <h3 className="text-lg text-gray-400">Total Tickets</h3>
              <p className="text-3xl font-bold">{totalTickets}</p>
            </div>
            <div className="flex flex-col text-left px-6">
              <h3 className="text-lg text-gray-400">Number of Shows</h3>
              <p className="text-3xl font-bold">{totalMovies}</p>
            </div>
            <div className="flex flex-col text-left pl-6">
              <h3 className="text-lg text-gray-400">Total Revenue</h3>
              <p className="text-3xl font-bold">${totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Currently Playing Movies */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Currently Playing Movies
        </h1>
        <div className="rounded-xl bg-gray-100 shadow-xl overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-5 bg-[#ececec] font-bold text-black">
            <div className="p-4">Movie Title</div>
            <div className="p-4 border-l border-gray-300">Theater</div>
            <div className="p-4 border-l border-gray-300">Show Time</div>
            <div className="p-4 border-l border-gray-300">Tickets Sold</div>
            <div className="p-4 border-l border-gray-300">Total Revenue</div>
          </div>

          {/* Movie rows */}
          {Object.entries(currentShows).map(([title, showing], index) => {
            const bg = index % 2 === 0 ? "bg-white" : "bg-[#ececec]";
            const date = new Date(showing.showTime);
            return (
              <div
                key={index}
                className={`grid grid-cols-5 ${bg} border-t border-gray-300`}
              >
                <div className="p-4">{title}</div>
                <div className="p-4 border-l border-gray-300">
                  {showing.theaterName || "null"}
                </div>
                <div className="p-4 border-l border-gray-300">
                  {`${format(new Date(showing.showTime), "Pp")}`}
                </div>
                <div className="p-4 border-l border-gray-300">
                  {showing.numberOfTickets}
                </div>
                <div className="p-4 border-l border-gray-300">
                  ${showing.totalAmount}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Movie Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Add New Movie
        </h1>

        {/* Main Movie Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <FormInput
            id="Title"
            label="Movie Title"
            disabled={isCreating}
            error={errors.Title?.message}
            {...register("Title", {
              required: "Movie title is required",
            })}
          />
          <FormInput
            id="Description"
            label="Movie Description"
            disabled={isCreating}
            error={errors.Description?.message}
            {...register("Description", {
              required: "Movie description is required",
            })}
          />
          <div className="md:grid md:grid-cols-3 space-y-4 md:space-y-0 md:space-x-4">
            <FormInput
              id="Genre"
              label="Genre"
              disabled={isCreating}
              error={errors.Genre?.message}
              {...register("Genre", { required: "Genre is required" })}
            />
            <FormInput
              id="ReleaseDate"
              type="date"
              label="Release Date"
              disabled={isCreating}
              error={errors.ReleaseDate?.message}
              {...register("ReleaseDate", {
                required: "Release date is required",
              })}
            />
            <FormInput
              id="Duration"
              type="number"
              label="Movie Duration (mins)"
              disabled={isCreating}
              error={errors.Duration?.message}
              {...register("Duration", {
                required: "Movie duration is required",
              })}
            />
          </div>
          <FormInput
            id="Director"
            label="Director"
            disabled={isCreating}
            error={errors.Director?.message}
            {...register("Director", {
              required: "Director is required",
            })}
          />
          <FormInput
            id="Cast"
            label="Cast"
            disabled={isCreating}
            error={errors.Cast?.message}
            {...register("Cast", { required: "Cast is required" })}
          />
          <FormInput
            id="ImageUrl"
            type="url"
            label="Movie Poster URL"
            disabled={isCreating}
            error={errors.ImageUrl?.message}
            {...register("ImageUrl", {
              required: "Movie poster URL is required",
            })}
          />

          {/* Submit Movie Button */}
          <Button
            type="submit"
            loading={isCreating}
            width="full"
            variant="primary"
            className="mx-auto w-sm mt-6"
          >
            Add Movie
          </Button>

          {createError && (
            <p className="mt-1 text-sm text-red-600">{createError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
