import { FaCalendarAlt, FaClock, FaStar } from "react-icons/fa";
import { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { format, formatDistance } from "date-fns";
import Button from "./Button";
import IsAdmin from "./IsAdmin";
import FormInput from "./FormInput";
import LoadingCircle from "./LoadingCircle";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import useClickOutside from "../util/useClickOutside";
import IsUser from "./IsUser";

const MovieDetails = ({ data }) => {
  const navigate = useNavigate();
  const { token, isAuthenticated, userRoles } = useAuth();
  const hours = Math.floor(data.duration / 60);
  const minutes = data.duration % 60;
  const rating = Math.round((data.rating ?? 0) / 2);
  const movieId = data.id;
  const [selectedDate, setSelectedDate] = useState();
  const [selectedShowtime, setSelectedShowtime] = useState();
  const [editingMovie, setEditingMovie] = useState(false);
  const [showtimes, setShowtimes] = useState(data.shows);
  const [isCreating, setIsCreating] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(null);

  const [popupState, setPopupState] = useState(0)
  const closeRef = useRef();
  useClickOutside(closeRef, () => {
    setPopupState(0);
  });

  const [theatres, setTheatres] = useState(null);

  useEffect(() => {
    if (isAuthenticated != true || !userRoles.includes('Administrator')) return;

    const getTheatres = async () => {
      const response = await fetch('https://www.moviebookingsystem.xyz/api/theatres', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Could not get theatres');
        return;
      }

      setTheatres(await response.json());
    }

    getTheatres();
  }, [isAuthenticated]);

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

  // Handle add showtime submission
  const onAddShowtime = async (formData) => {
    try {
      setIsCreating(true);
      const date = new Date(`${formData.Showdate}T${formData.Showtime}:00`);
      const showDateTime = format(date, "yyyy-MM-dd'T'HH:mm:ss");
      const newShow = {
        showTime: showDateTime,
        theatreId: formData.Location,
        movieId: movieId,
        ticketPrice: parseFloat(formData.TicketPrice),
        location: theatres.find(x => x.id == formData.Location)?.name, // Fixed: use formData.Location instead of show.location
      };

      const response = await fetch(
        "https://www.moviebookingsystem.xyz/api/shows",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newShow),
        }
      ).then(console.log("showtime was added"));
      if (!response.ok) {
        console.log("Failed to create showtime");
      }
      const addedShow = await response.json();
      // Add the returned show from the API to the showtimes state, not the form data
      addedShow["location"] = formData.Location;
      console.log(addedShow);

      setShowtimes([...showtimes, addedShow]);
      resetShowtimeForm();
    } catch (err) {
      console.log(err);
    } finally {
      setIsCreating(false);
    }
  };

  // Handle removing a showtime
  const removeShowtime = async (id) => {
    try {
      const response = await fetch(
        `https://www.moviebookingsystem.xyz/api/shows/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("remove showtime data: " + data);
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
    }
    // setShowtimes(showtimes.filter((showtime) => showtime.id !== id));
  };

  const handleDeleteMovie = async () => {
    try {
      const response = await fetch(
        `https://www.moviebookingsystem.xyz/api/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log("There was an error deleting the movie");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      navigate(`/`);
    }
  };

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (isCreating) return <LoadingCircle className="w-8 h-8"></LoadingCircle>;

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
          <div className="text-nowrap grid grid-cols-2 md:flex md:flex-col gap-2 align-end">
            <Button
              variant="danger"
              onClick={() => {
                setPopupState(1)
              }}
            >
              Delete Movie
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setEditingMovie((prev) => {
                  return !prev;
                });
              }}
            >
              Manage Show
            </Button>
          </div>
        </IsAdmin>
      </div>
      <div className="mb-8">
        <p className="text-gray-700 border-l-2 pl-4 border-gray-300 py-2">
          {data.description}
        </p>
      </div>

      <IsUser>
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
                      {showtimes.map((showtime, i) => {
                        // console.log("PRinting " + JSON.stringify(showtime));
                        return (
                          <div
                            key={showtime.id}
                            className="grid grid-cols-[6fr_1fr] bg-white p-2 rounded shadow divide-x divide-gray-600"
                          >
                            <div className="flex justify-between items-center px-2">
                              <span>
                                {showtime.location} -{" "}
                                {format(new Date(showtime.showTime), "Pp")}
                              </span>
                              <span>${showtime.ticketPrice}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeShowtime(showtime.id)}
                              className="text-red-400 hover:text-red-800 pl-2"
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Showtime Form */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <select
                        id="Location"
                        disabled={isCreating}
                        className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm"
                        {...registerShowtime("Location", {
                          required: "Location is required",
                        })}
                      >
                        <option value="">Select Location</option>
                        {theatres.map((obj, index) => (
                          <option key={index} value={obj.id}>
                            {obj.location}
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
                        className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm"
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
                        className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm"
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ticket Price (Enter without $)
                      </label>
                      <input
                        type="number"
                        id="TicketPrice"
                        className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm"
                        placeholder="$--.--"
                        disabled={isCreating}
                        {...registerShowtime("TicketPrice", {
                          required: "Price is required",
                        })}
                      ></input>
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
                  disabled={!selectedShowtime}
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
      </IsUser>
      
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-black pb-2 border-b border-gray-500 mb-2">Reviews</h2>
        <IsUser>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <p className="text-center md:text-left">Have you already watched this movie? Add your thoughts in a review now!</p>
            <Button variant="primary" className="w-full md:w-auto" onClick={() => setPopupState(2)}>
              Leave a Review
            </Button>
          </div>
        </IsUser>
        {!data.reviews.length && <div className="col-span-full text-center text-gray-500 mt-6">No reviews found</div>}
        {data.reviews.map(review => {
          const rating = Math.round((data.rating ?? 0) / 2);
          return (
            <div className="rounded-xl px-4 py-4 mt-4 border border-gray-300">
              <p className="text-gray-500">
                <span className="font-bold text-gray-900 text-lg">{review.userFirstName}</span>
                <span className="ml-3">{formatDistance(new Date(`${review.reviewDate}Z`), new Date().toISOString(), {addSuffix: true})}</span>
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex text-lg" title={`${data.rating}/10`}>{Array(5).fill(0).map((_, i) => <FaStar key={i} className={rating > i ? 'text-yellow-500' : 'text-gray-300'}/>)}</span>
              </div>
              <p className="mt-4">{review.comment}</p>
            </div>
          );
        })}
      </div>

      {popupState > 0 && <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center p-10">
        {/* delete popup */}
        {popupState == 1 && <div ref={closeRef} className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-10">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete this movie? This cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button
              className="px-4 py-2"
              variant="default"
              onClick={() => setPopupState(0)}
            >
              Cancel
            </Button>
            <Button
              className="px-4 py-2"
              variant="danger"
              onClick={handleDeleteMovie}
            >
              Delete
            </Button>
          </div>
        </div>}

        {/* review popup */}
        {popupState == 2 && <div ref={closeRef} className="relative bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full z-10">
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                value={reviewRating}
                onChange={(e) => setReviewRating(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-medium">{reviewRating}/10</span>
                <span className="inline-flex text-lg">
                  {Array(5).fill(0).map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={Math.ceil(reviewRating/2) > i ? 'text-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Your Review</label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="mt-1 h-32 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Share your thoughts about the movie..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              className="px-4 py-2"
              variant="default"
              onClick={() => setPopupState(0)}
              disabled={isSubmittingReview}
            >
              Cancel
            </Button>
            <Button
              className="px-4 py-2"
              variant="primary"
              onClick={async () => {
                setIsSubmittingReview(true);
                try {
                  const response = await fetch('https://www.moviebookingsystem.xyz/api/reviews/add-review', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      MovieId: movieId,
                      Comment: reviewComment,
                      Rating: reviewRating
                    })
                  });

                  if (!response.ok) {
                    throw new Error('Failed to submit review');
                  }

                  setReviewComment('');
                  setReviewRating(5);
                  setPopupState(0);

                  window.location.reload();
                } catch (error) {
                  console.error('Error submitting review:', error);
                  alert('Failed to submit review. Please try again.');
                } finally {
                  setIsSubmittingReview(false);
                }
              }}
              disabled={!reviewComment.trim()}
              loading={isSubmittingReview}
            >
              Submit Review
            </Button>
          </div>
        </div>}
      </div>}
    </>
  );
};

export default MovieDetails;
