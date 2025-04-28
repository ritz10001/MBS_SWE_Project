import React, { useState, useEffect, use } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router";

const AdminPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const navigate = useNavigate();

  const { token } = useAuth();
  const [timeRange, setTimeRange] = useState("Today");
  const [data, setData] = useState([]);
  const [movies, setMovies] = useState([]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.moviebookingsystem.xyz/api/booking/getAllBookings",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          console.log("Failed to fetch data");
          return;
        }
        const data = await response.json();

        console.log("Fetched data:", data);

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        navigate(`/movie/${result.id}`)
      } else {
        setCreateError(result.message);
      }
    } catch (error) {
      console.error("Login error", error);
      setCreateError("Something went wrong. Try again.");
    }

    setIsCreating(false);
  };

  const handleTimeRangeChange = async (e) => {
    await setTimeRange(e.target.value);
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
            <select
              value={timeRange}
              onChange={handleTimeRangeChange}
              className="border border-gray-300 rounded px-3 py-2 bg-white shadow-sm"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Overall">Overall</option>
            </select>
          </div>
          {/* Statistics */}
          <div className="grid grid-cols-3 divide-x-2 divide-gray-300">
            <div className="flex flex-col text-left pr-6">
              <h3 className="text-lg text-gray-400">Total Users</h3>
              <p className="text-3xl font-bold">1000</p>
            </div>
            <div className="flex flex-col text-left px-6">
              <h3 className="text-lg text-gray-400">Total Movies</h3>
              <p className="text-3xl font-bold">500</p>
            </div>
            <div className="flex flex-col text-left pl-6">
              <h3 className="text-lg text-gray-400">Total Revenue</h3>
              <p className="text-3xl font-bold">$50,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel Add Movies Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Currently Playing Movies
        </h1>
        <div className="relative rounded-xl bg-[#ececec] shadow-xl">
          <div className=" gird-flow-row gap-6 divide-y-2">
            {/* column titles */}
            <div className="grid grid-cols-[1fr_180px_240px_130px_150px] divide-x-2 pt-4">
              <div className="flex flex-col text-left px-6">
                <h3 className="text-lg text-black font-bold">Movie Title</h3>
              </div>
              <div className="flex flex-col text-left px-4 font-bold">
                <h3 className="text-lg text-black">Theater</h3>
              </div>
              <div className="flex flex-col text-left px-4 font-bold">
                <h3 className="text-lg text-black">Start Time</h3>
              </div>
              <div className="flex flex-col text-left px-4 font-bold">
                <h3 className="text-lg text-black">Run Time</h3>
              </div>
              <div className="flex flex-col text-left px-4 font-bold">
                <h3 className="text-lg text-black">Tickets Sold</h3>
              </div>
            </div>

            {/* movie mapping */}
            {movies.map((movie, index) => {
              const backgroundColor =
                index % 2 === 0 ? "bg-gray-100" : "bg-white";
              return (
                <div
                  className={`grid grid-cols-[1fr_180px_240px_130px_150px] divide-x-2 ${backgroundColor}`}
                >
                  <div className="flex flex-col text-left px-4 py-2">
                    <p className="text-black">{movie.title}</p>
                  </div>
                  <div className="flex flex-col text-left px-4 py-2">
                    <p className="text-black">{movie.theater}</p>
                  </div>
                  <div className="flex flex-col text-left px-4 py-2">
                    <p className="text-black">{movie.startTime}</p>
                  </div>
                  <div className="flex flex-col text-left px-4 py-2">
                    <p className="text-black">{movie.runTime}</p>
                  </div>
                  <div className="flex flex-col text-left px-4 py-2">
                    <p className="text-black">{movie.ticketsSold}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Admin Panel Add Movies Section */}
      <div className="">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Add New Movie
        </h1>
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
            {...register("Description", { required: "Movie description is required" })}
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
              {...register("ReleaseDate", { required: "Release date is required" })}
            />
            <FormInput
              id="Duration"
              type="number"
              label="Movie Duration (mins)"
              disabled={isCreating}
              error={errors.Duration?.message}
              {...register("Duration", {
                required: "Movie duration is required"
              })}
            />
          </div>
          <FormInput
            id="Director"
            label="Director"
            disabled={isCreating}
            error={errors.Director?.message}
            {...register("Director", {
              required: "Director is required"
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
            {...register("ImageUrl", { required: "Movie poster URL is required" })}
          />

          <Button
            type="submit"
            loading={isCreating}
            width="full"
            variant="primary"
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
