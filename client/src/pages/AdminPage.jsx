import React, { useState, useEffect } from "react";
import Button from "../components/Button";

const AdminPage = () => {
  const [timeRange, setTimeRange] = useState("Today");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://moivebookingsystem.xyz/api/booking/getAllBookings",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          console.log("Failed to fetch movie data");
          return;
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const [newMovie, setNewMovie] = useState({
    title: "",
    date: "",
    description: "",
    director: "",
    producer: "",
    cast: "",
  });

  const handleNewMovie = async () => {
    try {
      fetch("http://moivebookingsystem.xyz/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      const data = await response.json();
      console.log("Movie added successfully:", data);
    } catch (error) {
      console.error("Error posting movie:", error);
    }
  };

  const handleTimeRangeChange = async (e) => {
    await setTimeRange(e.target.value);
    try {
      const response = await fetch(`http://moivebookingsystem.xyz/api/movies`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
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
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Movie title"
              onChange={(e) =>
                setNewMovie({ ...newMovie, title: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            <input
              placeholder="DD/MM/YY"
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <textarea
            placeholder="Movie description"
            onChange={(e) =>
              setNewMovie({ ...newMovie, description: e.target.value })
            }
            className="border border-gray-300 rounded px-4 py-2 w-full h-32"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Movie director"
              onChange={(e) =>
                setNewMovie({ ...newMovie, director: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            <input
              placeholder="Movie producer"
              onChange={(e) =>
                setNewMovie({ ...newMovie, producer: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <input
            placeholder="Movie cast"
            onChange={(e) => setNewMovie({ ...newMovie, cast: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />

          {/* This handles logic for new movies to be added */}
          <Button
            variant="primary"
            className="py-2 px-6 mx-auto mt-4"
            onClick={() => {
              console.log("fart");
              handleNewMovie();
            }}
          >
            Add Movie
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
