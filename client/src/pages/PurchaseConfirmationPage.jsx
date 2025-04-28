import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { FaLocationPin, FaClock, FaStar } from "react-icons/fa6";
import Barcode from "react-barcode";
import Button from "../components/Button";
import { useLocation, Navigate } from "react-router";
import LoadingCircle from "../components/LoadingCircle";

const PurchaseConfirmationPage = () => {
  const location = useLocation();
  const movie = location?.state;

  const [movieDetails, setMovieDetails] = useState(null);
  const [ticketCount, setTicketCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movie) {
      setMovieDetails(movie.showData);
      setTicketCount(movie.ticketCount);
    }
    setLoading(false);
  }, [movie]);

  const handlePrint = () => {
    window.print();
  };

  if (loading)
    return (
      <div className="flex justify-center py-40">
        <LoadingCircle className="w-8 h-8" />
      </div>
    );

  return (
    <>
      <div className="max-w-5xl mx-auto py-6 px-4 flex flex-col">
        <h1 className="items-start justify-start text-2xl md:text-3xl font-bold text-black mb-4 print:hidden">
          Ticket Purchase Confirmation
        </h1>
        <h1 className="hidden print:block items-start justify-start text-2xl md:text-3xl font-bold text-black mb-4 ">
          Ticket Information
        </h1>
        <div className="flex items-start justify-start print:hidden">
          Your purchase was successful! View ticket info and show times below.
          Upon arriving at the theater, display the barcode provided to an
          attendant for easy check-in.
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
        <div className="rounded-xl bg-[#ececec] shadow-xl px-4 py-4 grid gap-y-2 divide-y-2 divide-gray-300 print:shadow-none print:w-full print:divide-y-0">
          {/* Top Row */}
          <div className="grid grid-cols-[17%_1fr] gap-x-4 pb-4 print:grid-cols-1 print:justify-center print:items-center">
            <img
              src={movieDetails.movieImageUrl}
              alt="Karate Kid Legends"
              className="w-auto h-auto rounded-lg shadow-lg print:hidden"
            />
            <div className="flex flex-col justify-between print:justify-center">
              <div>
                <div className="font-bold text-black text-xl">
                  {movieDetails.movieTitle}
                </div>
                <span className="text-gray-500">2025</span>
              </div>
              <div className="text-black mt-4">
                <div className="flex items-center gap-2">
                  <FaLocationPin className="print:hidden" />
                  <span>{movieDetails.theatreLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="print:hidden" />
                  <span>{format(new Date(movieDetails.showTime), "PPPp")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="print:hidden" />
                  <span>
                    {ticketCount} ticket{ticketCount == 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Row with Barcode */}
          <div className="flex flex-col justify-center items-center">
            <div className="text-bold">
              Display barcode at theater to check in
            </div>
            <Barcode
              value={{
                ticketCount: ticketCount,
                movieDetails: movieDetails,
              }}
              width={2}
              height={100}
              background="#ececec"
              text="Ticket"
              className="print:hidden"
            />
            <Barcode
              value={{
                ticketCount: ticketCount,
                movieDetails: movieDetails,
              }}
              width={2}
              height={100}
              text="Ticket"
              className="hidden print:block"
            />
          </div>
        </div>
        <div className="items-center justify-center mt-8">
          <Button
            variant="primary"
            onClick={handlePrint}
            className="print:hidden"
          >
            Print Ticket
          </Button>
        </div>
      </div>
    </>
  );
};

export default PurchaseConfirmationPage;
