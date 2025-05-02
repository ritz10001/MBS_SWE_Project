import { FaCalendarAlt, FaClock, FaStar } from "react-icons/fa";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Button from "./Button";
import IsAdmin from "./IsAdmin";
import FormInput from "./FormInput";
import LoadingCircle from "./LoadingCircle";

const MovieDetails = ({ data }) => {
  const hours = Math.floor(data.duration / 60);
  const minutes = data.duration % 60;
  const rating = Math.round((data.rating ?? 0) / 2);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedShowtime, setSelectedShowtime] = useState();
  const [editingMovie, setEditingMovie] = useState(false);
  const [showtimes, setShowtimes] = useState(data.shows);
  const [isCreating, setIsCreating] = useState(false);

  const locations = [
    "Lubbock",
    "Amarillo",
    "Levelland",
    "Plainview",
    "Snyder",
    "Abilene",
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      tickets: 1,
    },
  });

  // Separate form for showtime entries
  const {
    register: registerShowtime,
    handleSubmit: handleShowtimeSubmit,
    reset: resetShowtimeForm,
    formState: { errors: showtimeErrors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const ticketCount = watch("tickets");

  // map all showtimes based on date
  const showsByDate =
    data.shows?.reduce((res, show) => {
      const date = new Date(show.showTime).toISOString().split("T")[0];
      if (!res[date]) {
        res[date] = [];
      }
      res[date].push(show);
      return res;
    }, {}) || {};

  const getDateRange = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const showDates =
      data.shows?.map((show) => {
        const date = new Date(show.showTime);
        date.setHours(0, 0, 0, 0);
        return date.toISOString().split("T")[0];
      }) || [];

    return [...new Set(showDates)].sort();
  };

  const availableDates = getDateRange();

  useEffect(() => {
    setSelectedDate(availableDates[0]);
  }, []);

  const showsByLocation =
    showsByDate[selectedDate]?.reduce((res, show) => {
      if (!res[show.location]) {
        res[show.location] = [];
      }
      res[show.location].push(show);
      return res;
    }, {}) || {};

  const handleUpdate = () => {
    console.log("fart");
  };

  // Handle add showtime submission
  const onAddShowtime = (data) => {
    const showtime = {
      location: data.Location,
      date: data.Showdate,
      time: data.Showtime,
      id: Date.now(), // Unique ID for each showtime
    };

    setShowtimes([...showtimes, showtime]);
    resetShowtimeForm();
  };

  // Handle removing a showtime
  const removeShowtime = (id) => {
    setShowtimes(showtimes.filter((showtime) => showtime.id !== id));
  };

  if (isCreating) return <LoadingCircle></LoadingCircle>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[20%_1fr_min-content] gap-6 mb-6">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full max-w-xs mx-auto md:max-w-none h-auto rounded-lg shadow-lg aspect-[2/3]"
        />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
            {data.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-base md:text-lg">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span className="text-gray-500">
                {format(new Date(data.releaseDate), "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-gray-500" />
              <span className="text-gray-500">
                {hours ? `${hours}h ` : ""}
                {minutes ? `${minutes}m` : ""}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <div className="mt-2 flex items-center gap-1.5">
              <span className="font-bold">Rating: </span>
              <span className="inline-flex text-lg" title={`${data.rating}/10`}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        rating > i ? "text-yellow-500" : "text-gray-300"
                      }
                    />
                  ))}
              </span>
              <span>({data.reviews?.length ?? 0})</span>
            </div>
            <div className="mt-2">
              <span className="font-bold">Cast:</span> {data.cast}
            </div>
            <div className="mt-2">
              <span className="font-bold">Director:</span> {data.director}
            </div>
          </div>
        </div>
        <IsAdmin>
          <div className="text-nowrap flex flex-col gap-2 align-end">
            <Button variant="danger">Delete Movie</Button>
            <Button
              variant="primary"
              onClick={() => {
                setEditingMovie((prev) => {
                  return !prev;
                });
              }}
            >
              Edit Movie
            </Button>
          </div>
        </IsAdmin>
      </div>
      <div className="mb-8">
        <p className="text-gray-700 border-l-2 pl-4 border-gray-300 py-2">
          {data.description}
        </p>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-black pb-2 border-b border-gray-500 mb-2 py-4">
        Showtimes
      </h2>

      <div className="mb-8">
        {editingMovie ? (
          <>
            {/* Showtimes Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Edit Showtimes</h2>

              {/* Display current showtimes */}
              {showtimes.length > 0 && (
                <div className="mb-4  rounded-md">
                  <h3 className="text-md font-medium mb-2">
                    Current Showtimes:
                  </h3>
                  <div className="space-y-2">
                    {showtimes.map((showtime, i) => (
                      <div
                        key={showtime.id}
                        className="flex justify-between items-center bg-white p-2 rounded shadow"
                      >
                        <span>
                          {showtime.location} -{" "}
                          {format(new Date(showtime.showTime), "Pp")}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeShowtime(showtime.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Showtime Form */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <select
                      id="Location"
                      disabled={isCreating}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      {...registerShowtime("Location", {
                        required: "Location is required",
                      })}
                    >
                      <option value="">Select Location</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    {showtimeErrors.Location && (
                      <p className="mt-1 text-sm text-red-600">
                        {showtimeErrors.Location.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      id="Showtime"
                      disabled={isCreating}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      {...registerShowtime("Showtime", {
                        required: "Time is required",
                      })}
                    />
                    {showtimeErrors.Showtime && (
                      <p className="mt-1 text-sm text-red-600">
                        {showtimeErrors.Showtime.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      id="Showdate"
                      disabled={isCreating}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      {...registerShowtime("Showdate", {
                        required: "Date is required",
                      })}
                    />
                    {showtimeErrors.Showdate && (
                      <p className="mt-1 text-sm text-red-600">
                        {showtimeErrors.Showdate.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="default"
                  className="mt-3"
                  onClick={handleShowtimeSubmit(onAddShowtime)}
                >
                  Add Showtime
                </Button>
              </div>
              <Button
                type="button"
                variant="primary"
                className="mt-3"
                onClick={handleUpdate}
              >
                Finalize Changes
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="pb-4">
              Select a show date and time to continue to ticket checkout.
            </p>
            <div className="mb-2">
              <div className="flex overflow-x-auto pb-2 gap-4 min-h-[48px]">
                {availableDates.map((date) => {
                  return (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedShowtime(null);
                      }}
                      className={`px-4 rounded-t-lg py-2 whitespace-nowrap text-center border-b-4 border-transparent ${
                        selectedDate === date
                          ? "border-b-blue-500 bg-gray-100"
                          : "cursor-pointer transition-colors border-b-gray-300 hover:bg-gray-100 hover:border-b-gray-800 text-gray-900"
                      }`}
                    >
                      {format(new Date(date), "MMMM d")}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[min-content_1fr] gap-x-6 gap-y-3 items-center">
              {Object.entries(showsByLocation).map(([location, shows]) => (
                <>
                  <div className="text-lg font-bold text-nowrap">
                    {location}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {shows.map((show) => (
                      <button
                        key={show.id}
                        className={`rounded-xl border-2 py-1.5 px-4 transition-colors cursor-pointer ${
                          show.id == selectedShowtime
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          if (selectedShowtime == show.id)
                            setSelectedShowtime(null);
                          else setSelectedShowtime(show.id);
                        }}
                      >
                        <div>{format(new Date(show.showTime), "p")}</div>
                      </button>
                    ))}
                  </div>
                </>
              ))}
            </div>
            <div className="py-4">
              <FormInput
                id="tickets"
                type="number"
                className="sm:w-15"
                label="Number of tickets"
                error={errors.tickets?.message} // Display validation error message
                {...register("tickets", {
                  max: {
                    value: 10,
                    message: "You can only purchase up to 10 tickets.",
                  },
                  min: {
                    value: 1,
                    message: "You must purchase at least 1 ticket.",
                  },
                  valueAsNumber: true,
                })}
                max={10}
                min={1}
              />
            </div>
            <div className="flex justify-center">
              <Button
                variant="primary"
                className="mt-6 w-full md:w-auto"
                disabled={
                  !selectedShowtime || ticketCount > 10 || ticketCount < 1
                }
                href={
                  selectedShowtime && ticketCount > 0 && ticketCount <= 10
                    ? `/checkout?movieId=${data.id}&showId=${selectedShowtime}&tickets=${ticketCount}`
                    : null
                }
              >
                Continue to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MovieDetails;
