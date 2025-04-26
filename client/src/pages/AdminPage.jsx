import React, { useState } from "react";
import Button from "../components/Button";

const AdminPage = () => {
  const [timeRange, setTimeRange] = useState("Today");

  const [movies, setMovies] = useState([
    {
      title: "Karate Kid: Legends",
      theater: "Lubbock, Texas",
      startTime: "March 30, 2025 at 7:50 PM",
      runTime: "2h 30m",
      ticketsSold: 3,
    },
  ]);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
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
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            <input
              placeholder="DD/MM/YY"
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <textarea
            placeholder="Movie description"
            className="border border-gray-300 rounded px-4 py-2 w-full h-32"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Movie director"
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            <input
              placeholder="Movie producer"
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <input
            placeholder="Movie cast"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <Button variant="primary" className="py-2 px-6 mx-auto mt-4">
            Add Movie
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
